require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Suburb = require('./models/Suburb');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors({
  origin: [
    'https://suburb-finder-1.onrender.com',
    'https://suburb-finder.onrender.com',
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Function to generate suburb description using OpenRouter
async function generateSuburbDescription(suburb) {
  try {
    const prompt = `Write a brief, engaging description (50 words max) for ${suburb.name} suburb in Melbourne, Australia. Include information about:
    - Average rent of a 2 bedroom apartment: $${suburb.avg_rent} per week
    - Drive time to CBD: ${suburb.commute_time_cbd} minutes
    - Estimate the commute time to CBD by train from this suburb: ${suburb.name} minutes
    - Lifestyle: ${suburb.lifestyle.join(', ')}
    - School rating: ${suburb.school_rating}/10
    - Safety score: ${suburb.safety_score}/10
    
    Make it appealing and informative for someone looking to move to Melbourne.`;

    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: 'mistralai/mistral-7b-instruct',
      messages: [
        { role: 'user', content: prompt }
      ],
      max_tokens: 150,
      temperature: 0.7,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://github.com/yourusername/smart-suburb-finder',
        'Content-Type': 'application/json',
      },
    });

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating description:', error);
    return `A vibrant suburb in Melbourne with great amenities and lifestyle options.`;
  }
}

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  // No need for useNewUrlParser or useUnifiedTopology in Mongoose 6+
});

// POST /api/recommend
app.post('/api/recommend', async (req, res) => {
  try {
    const { budget, commute, lifestyle } = req.body;
    
    // Fetch all suburbs
    const allSuburbs = await Suburb.find({});
    
    // Calculate realistic similarity score for each suburb
    const scored = allSuburbs.map(suburb => {
      let totalScore = 0;
      let maxPossibleScore = 0;
      
      // 1. LIFESTYLE SCORING (40% weight - most important)
      if (lifestyle && lifestyle.length > 0) {
        const lifestyleMatches = suburb.lifestyle.filter(tag => lifestyle.includes(tag)).length;
        const lifestyleScore = (lifestyleMatches / lifestyle.length) * 100; // Percentage match
        totalScore += lifestyleScore * 0.4;
        maxPossibleScore += 40;
      }
      
      // 2. BUDGET SCORING (35% weight)
      if (budget && budget > 0) {
        const budgetTolerance = budget * 0.25; // Allow 25% over budget
        const rentDiff = suburb.avg_rent - budget;
        
        let budgetScore = 0;
        if (rentDiff <= 0) {
          // Under or at budget - excellent
          budgetScore = 100;
        } else if (rentDiff <= budgetTolerance) {
          // Slightly over budget but acceptable
          budgetScore = 100 - ((rentDiff / budgetTolerance) * 50);
        } else {
          // Too expensive but still consider
          budgetScore = Math.max(0, 50 - ((rentDiff - budgetTolerance) / budget) * 100);
        }
        
        totalScore += budgetScore * 0.35;
        maxPossibleScore += 35;
      }
      
      // 3. COMMUTE SCORING (25% weight)
      if (commute && commute > 0) {
        const commuteTolerance = commute * 0.5; // Allow 50% longer commute
        const commuteDiff = suburb.commute_time_cbd - commute;
        
        let commuteScore = 0;
        if (commuteDiff <= 0) {
          // Better than expected
          commuteScore = 100;
        } else if (commuteDiff <= commuteTolerance) {
          // Acceptable range
          commuteScore = 100 - ((commuteDiff / commuteTolerance) * 60);
        } else {
          // Longer than preferred
          commuteScore = Math.max(0, 40 - ((commuteDiff - commuteTolerance) / commute) * 40);
        }
        
        totalScore += commuteScore * 0.25;
        maxPossibleScore += 25;
      }
      
      // Normalize score to 0-100 range
      const finalScore = maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0;
      
      return { 
        suburb, 
        score: finalScore,
        isOverBudget: budget && suburb.avg_rent > budget,
        budgetDiff: budget ? suburb.avg_rent - budget : 0
      };
    });
    
    // Sort by score descending
    scored.sort((a, b) => b.score - a.score);
    
    // Smart result selection: ensure we show good variety
    let results = [];
    const withinBudget = scored.filter(s => !s.isOverBudget);
    const slightlyOver = scored.filter(s => s.isOverBudget && s.budgetDiff <= (budget * 0.25));
    const remaining = scored.filter(s => s.isOverBudget && s.budgetDiff > (budget * 0.25));
    
    // Prioritize: within budget (up to 6), then slightly over (up to 3), then others (up to 1)
    results = [
      ...withinBudget.slice(0, 6),
      ...slightlyOver.slice(0, 3),
      ...remaining.slice(0, 1)
    ].slice(0, 10); // Maximum 10 results
    
    // If we have fewer than 6 results, add more from other categories
    if (results.length < 6) {
      const needed = 6 - results.length;
      const additionalResults = scored
        .filter(s => !results.includes(s))
        .slice(0, needed);
      results = [...results, ...additionalResults];
    }
    
    const finalSuburbs = results.map(item => item.suburb);
    
    // Generate descriptions for selected suburbs
    const suburbsWithDescriptions = await Promise.all(
      finalSuburbs.map(async (suburb) => {
        const description = await generateSuburbDescription(suburb);
        return { ...suburb.toObject(), description };
      })
    );
    
    res.json(suburbsWithDescriptions);
  } catch (err) {
    console.error('Recommendation error:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/chat - AI Chatbot endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Fetch suburb data to provide context to AI
    const allSuburbs = await Suburb.find({});
    
    // Create a context string with suburb information
    const suburbContext = allSuburbs.map(suburb => 
      `${suburb.name}: Rent $${suburb.avg_rent}/week, ${suburb.commute_time_cbd}min to CBD, Lifestyle: ${suburb.lifestyle.join(', ')}, Schools: ${suburb.school_rating}/10, Safety: ${suburb.safety_score}/10`
    ).join('; ');

    const prompt = `You are a helpful assistant for people looking to move to Melbourne, Australia. You have access to information about Melbourne suburbs.

Available suburb data: ${suburbContext}

User question: "${message}"

Please provide a helpful, informative response about Melbourne suburbs, neighborhoods, or living in Melbourne. If the user asks about specific suburbs, use the data provided. If they ask about general Melbourne information, provide helpful insights. Keep responses conversational and friendly, but informative. Limit responses to 2-3 sentences unless more detail is specifically requested.`;

    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: 'mistralai/mistral-7b-instruct',
      messages: [
        { role: 'user', content: prompt }
      ],
      max_tokens: 300,
      temperature: 0.7,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://github.com/yourusername/smart-suburb-finder',
        'Content-Type': 'application/json',
      },
    });

    const aiResponse = response.data.choices[0].message.content.trim();
    
    res.json({ response: aiResponse });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      response: "I'm having trouble connecting right now. Please try asking your question again or use the suburb finder tool above!" 
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
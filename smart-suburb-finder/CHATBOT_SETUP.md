# Chatbot Setup Guide

## New Feature: AI Chatbot

The Smart Suburb Finder now includes an AI-powered chatbot that can answer questions about Melbourne suburbs, neighborhoods, and living in Melbourne!

## Features

- **Floating Chat Button**: Click the 💬 button in the bottom-right corner to open the chat
- **AI-Powered Responses**: Uses OpenRouter AI to provide intelligent answers about suburbs
- **Real-time Chat**: Smooth animations and typing indicators
- **Mobile Responsive**: Works great on all devices
- **Context-Aware**: Has access to all suburb data for accurate responses

## Setup Required

### 1. Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/suburb-finder

# OpenRouter API Key for AI features
# Get your API key from: https://openrouter.ai/
OPENROUTER_API_KEY=your_openrouter_api_key_here

# Server Port (optional, defaults to 5000)
PORT=5000
```

### 2. Get OpenRouter API Key

1. Go to [OpenRouter](https://openrouter.ai/)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Add it to your `.env` file

## How to Use

1. **Start the Backend**: `cd backend && npm start`
2. **Start the Frontend**: `cd frontend && npm start`
3. **Open the App**: Navigate to `http://localhost:3000`
4. **Click the Chat Button**: Look for the 💬 button in the bottom-right corner
5. **Ask Questions**: Try asking things like:
   - "What are the best suburbs for families?"
   - "Tell me about South Yarra"
   - "Which suburbs have good schools?"
   - "What's the average rent in Melbourne?"
   - "Which suburbs are close to the beach?"

## Example Questions

The chatbot can answer questions about:
- Specific suburb information (rent, commute, lifestyle, schools, safety)
- General Melbourne living advice
- Suburb comparisons
- Lifestyle recommendations
- Moving to Melbourne tips

## Technical Details

- **Frontend**: React component with Framer Motion animations
- **Backend**: Express.js endpoint `/api/chat`
- **AI**: OpenRouter with Mistral-7B model
- **Data**: Uses existing suburb database for context
- **Styling**: Responsive CSS with smooth animations

## Troubleshooting

- **Chat not responding**: Check your OpenRouter API key
- **Database errors**: Ensure MongoDB is running and connected
- **Styling issues**: Make sure all CSS is loaded properly 
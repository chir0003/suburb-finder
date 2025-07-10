# Smart Suburb Finder

A full-stack web application that helps users find the perfect Melbourne suburb based on their budget, commute preferences, and lifestyle needs. Features AI-powered recommendations, interactive chatbot, and real-time data analysis.

## Live Demo

- **Frontend**: [https://suburb-finder-1.onrender.com](https://suburb-finder-1.onrender.com)
- **Backend API**: [https://suburb-finder.onrender.com](https://suburb-finder.onrender.com)

## Features

### Core Functionality
- **Smart Recommendations**: AI-powered suburb matching based on user preferences
- **Multi-Criteria Search**: Budget, commute time, and lifestyle preferences
- **Real-time Scoring**: Advanced algorithm with weighted scoring system
- **Interactive Chatbot**: AI assistant for Melbourne suburb queries

### User Experience
- **Modern UI/UX**: Clean, responsive design with smooth animations
- **Mobile-First**: Optimized for all device sizes
- **Interactive Elements**: Hover effects, transitions, and micro-interactions
- **Custom Branding**: Unique logo and favicon design

### Technical Features
- **RESTful API**: Clean, well-documented endpoints
- **MongoDB Integration**: NoSQL database with Mongoose ODM
- **AI Integration**: OpenRouter API for intelligent recommendations
- **CI/CD Pipeline**: Automated testing and deployment
- **Environment Management**: Secure configuration handling

## Project Structure

```
smart-suburb-finder/
├── frontend/                          # React.js frontend application
│   ├── public/
│   │   ├── favicon.svg               # Custom favicon
│   │   ├── logo.svg                  # Custom logo
│   │   ├── index.html                # Main HTML file
│   │   └── manifest.json             # PWA manifest
│   ├── src/
│   │   ├── components/               # React components
│   │   │   ├── Navbar.jsx           # Navigation component
│   │   │   ├── Landing.jsx          # Homepage component
│   │   │   ├── FindSuburb.jsx       # Search form component
│   │   │   ├── SuburbResults.jsx    # Results display component
│   │   │   ├── SuburbDetail.jsx     # Detailed suburb view
│   │   │   ├── Chatbot.jsx          # AI chatbot component
│   │   │   └── Navbar.module.css    # Navigation styles
│   │   ├── App.jsx                   # Main app component
│   │   └── App.css                   # Global styles
│   ├── package.json                  # Frontend dependencies
│   └── README.md                     # Frontend documentation
├── backend/                          # Node.js backend application
│   ├── models/
│   │   └── Suburb.js                # MongoDB schema
│   ├── server.js                     # Express server
│   ├── package.json                  # Backend dependencies
│   └── .env                         # Environment variables
├── data/                            # Data files
│   └── melbourne_suburbs_sample.json # Sample suburb data
├── .github/
│   └── workflows/                   # CI/CD pipelines
│       ├── ci-cd.yml               # Main deployment pipeline
│       └── pr-check.yml            # Pull request checks
├── CI_CD_SETUP.md                   # CI/CD documentation
├── DEPLOYMENT_GUIDE.md              # Deployment instructions
├── CHATBOT_SETUP.md                 # AI chatbot setup
└── package.json                     # Root dependencies
```

## Tech Stack

### Frontend
- **React.js 19.1.0** - Modern UI framework
- **React Router DOM 7.6.3** - Client-side routing
- **Styled Components 6.1.19** - CSS-in-JS styling
- **Framer Motion 12.18.1** - Smooth animations
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 5.1.0** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 8.16.0** - MongoDB ODM
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

### AI & APIs
- **OpenRouter API** - AI-powered recommendations
- **Mistral-7B-Instruct** - Language model for descriptions

### DevOps & Deployment
- **GitHub Actions** - CI/CD pipeline
- **Render** - Frontend hosting
- **Railway** - Backend hosting
- **MongoDB Atlas** - Cloud database

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account
- OpenRouter API key

### Backend Setup
```bash
cd smart-suburb-finder/backend
npm install
```

Create `.env` file:
```env
MONGODB_URI=your_mongodb_connection_string
OPENROUTER_API_KEY=your_openrouter_api_key
PORT=5000
NODE_ENV=development
```

### Frontend Setup
```bash
cd smart-suburb-finder/frontend
npm install
```

Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000
```

### Running Locally
```bash
# Start backend (from backend directory)
npm start

# Start frontend (from frontend directory)
npm start
```

## Algorithm Details

### Scoring System
The recommendation algorithm uses a weighted scoring system:

1. **Lifestyle Matching (40%)** - Most important factor
   - Percentage match between user preferences and suburb amenities
   - Supports multiple lifestyle tags

2. **Budget Compatibility (35%)**
   - Allows 25% over budget tolerance
   - Graduated scoring based on price difference

3. **Commute Time (25%)**
   - Allows 50% longer commute tolerance
   - Prioritizes shorter commute times

### Smart Result Selection
- Prioritizes suburbs within budget (up to 6 results)
- Includes slightly over-budget options (up to 3 results)
- Shows variety while maintaining quality

## Deployment

### Frontend (Render)
- Connected to GitHub repository
- Automatic deployments on push to main
- Environment variables configured
- Custom domain support

### Backend (Railway)
- Connected to GitHub repository
- Automatic deployments on push to main
- Environment variables configured
- Health check endpoints

### Database (MongoDB Atlas)
- M0 FREE cluster (512MB)
- Automatic backups
- Global distribution

## CI/CD Pipeline

### GitHub Actions Workflows
1. **`ci-cd.yml`** - Full pipeline for main branch
   - Frontend testing and building
   - Backend testing and health checks
   - Automatic deployment

2. **`pr-check.yml`** - Pull request validation
   - Code quality checks
   - Security audits
   - Fast feedback





## Acknowledgments

- **Melbourne Data**: Open-source suburb information
- **OpenRouter**: AI language model API
- **Render & Railway**: Free hosting platforms
- **MongoDB Atlas**: Free cloud database

## Contact

- **GitHub**: [@chir0003](https://github.com/chir0003)
- **LinkedIn**: [Chirag Kumar](https://www.linkedin.com/in/chirag-kumar-4b4870319/)
- **Portfolio**: [Chirag Kumar-portfolio.com](https://chir0003.github.io/Personal-React-Portfolio/)

---

**Star this repository if you found it helpful!** 
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Landing from './components/Landing.jsx';
import FindSuburb from './components/FindSuburb.jsx';
import SuburbResults from './components/SuburbResults.jsx';
import SuburbDetail from './components/SuburbDetail.jsx';
import Chatbot from './components/Chatbot.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/find" element={<FindSuburb />} />
        <Route path="/results" element={<SuburbResults />} />
        <Route path="/suburb" element={<SuburbDetail />} />
      </Routes>
      <Chatbot />
    </Router>
  );
}

export default App; 
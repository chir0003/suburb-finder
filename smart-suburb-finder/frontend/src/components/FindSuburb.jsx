import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './FindSuburb.module.css';
import sharedStyles from '../styles/shared.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

const lifestyleOptions = [
  'vibrant',
  'student-friendly',
  'nightlife',
  'beach',
  'quiet',
  'family-friendly',
  'artsy',
  'urban',
  'luxury',
  'sporty',
  'multicultural',
  'shopping',
  'suburban',
  'waterfront',
];

export default function FindSuburb() {
  const [budget, setBudget] = useState('');
  const [commute, setCommute] = useState('');
  const [lifestyle, setLifestyle] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle pre-selected lifestyle filters from landing page
  useEffect(() => {
    if (location.state?.preSelectedLifestyle) {
      setLifestyle(location.state.preSelectedLifestyle);
    }
  }, [location.state]);

  const handleLifestyleChange = (option) => {
    setLifestyle((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/recommend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          budget: Number(budget),
          commute: Number(commute),
          lifestyle,
        }),
      });
      if (!res.ok) throw new Error('Failed to fetch recommendations');
      const suburbs = await res.json();
      navigate('/results', { state: { suburbs, budget: Number(budget) } });
    } catch (err) {
      alert('Could not get recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className={styles.findPage} 
      initial={{ x: 300, opacity: 0 }} 
      animate={{ x: 0, opacity: 1 }} 
      transition={{ duration: 0.7 }}
    >
      <div className={styles.findContent}>
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Find Your Perfect Melbourne Suburb
        </motion.h2>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ color: '#666666', marginBottom: '2rem', fontSize: '1.1rem' }}
        >
          Tell us what you're looking for and we'll find the best suburbs that match your lifestyle and budget.
        </motion.p>
        
        {location.state?.fromLanding && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              background: '#fef7f9',
              border: '2px solid #ff69b4',
              borderRadius: '12px',
              padding: '1rem',
              marginBottom: '2rem',
              textAlign: 'center',
              color: '#ff69b4',
              fontWeight: '500'
            }}
          >
            ✨ Pre-selected filters from landing page applied!
          </motion.div>
        )}
        
        <form className={styles.suburbForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Budget (per week in $):</label>
            <input
              type="number"
              min="0"
              value={budget}
              onChange={e => setBudget(e.target.value)}
              placeholder="e.g. 600"
              required
              disabled={isLoading}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Max Commute to CBD (minutes):</label>
            <input
              type="number"
              min="0"
              value={commute}
              onChange={e => setCommute(e.target.value)}
              placeholder="e.g. 30"
              required
              disabled={isLoading}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Lifestyle Preferences:</label>
            <div className={styles.lifestyleOptions}>
              {lifestyleOptions.map(option => (
                <label key={option} className={`${sharedStyles.lifestyleChip}${lifestyle.includes(option) ? ` ${sharedStyles.selected}` : ''}`}>
                  <input
                    type="checkbox"
                    value={option}
                    checked={lifestyle.includes(option)}
                    onChange={() => handleLifestyleChange(option)}
                    disabled={isLoading}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
          <motion.button 
            className={styles.findBtn} 
            type="submit" 
            disabled={isLoading}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <div className={styles.loadingContent}>
                <div className={styles.loadingSpinner}></div>
                <span>Hang tight, finding the best suburbs for you...</span>
              </div>
            ) : (
              'Get Recommendations'
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
} 
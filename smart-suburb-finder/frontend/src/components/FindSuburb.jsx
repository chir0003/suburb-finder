import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './FindSuburb.module.css';
import sharedStyles from '../styles/shared.module.css';
import { useNavigate } from 'react-router-dom';

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
        <h2>Find the Best Suburb for You</h2>
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
          <button className={sharedStyles.findBtn} type="submit" disabled={isLoading}>
            {isLoading ? (
              <div className={styles.loadingContent}>
                <div className={styles.loadingSpinner}></div>
                <span>Hang tight, finding the best suburbs for you...</span>
              </div>
            ) : (
              'Get Recommendations'
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
} 
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './SuburbResults.module.css';
import sharedStyles from '../styles/shared.module.css';

// Heroicons-style bed icon SVG
const BedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#e75480" width="28" height="28" style={{marginRight: '4px'}}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 17.25V6.75A2.25 2.25 0 016.75 4.5h10.5a2.25 2.25 0 012.25 2.25v10.5M3 20.25h18M3.75 17.25h16.5a.75.75 0 00.75-.75v-2.25a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 14.25v2.25c0 .414.336.75.75.75z" />
  </svg>
);

// Arrow back icon for the back button
const ArrowBackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="20" height="20">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

// Helper functions for localStorage management
const saveResults = (data) => {
  try {
    const withExpiry = {
      ...data,
      timestamp: Date.now(),
      expiresIn: 24 * 60 * 60 * 1000 // 24 hours
    };
    localStorage.setItem('suburbResults', JSON.stringify(withExpiry));
  } catch (error) {
    console.warn('Storage full or unavailable, results not saved:', error);
  }
};

const getResults = () => {
  try {
    const saved = localStorage.getItem('suburbResults');
    if (saved) {
      const data = JSON.parse(saved);
      // Check if data has expired
      if (Date.now() - data.timestamp > data.expiresIn) {
        localStorage.removeItem('suburbResults');
        return null;
      }
      return data;
    }
  } catch (error) {
    console.warn('Error reading from storage:', error);
    localStorage.removeItem('suburbResults'); // Clean up corrupted data
  }
  return null;
};

const cleanupOldResults = () => {
  try {
    const saved = localStorage.getItem('suburbResults');
    if (saved) {
      const data = JSON.parse(saved);
      if (Date.now() - data.timestamp > data.expiresIn) {
        localStorage.removeItem('suburbResults');
      }
    }
  } catch (error) {
    console.warn('Error during cleanup:', error);
    localStorage.removeItem('suburbResults');
  }
};

export default function SuburbResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const [suburbs, setSuburbs] = useState([]);
  const [userBudget, setUserBudget] = useState(null);

  useEffect(() => {
    // Clean up old data on component mount
    cleanupOldResults();

    // Get data from location.state first
    if (location.state?.suburbs) {
      setSuburbs(location.state.suburbs);
      setUserBudget(location.state.budget);
      // Store in localStorage for persistence with expiry
      saveResults({
        suburbs: location.state.suburbs,
        budget: location.state.budget
      });
    } else {
      // Try to get from localStorage if location.state is empty
      const savedResults = getResults();
      if (savedResults) {
        setSuburbs(savedResults.suburbs);
        setUserBudget(savedResults.budget);
      }
    }
  }, [location.state]);

  // Check if all results are above the user's budget
  const allAboveBudget =
    userBudget && suburbs.length > 0 && suburbs.every(s => s.avg_rent > userBudget);

  return (
    <motion.div 
      className={styles.resultsPage}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.resultsHeader}>
        <div className={styles.resultsTitle}>
          <h2>Recommended Suburbs</h2>
          {suburbs.length > 0 && (
            <p className={styles.resultsCount}>{suburbs.length} suburb{suburbs.length !== 1 ? 's' : ''} found</p>
          )}
        </div>
        <motion.button 
          className={sharedStyles.backBtn}
          onClick={() => navigate('/find')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowBackIcon />
          <span>Back to Search</span>
        </motion.button>
      </div>
      
      {allAboveBudget && (
        <motion.div 
          className={styles.feedbackMsg}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          We couldn't find suburbs within your budget. Here are the closest matches—consider increasing your budget for more options.
        </motion.div>
      )}
      
      <div className={styles.resultsList}>
        {suburbs.length === 0 ? (
          <motion.div 
            className={styles.noResults}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className={styles.noResultsContent}>
              <div className={styles.noResultsIcon}>🔍</div>
              <h3>No suburbs found</h3>
              <p>Try adjusting your search criteria to find more options.</p>
              <button className={sharedStyles.findBtn} onClick={() => navigate('/find')}>
                Modify Search
              </button>
            </div>
          </motion.div>
        ) : (
          suburbs.map((suburb, index) => (
            <motion.div 
              className={`${styles.suburbCard} ${styles.clickable}`}
              key={suburb._id || suburb.name}
              onClick={() => navigate('/suburb', { state: { suburb } })}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h3>{suburb.name}</h3>
              <div className={styles.suburbDetails}>
                <span>Avg Rent: <b>${suburb.avg_rent}</b></span>
                <span>Drive: <b>{suburb.commute_time_cbd} min</b></span>
                <span>School Rating: <b>{suburb.school_rating}</b></span>
                <span>Safety: <b>{suburb.safety_score}</b></span>
              </div>
              <div className={styles.suburbLifestyle}>
                {suburb.lifestyle.map((tag) => (
                  <span className={`${sharedStyles.lifestyleChip} ${sharedStyles.selected}`} key={tag}>{tag}</span>
                ))}
              </div>
              {/* Bed icons row */}
              <div className={styles.bedIconsRow}>
                <BedIcon /><BedIcon />
              </div>
              {suburb.description && <p className={styles.suburbDesc}>{suburb.description}</p>}
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
} 
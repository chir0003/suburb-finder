import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Landing.module.css';
import sharedStyles from '../styles/shared.module.css';

export default function Landing() {
  const navigate = useNavigate();
  return (
    <motion.div 
      className={styles.landing} 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1 }}
    >
      <div className={styles.landingContent}>
        <h1>Find Your Perfect Suburb in Melbourne</h1>
        <p>Discover the best places to live based on your lifestyle, budget, and commute.</p>
        <button className={sharedStyles.findBtn} onClick={() => navigate('/find')}>Find Suburb</button>
      </div>
    </motion.div>
  );
} 
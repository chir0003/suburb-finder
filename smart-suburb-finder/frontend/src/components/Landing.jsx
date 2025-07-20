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
        <h1>Welcome to CommuteNest</h1>
        <p>Discover the best Melbourne suburbs for your lifestyle, budget, and commute with AI-powered recommendations.</p>
        <button className={sharedStyles.findBtn} onClick={() => navigate('/find')}>Find Suburb</button>
      </div>
    </motion.div>
  );
} 
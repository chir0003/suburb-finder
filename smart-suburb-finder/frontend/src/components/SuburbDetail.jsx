import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './SuburbDetail.module.css';
import sharedStyles from '../styles/shared.module.css';

// Arrow back icon for the back button
const ArrowBackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="20" height="20">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

// External link icon
const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="16" height="16">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

export default function SuburbDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const suburb = location.state?.suburb;

  if (!suburb) {
    return (
      <motion.div 
        className={styles.resultsPage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.noResultsContent}>
          <div className={styles.noResultsIcon}>⚠️</div>
          <h3>Suburb not found</h3>
          <p>Please go back and try again.</p>
          <motion.button 
            className={sharedStyles.findBtn}
            onClick={() => navigate('/find')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Search
          </motion.button>
        </div>
      </motion.div>
    );
  }

  const suburbName = suburb.name + ' VIC';
  const mapsQuery = encodeURIComponent(suburbName);
  const domainQuery = suburb.name.toLowerCase().replace(/\s+/g, '-') + '-vic';
  const googleDirectionsQuery = encodeURIComponent(suburb.name + ' VIC to Melbourne CBD');

  return (
    <motion.div 
      className={styles.suburbDetailPage}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.detailHeader}>
        <div className={styles.detailTitle}>
          <h1>{suburb.name}</h1>
          <p className={styles.suburbSubtitle}>Melbourne, Victoria</p>
        </div>
        <motion.button 
          className={sharedStyles.backBtn}
          onClick={() => navigate('/results')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowBackIcon />
          <span>Back to Results</span>
        </motion.button>
      </div>
      

      <div className={styles.detailContent}>
        {/* Suburb Stats */}
        <motion.div 
          className={styles.suburbStats}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className={styles.statCard}>
            <div className={styles.statIcon}>💰</div>
            <h3>Average Rent</h3>
            <p className={styles.statValue}>${suburb.avg_rent}/week</p>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>🚗</div>
            <h3>Drive to CBD</h3>
            <p className={styles.statValue}>{suburb.commute_time_cbd} min</p>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>🎓</div>
            <h3>School Rating</h3>
            <p className={styles.statValue}>{suburb.school_rating}/10</p>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>🛡️</div>
            <h3>Safety Score</h3>
            <p className={styles.statValue}>{suburb.safety_score}/10</p>
          </div>
        </motion.div>

        {/* Lifestyle Tags */}
        <motion.div 
          className={styles.lifestyleSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3>Lifestyle</h3>
          <div className={styles.lifestyleTags}>
            {suburb.lifestyle.map((tag) => (
              <span className={`${sharedStyles.lifestyleChip} ${sharedStyles.selected}`} key={tag}>{tag}</span>
            ))}
          </div>
        </motion.div>

        {/* AI Description */}
        {suburb.description && (
          <motion.div 
            className={styles.descriptionSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3>About {suburb.name}</h3>
            <p className={styles.suburbDescription}>{suburb.description}</p>
          </motion.div>
        )}

        {/* Google Maps */}
        <motion.div 
          className={styles.mapSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3>Location</h3>
          <div className={styles.mapContainer}>
            <iframe
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: '12px' }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
              title={`Map of ${suburbName}`}
            />
          </div>
        </motion.div>

        {/* External Links */}
        <motion.div 
          className={styles.externalLinks}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3>Find More Information</h3>
          <div className={styles.linkButtons}>
            <motion.a 
              href={`https://www.domain.com.au`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.externalLinkBtn} ${styles.domainBtn}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>🏠 View Rentals on Domain</span>
              <ExternalLinkIcon />
            </motion.a>
            <motion.a 
              href={`https://www.google.com/maps/dir/?api=1&origin=${mapsQuery}&destination=Melbourne+CBD&travelmode=transit`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.externalLinkBtn} ${styles.mapsBtn}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>🚇 Get Directions to CBD</span>
              <ExternalLinkIcon />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
} 
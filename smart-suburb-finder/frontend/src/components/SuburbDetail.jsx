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

// Money/Dollar icon
const MoneyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className={styles.statSvg}>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 1V23" stroke="currentColor" strokeWidth="2"/>
    <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Car/Transport icon
const CarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className={styles.statSvg}>
    <path d="M19 17H5C3.89543 17 3 16.1046 3 15V11C3 9.89543 3.89543 9 5 9H19C20.1046 9 21 9.89543 21 11V15C21 16.1046 20.1046 17 19 17Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M7 17V19C7 19.5523 7.44772 20 8 20H16C16.5523 20 17 19.5523 17 19V17" stroke="currentColor" strokeWidth="2"/>
    <circle cx="7" cy="13" r="1" fill="currentColor"/>
    <circle cx="17" cy="13" r="1" fill="currentColor"/>
  </svg>
);

// School/Education icon
const SchoolIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className={styles.statSvg}>
    <path d="M22 10V6L12 1L2 6V10L12 15L22 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 8V14C6 14.5304 6.21071 15.0391 6.58579 15.4142C6.96086 15.7893 7.46957 16 8 16H16C16.5304 16 17.0391 15.7893 17.4142 15.4142C17.7893 15.0391 18 14.5304 18 14V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Shield/Safety icon
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className={styles.statSvg}>
    <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// House icon
const HouseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className={styles.statSvg}>
    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Train/Transport icon
const TrainIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className={styles.statSvg}>
    <path d="M4 15C4 15 5 14 8 14C11 14 13 15 16 15C19 15 20 14 20 14V8C20 8 19 9 16 9C13 9 11 8 8 8C5 8 4 8 4 8V15Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M4 15V19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V15" stroke="currentColor" strokeWidth="2"/>
    <circle cx="8" cy="16" r="1" fill="currentColor"/>
    <circle cx="16" cy="16" r="1" fill="currentColor"/>
  </svg>
);

// Warning icon
const WarningIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className={styles.warningSvg}>
    <path d="M10.29 3.86L1.82 18A2 2 0 0 0 3.54 21H20.46A2 2 0 0 0 22.18 18L13.71 3.86A2 2 0 0 0 10.29 3.86Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 9V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="17" r="1" fill="currentColor"/>
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
          <div className={styles.noResultsIcon}>
            <WarningIcon />
          </div>
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
            <div className={styles.statIcon}>
              <MoneyIcon />
            </div>
            <h3>Average Rent</h3>
            <p className={styles.statValue}>${suburb.avg_rent}/week</p>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <CarIcon />
            </div>
            <h3>Drive to CBD</h3>
            <p className={styles.statValue}>{suburb.commute_time_cbd} min</p>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <SchoolIcon />
            </div>
            <h3>School Rating</h3>
            <p className={styles.statValue}>{suburb.school_rating}/10</p>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <ShieldIcon />
            </div>
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
              <span>
                <HouseIcon />
                View Rentals on Domain
              </span>
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
              <span>
                <TrainIcon />
                Get Directions to CBD
              </span>
              <ExternalLinkIcon />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
} 
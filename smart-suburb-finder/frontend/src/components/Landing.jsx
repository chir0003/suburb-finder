import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Landing.module.css';
import sharedStyles from '../styles/shared.module.css';

export default function Landing() {
  const navigate = useNavigate();
  const [filteredSuburbs, setFilteredSuburbs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  
  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className={styles.featureSvg}>
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Smart Recommendations",
      description: "AI-powered suburb matching based on your unique preferences"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className={styles.featureSvg}>
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 1V23" stroke="currentColor" strokeWidth="2"/>
          <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Budget-Friendly",
      description: "Find suburbs that fit your budget with real-time pricing"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className={styles.featureSvg}>
          <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 6H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="8" cy="6" r="1" fill="currentColor"/>
          <circle cx="8" cy="12" r="1" fill="currentColor"/>
          <circle cx="8" cy="18" r="1" fill="currentColor"/>
        </svg>
      ),
      title: "Commute Optimized",
      description: "Discover areas with the best transport connections"
    }
  ];

  const neighborhoodTypes = [
    { name: "Family-Friendly", filter: ["family-friendly"] },
    { name: "Student Areas", filter: ["student-friendly"] },
    { name: "Beachside", filter: ["beach"] },
    { name: "Arts & Culture", filter: ["artsy"] },
    { name: "Food & Nightlife", filter: ["nightlife"] },
    { name: "Quiet & Peaceful", filter: ["quiet"] }
  ];

  const handleNeighborhoodClick = async (neighborhood) => {
    setIsLoading(true);
    setActiveFilter(neighborhood.name);
    
    try {
      // Call backend with just the lifestyle filter
      const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/recommend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          budget: 0, // No budget filter
          commute: 0, // No commute filter
          lifestyle: neighborhood.filter,
        }),
      });
      
      if (!res.ok) throw new Error('Failed to fetch recommendations');
      const suburbs = await res.json();
      setFilteredSuburbs(suburbs);
    } catch (err) {
      console.error('Error fetching suburbs:', err);
      setFilteredSuburbs([]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearFilter = () => {
    setFilteredSuburbs([]);
    setActiveFilter(null);
  };

  return (
    <motion.div 
      className={styles.landing} 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1 }}
    >
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={styles.heroTitle}
          >
            Find Your Perfect Melbourne Suburb
          </motion.h1>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={styles.heroSubtitle}
          >
            From laid-back seaside suburbs to vibrant inner-city neighborhoods, discover the best places to live in Melbourne based on your lifestyle, budget, and commute preferences.
          </motion.p>
          <motion.button 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className={styles.ctaButton} 
            onClick={() => navigate('/find')}
          >
            Start Your Search
          </motion.button>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.featuresContainer}>
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className={styles.featuresTitle}
          >
            Why Choose CommuteNest?
          </motion.h2>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                className={styles.featureCard}
              >
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Melbourne Preview Section */}
      <section className={styles.melbournePreview}>
        <div className={styles.previewContainer}>
          <motion.div 
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
            className={styles.previewContent}
          >
            <div className={styles.previewHeader}>
              <svg viewBox="0 0 24 24" fill="none" className={styles.previewSvg}>
                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h2>Melbourne's Diverse Neighborhoods</h2>
            </div>
            <p>From the artistic laneways of the CBD to the beachside charm of St Kilda, Melbourne's suburbs offer something for everyone. Whether you're looking for a family-friendly area, a vibrant nightlife scene, or a quiet retreat, we'll help you find the perfect match.</p>
            
            {/* Active Filter Display */}
            {activeFilter && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={styles.activeFilter}
              >
                <span>Showing results for: <strong>{activeFilter}</strong></span>
                <button onClick={clearFilter} className={styles.clearFilterBtn}>
                  <svg viewBox="0 0 24 24" fill="none" className={styles.clearIcon}>
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Clear Filter
                </button>
              </motion.div>
            )}
            
            <div className={styles.neighborhoodTypes}>
              {neighborhoodTypes.map((neighborhood, index) => (
                <motion.button
                  key={index}
                  className={`${styles.neighborhoodTag} ${activeFilter === neighborhood.name ? styles.activeTag : ''}`}
                  onClick={() => handleNeighborhoodClick(neighborhood)}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isLoading}
                >
                  <span>{neighborhood.name}</span>
                  {isLoading && activeFilter === neighborhood.name && (
                    <div className={styles.loadingSpinner}></div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      {filteredSuburbs.length > 0 && (
        <section className={styles.resultsSection}>
          <div className={styles.resultsContainer}>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={styles.resultsTitle}
            >
              Top {activeFilter} Suburbs
            </motion.h2>
            <div className={styles.suburbsGrid}>
              {filteredSuburbs.slice(0, 6).map((suburb, index) => (
                <motion.div
                  key={suburb._id || index}
                  className={styles.suburbCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <h3 className={styles.suburbName}>{suburb.name}</h3>
                  <div className={styles.suburbStats}>
                    <div className={styles.stat}>
                      <span className={styles.statLabel}>Rent</span>
                      <span className={styles.statValue}>${suburb.avg_rent}/week</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.statLabel}>Commute</span>
                      <span className={styles.statValue}>{suburb.commute_time_cbd}min</span>
                    </div>
                  </div>
                  <div className={styles.suburbLifestyle}>
                    {suburb.lifestyle.slice(0, 3).map((tag, tagIndex) => (
                      <span key={tagIndex} className={styles.lifestyleTag}>{tag}</span>
                    ))}
                  </div>
                  <button 
                    className={styles.viewDetailsBtn}
                    onClick={() => navigate('/suburb', { state: { suburb } })}
                  >
                    View Details
                  </button>
                </motion.div>
              ))}
            </div>
            <motion.button 
              className={styles.viewAllBtn}
              onClick={() => navigate('/results', { state: { suburbs: filteredSuburbs, budget: 0 } })}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              View All Results
            </motion.button>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerContent}>
            <div className={styles.footerSection}>
              <h3>CommuteNest</h3>
              <p>Find your perfect Melbourne suburb with AI-powered recommendations.</p>
            </div>
            
            <div className={styles.footerSection}>
              <h4>Connect</h4>
              <div className={styles.socialLinks}>
                <a 
                  href="https://github.com/chir0003" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  GitHub
                </a>
                <a 
                  href="https://www.linkedin.com/in/chirag-kumar-4b4870319/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  LinkedIn
                </a>
                <a 
                  href="mailto:chiragkumar266@gmail.com" 
                  className={styles.socialLink}
                >
                  Email
                </a>
              </div>
            </div>
            
            <div className={styles.footerSection}>
              <h4>Resources</h4>
              <div className={styles.footerLinks}>
                <a href="/find" className={styles.footerLink}>Find Suburb</a>
                <a href="/" className={styles.footerLink}>Home</a>
              </div>
            </div>
          </div>
          
          <div className={styles.footerBottom}>
            <p>&copy; 2024 CommuteNest. Built within Melbourne.</p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
} 
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          <img src="/logo.svg" alt="CommuteNest Logo" className={styles.logoIcon} />
          <span className={styles.logoText}>CommuteNest</span>
        </Link>
        
        <div className={`${styles.navLinks} ${isMenuOpen ? styles.navOpen : ''}`}>
          <Link 
            to="/" 
            className={location.pathname === '/' ? `${styles.navLink} ${styles.active}` : styles.navLink}
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link 
            to="/find" 
            className={location.pathname === '/find' ? `${styles.navLink} ${styles.active}` : styles.navLink}
            onClick={closeMenu}
          >
            Find Suburb
          </Link>
        </div>

        <button 
          className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerOpen : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>
      </div>
    </nav>
  );
} 
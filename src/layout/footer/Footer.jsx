import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  const navItems = [
    { href: '#about', label: 'À propos', icon: '01' },
    { href: '#skills', label: 'Compétences', icon: '02' },
    { href: '#projects', label: 'Projets', icon: '03' },
    { href: '#contact', label: 'Contact', icon: '04' }
  ];

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__glow"></div>
        
        <div className="footer__content">
          {/* Section principale */}
          <div className="footer__main">
            <div className="footer__brand">
              <span className="footer__prompt">&gt;</span>
              <span className="footer__text">PORTFOLIO.sys</span>
            </div>
            
            <div className="footer__separator"></div>
            
            <div className="footer__info">
              <p className="footer__line">
                <span className="footer__label">&gt; status:</span>
                <span className="footer__value footer__value--green">
                  <span className="footer__dot"></span>
                  System operational
                </span>
              </p>
              <p className="footer__line">
                <span className="footer__label">&gt; version:</span>
                <span className="footer__value">1.0.0</span>
              </p>
              <p className="footer__line">
                <span className="footer__label">&gt; build:</span>
                <span className="footer__value">{currentYear}</span>
              </p>
            </div>
          </div>

          {/* Navigation interne améliorée */}
          <nav className="footer__nav" aria-label="Navigation du pied de page">
            <div className="footer__nav-header">
              <span className="footer__nav-prompt">&gt;_</span>
              <h2 className="footer__nav-title">quick_access.sh</h2>
            </div>
            
            <div className="footer__nav-grid">
              {navItems.map((item, index) => (
                <a 
                  key={index}
                  href={item.href} 
                  className="footer__nav-card"
                >
                  <div className="footer__nav-card-glow"></div>
                  <span className="footer__nav-card-number">{item.icon}</span>
                  <span className="footer__nav-card-label">{item.label}</span>
                  <span className="footer__nav-card-arrow">→</span>
                </a>
              ))}
            </div>
          </nav>

          {/* Copyright */}
          <div className="footer__copyright">
            <p className="footer__copyright-text">
              © {currentYear} - Made with <span className="footer__heart">♥</span> by <span className="footer__author">Dunis Lucas</span>
            </p>
            <p className="footer__copyright-subtext">
              [All rights reserved] - Built with React & SCSS
            </p>
          </div>
        </div>

        {/* Coins décoratifs */}
        <div className="footer__dot-corner footer__dot-corner--left"></div>
        <div className="footer__dot-corner footer__dot-corner--right"></div>
      </div>
    </footer>
  );
}

export default Footer;
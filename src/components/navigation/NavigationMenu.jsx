import React, { useState, useEffect } from 'react';
import { 
  checkIfMobile, 
  scrollToSection, 
  setupNavigationListeners 
} from '../utils/js/navigation';

function NavigationMenu() {
  const [isVisible, setIsVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Détection mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(checkIfMobile());
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Gestion de la visibilité du menu
  useEffect(() => {
    return setupNavigationListeners(isMobile, hovering, setIsVisible);
  }, [hovering, isMobile]);

  const menuItems = [
    { name: 'About Me', icon: '>', index: 0, href: '#about' },
    { name: 'Skills', icon: '#', index: 1, href: '#skills' },
    { name: 'Projects', icon: '$', index: 2, href: '#projects' },
    { name: 'Contacts', icon: '+', index: 3, href: '#contact' }
  ];

  // Handler pour le clic - empêche le comportement par défaut et scroll smooth
  const handleClick = (e, index) => {
    e.preventDefault();
    scrollToSection(index);
  };

  return (
    <>
      {/* Indicateur pour faire apparaître le menu */}
      <div className={`nav-hint ${isVisible ? 'nav-hint--hidden' : ''}`}>
        <div className="nav-hint__arrow">▼</div>
        <div className="nav-hint__text">
          {isMobile ? 'Click to navigate' : 'Hover to navigate'}
        </div>
      </div>

      <nav 
        className={`nav-menu ${isVisible ? 'nav-menu--visible' : ''}`}
        onMouseEnter={() => !isMobile && setHovering(true)}
        onMouseLeave={() => !isMobile && setHovering(false)}
        onTouchStart={() => isMobile && setHovering(true)}
        onTouchEnd={() => isMobile && setHovering(false)}
        aria-label="Navigation principale"
      >
        <div className="nav-menu__glow"></div>
        
        <div className="nav-menu__content">
          <div className="nav-menu__brand">
            <span className="nav-menu__prompt">&gt;</span>
            <span className="nav-menu__text">PORTFOLIO.sys</span>
          </div>

          <ul className="nav-menu__items">
            {menuItems.map((item, idx) => (
              <li key={idx}>
                {/* Utilisation de <a> au lieu de <button> pour le SEO */}
                <a
                  href={item.href}
                  className="nav-menu__item"
                  onClick={(e) => handleClick(e, item.index)}
                >
                  <span className="nav-menu__icon">{item.icon}</span>
                  <span className="nav-menu__label">{item.name}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-menu__indicator">
            <span className="nav-menu__dot"></span>
            <span className="nav-menu__status">ONLINE</span>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavigationMenu;
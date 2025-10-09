import React, { useState, useEffect } from 'react';

function NavigationMenu() {
  const [isVisible, setIsVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Afficher le menu si la souris est dans les 50px du haut
      if (e.clientY < 50 && !hovering) {
        setIsVisible(true);
      } else if (e.clientY > 100 && !hovering) {
        setIsVisible(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [hovering]);

  const scrollToSection = (sectionIndex) => {
    const sections = document.querySelectorAll('[data-section]');
    if (sections[sectionIndex]) {
      sections[sectionIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const menuItems = [
    { name: 'About Me', icon: '>', index: 0 },
    { name: 'Skills', icon: '#', index: 1 },
    { name: 'Projects', icon: '$', index: 2 },
    { name: 'Contacts', icon: '>', index: 3 }
  ];

  return (
    <>
      {/* Indicateur pour faire apparaître le menu */}
      <div className={`nav-hint ${isVisible ? 'nav-hint--hidden' : ''}`}>
        <div className="nav-hint__arrow">▼</div>
        <div className="nav-hint__text">Hover to navigate</div>
      </div>

      <div 
        className={`nav-menu ${isVisible ? 'nav-menu--visible' : ''}`}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <div className="nav-menu__glow"></div>
        
        <div className="nav-menu__content">
          <div className="nav-menu__brand">
            <span className="nav-menu__prompt">&gt;</span>
            <span className="nav-menu__text">PORTFOLIO.sys</span>
          </div>

          <nav className="nav-menu__items">
            {menuItems.map((item, idx) => (
              <button
                key={idx}
                className="nav-menu__item"
                onClick={() => scrollToSection(item.index)}
              >
                <span className="nav-menu__icon">{item.icon}</span>
                <span className="nav-menu__label">{item.name}</span>
              </button>
            ))}
          </nav>

          <div className="nav-menu__indicator">
            <span className="nav-menu__dot"></span>
            <span className="nav-menu__status">ONLINE</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavigationMenu;
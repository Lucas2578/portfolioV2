// Détection mobile
export const checkIfMobile = () => {
  return window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window;
};

// Scroll vers une section
export const scrollToSection = (sectionIndex) => {
  const sections = document.querySelectorAll('[data-section]');
  if (sections[sectionIndex]) {
    sections[sectionIndex].scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

// Gestion de la visibilité du menu (mouse)
export const handleMenuMouseMove = (e, hovering, setIsVisible) => {
  if (e.clientY < 50 && !hovering) {
    setIsVisible(true);
  } else if (e.clientY > 100 && !hovering) {
    setIsVisible(false);
  }
};

// Gestion de la visibilité du menu (touch)
export const handleMenuTouchStart = (e, setIsVisible) => {
  if (e.touches[0].clientY < 50) {
    setIsVisible(true);
  }
};

export const handleMenuTouchMove = (e, hovering, setIsVisible) => {
  if (e.touches[0].clientY > 100 && !hovering) {
    setIsVisible(false);
  }
};

// Configuration des event listeners pour le menu
export const setupNavigationListeners = (isMobile, hovering, setIsVisible) => {
  const mouseMoveHandler = (e) => handleMenuMouseMove(e, hovering, setIsVisible);
  const touchStartHandler = (e) => handleMenuTouchStart(e, setIsVisible);
  const touchMoveHandler = (e) => handleMenuTouchMove(e, hovering, setIsVisible);

  if (!isMobile) {
    window.addEventListener('mousemove', mouseMoveHandler);
  } else {
    window.addEventListener('touchstart', touchStartHandler);
    window.addEventListener('touchmove', touchMoveHandler);
  }

  return () => {
    window.removeEventListener('mousemove', mouseMoveHandler);
    window.removeEventListener('touchstart', touchStartHandler);
    window.removeEventListener('touchmove', touchMoveHandler);
  };
};
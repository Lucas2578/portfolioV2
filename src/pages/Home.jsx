import { useEffect, useRef } from 'react';
import AboutMe from '../components/aboutme/AboutMe.jsx';
import Spacer from '../components/spacer/Spacer.jsx';
import Skills from '../components/skills/Skills.jsx';
import Projects from '../components/projects/Projects.jsx';
import Contact from '../components/contact/Contact.jsx';
import NavigationMenu from '../components/navigation/NavigationMenu.jsx';
import Footer from '../layout/footer/Footer.jsx';

function Home() {
  const sectionsRef = useRef([]);
  const isScrollingRef = useRef(false);
  const lastScrollTime = useRef(0);

  useEffect(() => {
    const handleWheel = (e) => {
      const now = Date.now();
      
      // Si un scroll automatique est en cours, on ignore
      if (isScrollingRef.current) {
        return;
      }

      // Throttle : attendre au moins 100ms entre chaque détection
      if (now - lastScrollTime.current < 100) {
        return;
      }

      lastScrollTime.current = now;

      const delta = e.deltaY;
      const scrollThreshold = 50;

      // Vérifier si on est proche d'une section
      const sections = sectionsRef.current.filter(Boolean);
      let nearestSection = -1;
      let minDistance = Infinity;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top);
        
        // Si la section est proche du haut de l'écran (dans les 100px)
        if (distance < minDistance && distance < 100) {
          minDistance = distance;
          nearestSection = index;
        }
      });

      // Si on est proche d'une section et qu'on scroll suffisamment
      if (nearestSection !== -1 && Math.abs(delta) > scrollThreshold) {
        let targetSection = -1;

        if (delta > 0 && nearestSection < sections.length - 1) {
          // Scroll vers le bas
          targetSection = nearestSection + 1;
        } else if (delta < 0 && nearestSection > 0) {
          // Scroll vers le haut
          targetSection = nearestSection - 1;
        }

        if (targetSection !== -1) {
          e.preventDefault();
          isScrollingRef.current = true;

          sections[targetSection]?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          // Libérer après l'animation
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 100);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <>
      {/* Menu de navigation (fixed, pas dans une section) */}
      <NavigationMenu />
      
      {/* Sections */}
      <div ref={(el) => (sectionsRef.current[0] = el)} data-section="0">
        <AboutMe />
      </div>
      <Spacer />
      <div ref={(el) => (sectionsRef.current[1] = el)} data-section="1">
        <Skills />
      </div>
      <Spacer />
      <div ref={(el) => (sectionsRef.current[2] = el)} data-section="2">
        <Projects />
      </div>
      <Spacer />
      <div ref={(el) => (sectionsRef.current[3] = el)} data-section="3">
        <Contact />
      </div>
      <Spacer />
      <div ref={(el) => (sectionsRef.current[4] = el)} data-section="4">
        <Footer />
      </div>
    </>
  );
}

export default Home;
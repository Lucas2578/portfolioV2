import React, { useState, useEffect, useRef } from 'react';
import projectsData from '../../datas/projects.json';

function Projects() {
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [currentImages, setCurrentImages] = useState({});
  const [startIndex, setStartIndex] = useState(0);
  const sectionRef = useRef(null);

  const projectsToShow = 3;

  // Fonction pour obtenir les 3 projets actuels (avec boucle)
  const getCurrentProjects = () => {
    const projects = [];
    for (let i = 0; i < projectsToShow; i++) {
      const index = (startIndex + i) % projectsData.length;
      projects.push(projectsData[index]);
    }
    return projects;
  };

  // SEO: Mettre à jour les meta tags
  useEffect(() => {
    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', `Découvrez mes ${projectsData.length} projets de développement web et logiciel. Technologies utilisées: React, JavaScript, Node.js et plus encore.`);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = `Découvrez mes ${projectsData.length} projets de développement web et logiciel. Technologies utilisées: React, JavaScript, Node.js et plus encore.`;
      document.head.appendChild(meta);
    }

    // Meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'projets web, développement, portfolio, React, JavaScript, GitHub, programmation');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = 'projets web, développement, portfolio, React, JavaScript, GitHub, programmation';
      document.head.appendChild(meta);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', `Collection de ${projectsData.length} projets de développement web`);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:description');
      meta.content = `Collection de ${projectsData.length} projets de développement web`;
      document.head.appendChild(meta);
    }

    const ogType = document.querySelector('meta[property="og:type"]');
    if (ogType) {
      ogType.setAttribute('content', 'website');
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:type');
      meta.content = 'website';
      document.head.appendChild(meta);
    }

    // Twitter Card
    const twitterCard = document.querySelector('meta[name="twitter:card"]');
    if (twitterCard) {
      twitterCard.setAttribute('content', 'summary_large_image');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'twitter:card';
      meta.content = 'summary_large_image';
      document.head.appendChild(meta);
    }

    // Données structurées JSON-LD
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Portfolio Projects",
      "description": "Collection of web development and software engineering projects",
      "numberOfItems": projectsData.length,
      "itemListElement": projectsData.map((project, index) => ({
        "@type": "CreativeWork",
        "position": index + 1,
        "name": project.name,
        "description": project.description || `Project ${project.name}`,
        "url": project.github,
        "keywords": project.technologies.join(', '),
        "image": project.images?.[0] || '',
        "author": {
          "@type": "Person",
          "name": "Portfolio Owner"
        }
      }))
    };

    // Ajouter ou mettre à jour le script JSON-LD
    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);

  }, []);

  // Navigation du carrousel
  const handlePrevious = () => {
    setStartIndex((prev) => (prev === 0 ? projectsData.length - 1 : prev - 1));
    setVisibleProjects([]); // Reset l'animation
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % projectsData.length);
    setVisibleProjects([]); // Reset l'animation
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  // Animation d'apparition des projets
  useEffect(() => {
    if (isVisible) {
      setVisibleProjects([]);
      for (let i = 0; i < projectsToShow; i++) {
        setTimeout(() => {
          setVisibleProjects(prev => [...prev, i]);
        }, i * 200);
      }
    }
  }, [isVisible, startIndex]);

  // Initialiser les index des images
  useEffect(() => {
    const initialImages = {};
    projectsData.forEach(project => {
      initialImages[project.id] = 0;
    });
    setCurrentImages(initialImages);
  }, []);

  // Rotation automatique des images
  useEffect(() => {
    const maxImages = Math.max(
      ...projectsData.map(project => project.images?.length || 0)
    );
    
    const duration = Math.max(2000, 3000 + (maxImages - 3) * 500);
    
    const interval = setInterval(() => {
      setCurrentImages(prev => {
        const newImages = { ...prev };
        projectsData.forEach(project => {
          if (project.images && project.images.length > 0) {
            newImages[project.id] = (prev[project.id] + 1) % project.images.length;
          }
        });
        return newImages;
      });
    }, duration);

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (projectId, imageIndex) => {
    setCurrentImages(prev => ({
      ...prev,
      [projectId]: imageIndex
    }));
  };

  const currentProjects = getCurrentProjects();

  return (
    <section className="projects" ref={sectionRef}>
      <div className="projects__container">
        <div className={`projects__card ${isVisible ? 'projects__card--visible' : ''}`}>
          <div className="projects__glow"></div>
          
          <div className="projects__content">
            {/* En-tête */}
            <div className="projects__header">
              <span className="projects__prompt">&gt;</span>
              <span className="projects__filename">PROJECTS.db</span>
            </div>

            {/* Titre */}
            <div className="projects__section">
              <p className="projects__label">&gt; loading_projects:</p>
              <h1 className="projects__title">
                Mes Projets
                <span className="projects__cursor">_</span>
              </h1>
            </div>

            {/* Séparateur */}
            <hr className="projects__separator" />

            {/* Navigation du carrousel */}
            <nav className="projects__carousel-nav" aria-label="Navigation des projets">
              <button 
                className="projects__carousel-btn projects__carousel-btn--prev"
                onClick={handlePrevious}
                aria-label="Projet précédent"
              >
                <span>←</span>
              </button>
              
              <div className="projects__carousel-indicator">
                <span className="projects__page-info">
                  {projectsData.length} Projets
                </span>
              </div>

              <button 
                className="projects__carousel-btn projects__carousel-btn--next"
                onClick={handleNext}
                aria-label="Projet suivant"
              >
                <span>→</span>
              </button>
            </nav>

            {/* Liste des projets */}
            <div className="projects__list">
              {currentProjects.map((project, index) => (
                <article 
                  key={`${project.id}-${startIndex}-${index}`}
                  className={`projects__item ${visibleProjects.includes(index) ? 'projects__item--visible' : ''}`}
                  itemScope
                  itemType="https://schema.org/CreativeWork"
                >
                  {/* Carrousel d'images */}
                  {project.images && project.images.length > 0 && (
                    <div className="projects__carousel">
                      <div className="projects__carousel-images">
                        {project.images.map((image, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={image}
                            alt={`${project.name} - Capture d'écran ${imgIndex + 1}`}
                            className={`projects__carousel-image ${
                              currentImages[project.id] === imgIndex ? 'projects__carousel-image--active' : ''
                            }`}
                            loading={imgIndex === 0 ? 'eager' : 'lazy'}
                            itemProp={imgIndex === 0 ? 'image' : undefined}
                          />
                        ))}
                      </div>
                      
                      {/* Indicateurs (dots) */}
                      <div className="projects__carousel-dots">
                        {project.images.map((_, imgIndex) => (
                          <button
                            key={imgIndex}
                            className={`projects__carousel-dot ${
                              currentImages[project.id] === imgIndex ? 'projects__carousel-dot--active' : ''
                            }`}
                            onClick={() => handleDotClick(project.id, imgIndex)}
                            aria-label={`Image ${imgIndex + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Nom du projet */}
                  <div className="projects__item-header">
                    <h2 className="projects__item-name" itemProp="name">
                      <span className="projects__bracket">&lt;</span>
                      {project.name}
                      <span className="projects__bracket">/&gt;</span>
                    </h2>
                    {project.description && (
                      <p className="projects__item-description" itemProp="description">
                        {project.description}
                      </p>
                    )}
                  </div>

                  {/* Technologies */}
                  <div className="projects__item-section">
                    <p className="projects__item-label">&gt; stack:</p>
                    <div className="projects__item-tags" itemProp="keywords">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="projects__tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Sections alignées en bas */}
                  <div className="projects__item-bottom">
                    {/* GitHub */}
                    <div className="projects__item-section">
                      <p className="projects__item-label">&gt; repository:</p>
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="projects__link"
                        itemProp="url"
                        aria-label={`Voir le code source de ${project.name} sur GitHub`}
                      >
                        <span className="projects__link-icon" aria-hidden="true">→</span>
                        {project.github.replace('https://github.com/', '')}
                      </a>
                    </div>

                    {/* Collaborateurs */}
                    {project.collaborators && project.collaborators.length > 0 && (
                      <div className="projects__item-section">
                        <p className="projects__item-label">&gt; collaborators:</p>
                        <div className="projects__collaborators">
                          {project.collaborators.map((collab, collabIndex) => (
                            <span 
                              key={collabIndex} 
                              className="projects__collaborator"
                              itemProp="contributor"
                              itemScope
                              itemType="https://schema.org/Person"
                            >
                              <span className="projects__collab-icon" aria-hidden="true">@</span>
                              <span itemProp="name">{collab}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {/* Footer */}
            <div className="projects__footer">
              <p className="projects__footer-text">
                [Database loaded] - Navigating through {projectsData.length} projects
              </p>

              <p className="projects__footer-text--blink">
                [Query completed] - Scroll to continue...
              </p>
            </div>
          </div>

          {/* Coins décoratifs */}
          <div className="projects__dot projects__dot--top"></div>
          <div className="projects__dot projects__dot--bottom"></div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
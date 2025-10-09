import React, { useState, useEffect, useRef } from 'react';
import projectsData from '../../datas/projects.json';
import { setupProjectsSEO } from '../utils/js/seo';
import { animateProjectsSequentially } from '../utils/js/animations';
import { setupIntersectionObserver } from '../utils/js/intersectionObserver';
import {
  getProjectsToDisplay,
  navigatePrevious,
  navigateNext,
  setupImageRotation,
  initializeImageIndices
} from '../utils/js/carousel';

function Projects() {
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [currentImages, setCurrentImages] = useState({});
  const [startIndex, setStartIndex] = useState(0);
  const sectionRef = useRef(null);

  const projectsToShow = 3;

  // SEO setup
  useEffect(() => {
    setupProjectsSEO(projectsData);
  }, []);

  // Navigation handlers
  const handlePrevious = () => {
    setStartIndex(navigatePrevious(startIndex, projectsData.length));
    setVisibleProjects([]);
  };

  const handleNext = () => {
    setStartIndex(navigateNext(startIndex, projectsData.length));
    setVisibleProjects([]);
  };

  // Intersection Observer
  useEffect(() => {
    return setupIntersectionObserver(sectionRef, setIsVisible, isVisible);
  }, [isVisible]);

  // Animation d'apparition
  useEffect(() => {
    if (isVisible) {
      animateProjectsSequentially(projectsToShow, setVisibleProjects);
    }
  }, [isVisible, startIndex]);

  // Initialisation des images
  useEffect(() => {
    setCurrentImages(initializeImageIndices(projectsData));
  }, []);

  // Rotation automatique
  useEffect(() => {
    return setupImageRotation(projectsData, setCurrentImages);
  }, []);

  const handleDotClick = (projectId, imageIndex) => {
    setCurrentImages(prev => ({
      ...prev,
      [projectId]: imageIndex
    }));
  };

  const currentProjects = getProjectsToDisplay(projectsData, startIndex, projectsToShow);

  return (
    <section className="projects" ref={sectionRef}>
      <div className="projects__container">
        <div className={`projects__card ${isVisible ? 'projects__card--visible' : ''}`}>
          <div className="projects__glow"></div>
          
          <div className="projects__content">
            <div className="projects__header">
              <span className="projects__prompt">&gt;</span>
              <span className="projects__filename">PROJECTS.db</span>
            </div>

            <div className="projects__section">
              <p className="projects__label">&gt; loading_projects:</p>
              <h1 className="projects__title">
                Mes Projets
                <span className="projects__cursor">_</span>
              </h1>
            </div>

            <hr className="projects__separator" />

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

            <div className="projects__list">
              {currentProjects.map((project, index) => (
                <article 
                  key={`${project.id}-${startIndex}-${index}`}
                  className={`projects__item ${visibleProjects.includes(index) ? 'projects__item--visible' : ''}`}
                  itemScope
                  itemType="https://schema.org/CreativeWork"
                >
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

                  <div className="projects__item-bottom">
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

            <div className="projects__footer">
              <p className="projects__footer-text">
                [Database loaded] - Navigating through {projectsData.length} projects
              </p>
              <p className="projects__footer-text--blink">
                [Query completed] - Scroll to continue...
              </p>
            </div>
          </div>

          <div className="projects__dot projects__dot--top"></div>
          <div className="projects__dot projects__dot--bottom"></div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
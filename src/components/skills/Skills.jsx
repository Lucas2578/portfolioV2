import React, { useState, useEffect, useRef } from 'react';
import { animateSequentially } from '../utils/js/animations';
import { setupIntersectionObserver } from '../utils/js/intersectionObserver';
import skillsData from '../../datas/skills.json';

function Skills() {
  const [visibleSkills, setVisibleSkills] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  const skills = skillsData.skills;

  // Intersection Observer
  useEffect(() => {
    return setupIntersectionObserver(sectionRef, setIsVisible, isVisible);
  }, [isVisible]);

  // Animation séquentielle
  useEffect(() => {
    if (isVisible) {
      animateSequentially(skills, setVisibleSkills);
    }
  }, [isVisible, skills]);

  return (
    <section 
      className="skills" 
      ref={sectionRef}
      id="skills"
      aria-labelledby="skills-title"
    >
      <div className="skills__container">
        <article className={`skills__card ${isVisible ? 'skills__card--visible' : ''}`}>
          <div className="skills__glow" aria-hidden="true"></div>
          
          <div className="skills__content">
            <div className="skills__header">
              <span className="skills__prompt" aria-hidden="true">&gt;</span>
              <span className="skills__filename" aria-hidden="true">SKILLS.db</span>
            </div>

            <div className="skills__section">
              <p className="skills__label" aria-hidden="true">&gt; loading_skills:</p>
              <h2 className="skills__title" id="skills-title">
                Mes Compétences
                <span className="skills__cursor" aria-hidden="true">_</span>
              </h2>
            </div>

            <hr className="skills__separator" aria-hidden="true" />

            <ul className="skills__list">
              {skills.map((skill, index) => (
                <li 
                  key={skill.name}
                  className={`skills__item ${visibleSkills.includes(index) ? 'skills__item--visible' : ''}`}
                >
                  <div className="skills__item-header">
                    <span className="skills__item-name">
                      <span className="skills__bracket" aria-hidden="true">[</span>
                      {skill.name}
                      <span className="skills__bracket" aria-hidden="true">]</span>
                    </span>
                    <i className={skill.icon} aria-hidden="true"></i>
                  </div>
                  <div 
                    className="skills__bar-container"
                    role="progressbar"
                    aria-valuenow={visibleSkills.includes(index) ? skill.level : 0}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-label={`${skill.name} skill level: ${skill.level}%`}
                  >
                    <div 
                      className="skills__bar-fill"
                      style={{
                        width: visibleSkills.includes(index) ? `${skill.level}%` : '0%'
                      }}
                    >
                      <div className="skills__bar-glow" aria-hidden="true"></div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="skills__footer">
              <p className="skills__footer-text" aria-hidden="true">
                [System loaded] - {visibleSkills.length}/{skills.length} modules active
              </p>
              <p className="skills__footer-text--blink" aria-hidden="true">
                [Process completed] - Scroll to continue...
              </p>
            </div>
          </div>

          <div className="skills__dot skills__dot--top" aria-hidden="true"></div>
          <div className="skills__dot skills__dot--bottom" aria-hidden="true"></div>
        </article>
      </div>
    </section>
  );
}

export default Skills;
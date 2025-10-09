import React, { useState, useEffect } from 'react';
import { animateTyping } from '../utils/js/aboutMeAnimation';

function AboutMe() {
  const [displayedText, setDisplayedText] = useState({
    name: '',
    age: '',
    description: ''
  });

  useEffect(() => {
    const fullText = {
      name: 'Lucas Dunis',
      age: '23 ans',
      description: "Développeur passionné par la création d'expériences web innovantes. J'aime transformer des idées en code et repousser les limites du possible avec les technologies modernes."
    };
    
    const cleanup = animateTyping(fullText, setDisplayedText);
    return cleanup;
  }, []);

  return (
    <section 
      className="about-me"
      id="about"
      aria-labelledby="about-name"
    >
      <div className="about-me__container">
        <article className="about-me__card">
          <div className="about-me__glow" aria-hidden="true"></div>
          
          <div className="about-me__content">
            <div className="about-me__photo-container">
              <div className="about-me__photo-glow" aria-hidden="true"></div>
              <img 
                src="/assets/others/me.png" 
                alt="Portrait de Lucas Dunis, développeur web" 
                className="about-me__photo"
                loading="eager"
                width="200"
                height="200"
              />
              <div className="about-me__photo-border" aria-hidden="true"></div>
            </div>

            <div className="about-me__header">
              <span className="about-me__prompt" aria-hidden="true">&gt;</span>
              <span className="about-me__filename" aria-hidden="true">ABOUT_ME.exe</span>
            </div>

            <div className="about-me__section">
              <p className="about-me__label" aria-hidden="true">&gt; name:</p>
              <h1 className="about-me__name" id="about-name">
                {displayedText.name}
                <span className="about-me__cursor" aria-hidden="true">_</span>
              </h1>
            </div>

            <div className="about-me__section">
              <p className="about-me__label" aria-hidden="true">&gt; age:</p>
              <p className="about-me__age">
                {displayedText.age}
                {displayedText.age.length < '23 ans'.length && (
                  <span className="about-me__cursor" aria-hidden="true">_</span>
                )}
              </p>
            </div>

            <hr className="about-me__separator" aria-hidden="true" />

            <div className="about-me__section">
              <p className="about-me__label" aria-hidden="true">&gt; description:</p>
              <p className="about-me__description">
                {displayedText.description}
                {displayedText.description.length < 160 && (
                  <span className="about-me__cursor" aria-hidden="true">_</span>
                )}
              </p>
            </div>

            <div className="about-me__footer">
              <p className="about-me__footer-text" aria-hidden="true">
                [Process completed] - Scroll to continue...
              </p>
            </div>
          </div>

          <div className="about-me__dot about-me__dot--top" aria-hidden="true"></div>
          <div className="about-me__dot about-me__dot--bottom" aria-hidden="true"></div>
        </article>
      </div>
    </section>
  );
}

export default AboutMe;
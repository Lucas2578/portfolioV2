import React, { useState, useEffect, useRef } from 'react';
import contactData from '../../datas/contacts.json';
import { setupSimpleIntersectionObserver } from '../utils/js/intersectionObserver';

function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const contactRef = useRef(null);

  useEffect(() => {
    return setupSimpleIntersectionObserver(contactRef, setIsVisible, 0.1);
  }, []);

  const contactLinks = contactData.contactLinks;

  return (
    <section className="contact" ref={contactRef} id="contact" aria-labelledby="contact-title">
      <div className="contact__container">
        <article className={`contact__card ${isVisible ? 'contact__card--visible' : ''}`}>
          <div className="contact__glow" aria-hidden="true"></div>
          
          <div className="contact__content">
            <div className="contact__header">
              <span className="contact__prompt" aria-hidden="true">&gt;</span>
              <span className="contact__filename" aria-hidden="true">CONTACT.db</span>
            </div>

            <div className="contact__section">
              <p className="contact__label" aria-hidden="true">&gt; connect:</p>
              <h2 className="contact__title" id="contact-title">
                Connectons-nous
                <span className="contact__cursor" aria-hidden="true">_</span>
              </h2>
            </div>

            <hr className="contact__separator" aria-hidden="true" />

            <div className="contact__section">
              <p className="contact__description">
                Téléchargez mon CV & consultez mes réseaux sociaux professionnels.
              </p>
            </div>

            <nav className="contact__links" aria-label="Contact and social media links">
              {contactLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`contact__link ${isVisible ? 'contact__link--visible' : ''}`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                  aria-label={`${link.name}: ${link.description}`}
                >
                  <div className="contact__link-glow" aria-hidden="true"></div>
                  <div className="contact__link-content">
                    <div className="contact__link-icon" aria-hidden="true">
                      <i className={link.icon}></i>
                    </div>
                    <div className="contact__link-text">
                      <span className="contact__link-name">{link.name}</span>
                      <span className="contact__link-description">{link.description}</span>
                    </div>
                    <div className="contact__link-arrow" aria-hidden="true">
                      <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </div>
                  </div>
                </a>
              ))}
            </nav>

            <div className="contact__footer">
              <p className="contact__footer-text" aria-hidden="true">
                [Links initialized] - Ready to connect...
              </p>
              <p className="contact__footer-text--blink" aria-hidden="true">
                [Query completed] - Scroll to continue...
              </p>
            </div>
          </div>

          <div className="contact__dot contact__dot--top" aria-hidden="true"></div>
          <div className="contact__dot contact__dot--bottom" aria-hidden="true"></div>
        </article>
      </div>
    </section>
  );
}

export default Contact;
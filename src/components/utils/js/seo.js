// Création ou mise à jour d'une meta tag
const setMetaTag = (selector, attributeName, attributeValue, content) => {
  let meta = document.querySelector(selector);
  if (meta) {
    meta.setAttribute('content', content);
  } else {
    meta = document.createElement('meta');
    if (attributeName === 'property') {
      meta.setAttribute('property', attributeValue);
    } else {
      meta.setAttribute(attributeName, attributeValue);
    }
    meta.content = content;
    document.head.appendChild(meta);
  }
};

// Configuration SEO pour Projects
export const setupProjectsSEO = (projectsData) => {
  // Meta description
  setMetaTag(
    'meta[name="description"]',
    'name',
    'description',
    `Découvrez mes ${projectsData.length} projets de développement web et logiciel. Technologies utilisées: React, JavaScript, Node.js et plus encore.`
  );

  // Meta keywords
  setMetaTag(
    'meta[name="keywords"]',
    'name',
    'keywords',
    'projets web, développement, portfolio, React, JavaScript, GitHub, programmation'
  );

  // Open Graph description
  setMetaTag(
    'meta[property="og:description"]',
    'property',
    'og:description',
    `Collection de ${projectsData.length} projets de développement web`
  );

  // Open Graph type
  setMetaTag(
    'meta[property="og:type"]',
    'property',
    'og:type',
    'website'
  );

  // Twitter Card
  setMetaTag(
    'meta[name="twitter:card"]',
    'name',
    'twitter:card',
    'summary_large_image'
  );

  // Données structurées JSON-LD
  setupStructuredData(projectsData);
};

// Configuration des données structurées
const setupStructuredData = (projectsData) => {
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

  let scriptTag = document.querySelector('script[type="application/ld+json"]');
  if (!scriptTag) {
    scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    document.head.appendChild(scriptTag);
  }
  scriptTag.textContent = JSON.stringify(structuredData);
};
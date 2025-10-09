// Gestion du carrousel de projets
export const getProjectsToDisplay = (projectsData, startIndex, count = 3) => {
  const projects = [];
  for (let i = 0; i < count; i++) {
    const index = (startIndex + i) % projectsData.length;
    projects.push(projectsData[index]);
  }
  return projects;
};

export const navigatePrevious = (currentIndex, totalItems) => {
  return currentIndex === 0 ? totalItems - 1 : currentIndex - 1;
};

export const navigateNext = (currentIndex, totalItems) => {
  return (currentIndex + 1) % totalItems;
};

// Gestion de la rotation automatique des images
export const setupImageRotation = (projectsData, setCurrentImages, baseDelay = 3000) => {
  const maxImages = Math.max(
    ...projectsData.map(project => project.images?.length || 0)
  );
  
  const duration = Math.max(2000, baseDelay + (maxImages - 3) * 500);
  
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
};

// Initialisation des indices d'images
export const initializeImageIndices = (projectsData) => {
  const initialImages = {};
  projectsData.forEach(project => {
    initialImages[project.id] = 0;
  });
  return initialImages;
};
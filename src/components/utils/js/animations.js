// Animation de typing pour AboutMe
export const animateTyping = (fullText, setDisplayedText) => {
  let nameIndex = 0;
  let ageIndex = 0;
  let descIndex = 0;

  const nameInterval = setInterval(() => {
    if (nameIndex <= fullText.name.length) {
      setDisplayedText(prev => ({
        ...prev,
        name: fullText.name.slice(0, nameIndex)
      }));
      nameIndex++;
    } else {
      clearInterval(nameInterval);
    }
  }, 30);

  setTimeout(() => {
    const ageInterval = setInterval(() => {
      if (ageIndex <= fullText.age.length) {
        setDisplayedText(prev => ({
          ...prev,
          age: fullText.age.slice(0, ageIndex)
        }));
        ageIndex++;
      } else {
        clearInterval(ageInterval);
      }
    }, 30);
  }, fullText.name.length * 100);

  setTimeout(() => {
    const descInterval = setInterval(() => {
      if (descIndex <= fullText.description.length) {
        setDisplayedText(prev => ({
          ...prev,
          description: fullText.description.slice(0, descIndex)
        }));
        descIndex++;
      } else {
        clearInterval(descInterval);
      }
    }, 15);
  }, (fullText.name.length * 100) + (fullText.age.length * 80) + 200);

  return () => {
    clearInterval(nameInterval);
  };
};

// Animation séquentielle pour Skills
export const animateSequentially = (items, setVisibleItems, delay = 200) => {
  items.forEach((_, index) => {
    setTimeout(() => {
      setVisibleItems(prev => [...prev, index]);
    }, index * delay);
  });
};

// Animation séquentielle pour Projects (avec reset)
export const animateProjectsSequentially = (projectsCount, setVisibleProjects, delay = 200) => {
  setVisibleProjects([]);
  for (let i = 0; i < projectsCount; i++) {
    setTimeout(() => {
      setVisibleProjects(prev => [...prev, i]);
    }, i * delay);
  }
};
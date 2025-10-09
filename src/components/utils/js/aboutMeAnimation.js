// Fonction pour animer le texte en mode typing
export const animateTyping = (fullText, setDisplayedText) => {
  let nameIndex = 0;
  let ageIndex = 0;
  let descIndex = 0;

  // Animation du nom
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

  // Animation de l'âge (commence après le nom)
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

  // Animation de la description (commence après l'âge)
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
    }, 15 );
  }, (fullText.name.length * 100) + (fullText.age.length * 80) + 200);

  // Cleanup function
  return () => {
    clearInterval(nameInterval);
  };
};
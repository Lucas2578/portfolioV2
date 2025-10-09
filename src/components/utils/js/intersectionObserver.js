// Hook personnalisé pour l'Intersection Observer
export const setupIntersectionObserver = (
  ref, 
  setIsVisible, 
  isVisible,
  options = { threshold: 0.2, rootMargin: '0px' }
) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      });
    },
    options
  );

  const currentRef = ref.current;

  if (currentRef) {
    observer.observe(currentRef);
  }

  return () => {
    if (currentRef) {
      observer.unobserve(currentRef);
    }
  };
};

// Version simple (pour Contact)
export const setupSimpleIntersectionObserver = (
  ref,
  setIsVisible,
  threshold = 0.1
) => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    },
    { threshold }
  );

  const currentRef = ref.current;

  if (currentRef) {
    observer.observe(currentRef);
  }

  return () => {
    if (currentRef) {
      observer.unobserve(currentRef);
    }
  };
};
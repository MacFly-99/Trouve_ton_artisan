import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Remonter en haut de la page à chaque changement de route
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // Animation fluide
    });
  }, [pathname, search]); // Déclenché quand l'URL change (chemin ET paramètres)

  return null;
};

export default ScrollToTop;
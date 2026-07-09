import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { getCategories } from '../../api/artisanApi';
import SearchBar from './SearchBar';
import { useScroll } from '../../hooks/useScroll';

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('');
  const navigate = useNavigate();
  const { isScrolled } = useScroll();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log('📡 Chargement des catégories...');
        const response = await getCategories();
        console.log('✅ Catégories reçues:', response);
        
        if (response && response.data) {
          setCategories(response.data);
          console.log(`✅ ${response.data.length} catégories chargées`);
        } else {
          console.warn('⚠️ Aucune catégorie reçue');
          setCategories([]);
        }
      } catch (error) {
        console.error('❌ Erreur chargement catégories:', error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Fonction pour gérer le clic sur une catégorie
  const handleCategoryClick = (categorieNom) => {
    console.log(`📂 Clic sur catégorie: "${categorieNom}"`);
    setActiveCategory(categorieNom);
    navigate(`/artisans?categorie=${encodeURIComponent(categorieNom)}`);
  };

  // Fonction pour réinitialiser le filtre (retour à tous les artisans)
  const handleAllCategories = () => {
    console.log('📂 Afficher tous les artisans');
    setActiveCategory('');
    navigate('/artisans');
  };

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`} role="banner">
      <a href="#main-content" className="skip-link">
        Passer au contenu principal
      </a>
      <Container>
        <Navbar expand="lg" className="p-0">
          <Navbar.Brand as={Link} to="/" aria-label="Accueil - Trouve ton artisan">
            <img 
              src="/Logo.png" 
              alt="Trouve ton artisan ! Avec la région Auvergne-Rhône-Alpes" 
              className={`logo ${isScrolled ? 'logo-scrolled' : ''}`}
              onError={(e) => {
                console.error('❌ Logo non trouvé, utilisation du favicon');
                e.target.src = '/favicon-32.png';
              }}
            />
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="main-nav" />
          
          <Navbar.Collapse id="main-nav">
            <Nav className="me-auto" role="navigation" aria-label="Navigation principale">
              {loading ? (
                <span className={`nav-link text-white-50 ${isScrolled ? 'nav-link-scrolled' : ''}`}>
                  Chargement...
                </span>
              ) : categories.length > 0 ? (
                <>
                  {/* Bouton "Tous" pour afficher tous les artisans */}
                  <Nav.Link 
                    onClick={handleAllCategories}
                    className={`category-link ${!activeCategory ? 'active' : ''} ${isScrolled ? 'category-link-scrolled' : ''}`}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAllCategories();
                      }
                    }}
                  >
                    Tous
                  </Nav.Link>
                  
                  {/* Boutons pour chaque catégorie */}
                  {categories.map((categorie) => (
                    <Nav.Link 
                      key={categorie.id}
                      onClick={() => handleCategoryClick(categorie.nom)}
                      className={`category-link ${activeCategory === categorie.nom ? 'active' : ''} ${isScrolled ? 'category-link-scrolled' : ''}`}
                      role="button"
                      tabIndex={0}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleCategoryClick(categorie.nom);
                        }
                      }}
                    >
                      {categorie.nom}
                    </Nav.Link>
                  ))}
                </>
              ) : (
                <span className={`nav-link text-white-50 ${isScrolled ? 'nav-link-scrolled' : ''}`}>
                  Aucune catégorie
                </span>
              )}
            </Nav>
            
            <SearchBar isScrolled={isScrolled} />
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </header>
  );
};

export default Header;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { getCategories } from '../../api/artisanApi';
import SearchBar from './SearchBar';

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log('📡 Chargement des catégories...');
        const response = await getCategories();
        if (response && response.data) {
          setCategories(response.data);
          console.log(`✅ ${response.data.length} catégories chargées`);
        } else {
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

  const handleCategoryClick = (categorieNom) => {
    console.log(`📂 Clic sur catégorie: "${categorieNom}"`);
    setActiveCategory(categorieNom);
    navigate(`/artisans?categorie=${encodeURIComponent(categorieNom)}`);
  };

  const handleAllCategories = () => {
    console.log('📂 Afficher tous les artisans');
    setActiveCategory('');
    navigate('/artisans');
  };

  return (
    <header className="header" role="banner">
      <a href="#main-content" className="skip-link">
        Passer au contenu principal
      </a>
      <Container fluid className="px-4">
        <Navbar expand="lg" className="p-0">
          <Navbar.Brand as={Link} to="/" aria-label="Accueil - Trouve ton artisan">
            <img 
              src="/Logo.png" 
              alt="Trouve ton artisan - Auvergne-Rhône-Alpes" 
              className="logo"
              onError={(e) => {
                e.target.src = '/favicon-32.png';
              }}
            />
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="main-nav" />
          
          <Navbar.Collapse id="main-nav">
            <Nav className="me-auto" role="navigation" aria-label="Navigation principale">
              {loading ? (
                <span className="nav-link text-muted">Chargement...</span>
              ) : categories.length > 0 ? (
                <>
                  <Nav.Link 
                    onClick={handleAllCategories}
                    className={`category-link ${!activeCategory ? 'active' : ''}`}
                  >
                    Tous
                  </Nav.Link>
                  {categories.map((categorie) => (
                    <Nav.Link 
                      key={categorie.id}
                      onClick={() => handleCategoryClick(categorie.nom)}
                      className={`category-link ${activeCategory === categorie.nom ? 'active' : ''}`}
                    >
                      {categorie.nom}
                    </Nav.Link>
                  ))}
                </>
              ) : (
                <span className="nav-link text-muted">Aucune catégorie</span>
              )}
            </Nav>
            
            <SearchBar />
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </header>
  );
};

export default Header;
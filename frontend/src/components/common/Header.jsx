import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Form, FormControl } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { getCategories } from '../../api/artisanApi';

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/artisans?recherche=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
    }
  };

  return (
    <header className="header" role="banner">
      <a href="#main-content" className="skip-link">
        Passer au contenu principal
      </a>
      <Container>
        <Navbar expand="lg" className="p-0">
          <Navbar.Brand as={Link} to="/" aria-label="Accueil - Trouve ton artisan">
            <img 
              src="/Logo.png" 
              alt="Trouve ton artisan ! Avec la région Auvergne-Rhône-Alpes" 
              className="logo"
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
                <span className="nav-link text-muted">Chargement...</span>
              ) : categories.length > 0 ? (
                categories.map((categorie) => (
                  <Nav.Link 
                    key={categorie.id}
                    as={NavLink}
                    to={`/artisans?categorie=${encodeURIComponent(categorie.nom)}`}
                  >
                    {categorie.nom}
                  </Nav.Link>
                ))
              ) : (
                <span className="nav-link text-muted">Aucune catégorie</span>
              )}
            </Nav>
            
            <Form className="search-bar" onSubmit={handleSearch} role="search">
              <FormControl
                type="search"
                placeholder="Rechercher un artisan..."
                aria-label="Rechercher un artisan"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="search-icon" aria-hidden="true" />
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </header>
  );
};

export default Header;
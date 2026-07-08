import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Form, FormControl } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { getCategories } from '../api/artisanApi';

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Erreur chargement catégories:', error);
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
              src="/logo.png" 
              alt="Trouve ton artisan ! Avec la région Auvergne-Rhône-Alpes" 
              className="logo"
            />
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="main-nav" />
          
          <Navbar.Collapse id="main-nav">
            <Nav className="me-auto" role="navigation" aria-label="Navigation principale">
              {categories.map(categorie => (
                <Nav.Link 
                  key={categorie.id}
                  as={NavLink}
                  to={`/artisans?categorie=${encodeURIComponent(categorie.nom)}`}
                >
                  {categorie.nom}
                </Nav.Link>
              ))}
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
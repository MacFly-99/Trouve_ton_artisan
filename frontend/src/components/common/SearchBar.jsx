import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, FormControl, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ isScrolled }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedSearch = searchTerm.trim();
    if (trimmedSearch) {
      console.log(`🔍 Recherche lancée: "${trimmedSearch}"`);
      navigate(`/artisans?recherche=${encodeURIComponent(trimmedSearch)}`);
      setSearchTerm('');
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <Form className={`search-bar ${isScrolled ? 'search-bar-scrolled' : ''}`} onSubmit={handleSearch} role="search">
      <FormControl
        type="search"
        placeholder="Rechercher un artisan..."
        aria-label="Rechercher un artisan"
        value={searchTerm}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        className={`search-input ${isScrolled ? 'search-input-scrolled' : ''}`}
      />
      <Button 
        type="submit" 
        variant="link" 
        className={`search-button ${isScrolled ? 'search-button-scrolled' : ''}`}
        aria-label="Lancer la recherche"
      >
        <FaSearch />
      </Button>
    </Form>
  );
};

export default SearchBar;
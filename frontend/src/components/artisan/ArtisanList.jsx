import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert, Form } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getArtisans, getVilles } from '../../api/artisanApi';
import ArtisanCard from './ArtisanCard';

const ArtisanList = () => {
  const [searchParams] = useSearchParams();
  const [artisans, setArtisans] = useState([]);
  const [villes, setVilles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    recherche: searchParams.get('recherche') || '',
    categorie: searchParams.get('categorie') || '',
    specialite: searchParams.get('specialite') || '',
    ville: searchParams.get('ville') || '',
    tri: 'note'
  });

  useEffect(() => {
    const fetchVilles = async () => {
      try {
        const response = await getVilles();
        setVilles(response.data || []);
      } catch (err) {
        console.error('Erreur chargement villes:', err);
      }
    };
    fetchVilles();
  }, []);

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        setLoading(true);
        const params = {};
        if (filters.recherche) params.recherche = filters.recherche;
        if (filters.categorie) params.categorie = filters.categorie;
        if (filters.specialite) params.specialite = filters.specialite;
        if (filters.ville) params.ville = filters.ville;
        if (filters.tri) params.tri = filters.tri;
        
        const response = await getArtisans(params);
        setArtisans(response.data || []);
      } catch (err) {
        setError('Erreur lors du chargement des artisans');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchArtisans();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Chargement des artisans...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <>
      <Helmet>
        <title>Artisans - Trouve ton artisan</title>
        <meta name="description" content="Découvrez tous les artisans de la région Auvergne-Rhône-Alpes." />
      </Helmet>
      
      <Container className="py-4">
        <h1 className="mb-4 text-primary-dark">Nos artisans</h1>
        
        <Row className="mb-4">
          <Col md={4} className="mb-3">
            <Form.Select
              name="ville"
              value={filters.ville}
              onChange={handleFilterChange}
              aria-label="Filtrer par ville"
            >
              <option value="">Toutes les villes</option>
              {villes.map((ville) => (
                <option key={ville} value={ville}>{ville}</option>
              ))}
            </Form.Select>
          </Col>
          <Col md={4} className="mb-3">
            <Form.Select
              name="tri"
              value={filters.tri}
              onChange={handleFilterChange}
              aria-label="Trier les résultats"
            >
              <option value="note">Trier par note</option>
              <option value="nom">Trier par nom</option>
            </Form.Select>
          </Col>
          <Col md={4} className="mb-3 text-md-end">
            <span className="text-secondary">
              {artisans.length} artisan{artisans.length > 1 ? 's' : ''} trouvé{artisans.length > 1 ? 's' : ''}
            </span>
          </Col>
        </Row>
        
        {artisans.length === 0 ? (
          <Alert variant="info">
            Aucun artisan ne correspond à vos critères. Essayez d\'autres filtres.
          </Alert>
        ) : (
          <Row>
            {artisans.map((artisan) => (
              <Col key={artisan.id} lg={4} md={6} className="mb-4">
                <ArtisanCard artisan={artisan} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

export default ArtisanList;
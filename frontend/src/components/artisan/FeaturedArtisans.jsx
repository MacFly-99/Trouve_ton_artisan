import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { getArtisansVedette } from '../../api/artisanApi';
import ArtisanCard from './ArtisanCard';

const FeaturedArtisans = () => {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        console.log('📡 Chargement des artisans vedette...');
        const response = await getArtisansVedette();
        if (response && response.data) {
          setArtisans(response.data);
          console.log(`✅ ${response.data.length} artisans vedette chargés`);
        } else {
          setArtisans([]);
        }
      } catch (err) {
        console.error('❌ Erreur chargement artisans vedette:', err);
        setError('Erreur lors du chargement des artisans en vedette');
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

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
      <Container className="text-center py-5">
        <p className="text-danger">{error}</p>
      </Container>
    );
  }

  if (artisans.length === 0) {
    return (
      <Container className="text-center py-5">
        <p className="text-secondary">Aucun artisan en vedette pour le moment.</p>
      </Container>
    );
  }

  return (
    <section className="featured-section" aria-labelledby="featured-title">
      <Container>
        {/* Barre de séparation rouge */}
        <div className="section-divider"></div>
        
        <h2 id="featured-title" className="text-center mb-4 display-5 fw-bold text-primary-dark">
          Les artisans du mois
        </h2>
        <Row>
          {artisans.map((artisan) => (
            <Col key={artisan.id} lg={4} md={6} className="mb-4">
              <ArtisanCard artisan={artisan} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FeaturedArtisans;
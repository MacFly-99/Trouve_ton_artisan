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
        const response = await getArtisansVedette();
        setArtisans(response.data);
      } catch (err) {
        setError('Erreur lors du chargement des artisans en vedette');
        console.error(err);
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

  return (
    <section className="py-5" aria-labelledby="featured-title">
      <Container>
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
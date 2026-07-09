import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import StepsSection from '../components/common/StepsSection';
import FeaturedArtisans from '../components/artisan/FeaturedArtisans';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Trouve ton artisan - Région Auvergne-Rhône-Alpes</title>
        <meta name="description" content="Trouvez facilement un artisan dans la région Auvergne-Rhône-Alpes. Consultez les profils, notes et contactez-les directement." />
      </Helmet>
      
      <main id="main-content">
        {/* Section Hero avec marge pour ne pas être cachée par le header */}
        <section className="hero-section" aria-label="Présentation">
          <Container className="py-5">
            <Row className="justify-content-center text-center">
              <Col lg={8}>
                <h1 className="display-3 fw-bold text-primary-dark mb-3">
                  Trouvez l'artisan qu'il vous faut
                </h1>
                <p className="lead text-secondary fs-4">
                  Plus de 17 artisans qualifiés dans toute la région Auvergne-Rhône-Alpes
                </p>
                <div className="mt-4">
                  <span className="badge bg-primary me-2 p-2">🔧 Qualifiés</span>
                  <span className="badge bg-success me-2 p-2">⭐ Notés</span>
                  <span className="badge bg-info p-2">📞 Contact facile</span>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        
        <StepsSection />
        <FeaturedArtisans />
      </main>
    </>
  );
};

export default HomePage;
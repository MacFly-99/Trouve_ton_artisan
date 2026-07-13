import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import StepsSection from '../components/artisan/StepsSections';
import FeaturedArtisans from '../components/artisan/FeaturedArtisans';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Trouve ton artisan - Région Auvergne-Rhône-Alpes</title>
        <meta name="description" content="Trouvez facilement un artisan dans la région Auvergne-Rhône-Alpes. Consultez les profils, notes et contactez-les directement." />
      </Helmet>
      
      <main id="main-content">
        {/* Section Hero */}
        <section className="hero-section" aria-label="Présentation">
          <Container className="py-5">
            <Row className="justify-content-center text-center">
              <Col lg={8}>
              <h1 className="display-3 fw-bold" style={{ color: '#00497c' }} mb-3>
                Trouvez l'artisan qu'il vous faut
              </h1>
                <p className="lead text-secondary fs-4">
                  Plus de 15 artisans qualifiés dans toute la région Auvergne-Rhône-Alpes
                </p>
                <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
                  <span className="badge-region badge-blue">
                    🔧 Artisans qualifiés
                  </span>
                  <span className="badge-region badge-green">
                    ⭐ Notés par les 
                  </span>
                  <span className="badge-region badge-light">
                    📞 Contact facile
                  </span>
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
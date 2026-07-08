import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import StepsSection from '../components/common/StepsSection';
import FeaturedArtisans from '../components/artisan/FeaturedArtisans';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Trouve ton artisan - Région Auvergne-Rhône-Alpes</title>
        <meta name="description" content="Trouvez facilement un artisan dans la région Auvergne-Rhône-Alpes. Consultez les profils, notes et contactez-les directement." />
      </Helmet>
      
      <main id="main-content">
        <Container>
          <Row className="py-4">
            <Col>
              <h1 className="text-center display-4 fw-bold text-primary-dark">
                Trouvez l'artisan qu'il vous faut
              </h1>
              <p className="text-center lead text-secondary">
                Plus de 17 artisans qualifiés dans toute la région Auvergne-Rhône-Alpes
              </p>
            </Col>
          </Row>
        </Container>
        
        <StepsSection />
        <FeaturedArtisans />
      </main>
    </>
  );
};

export default Home;
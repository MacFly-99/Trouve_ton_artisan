import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page non trouvée - Trouve ton artisan</title>
        <meta name="description" content="La page que vous recherchez n'existe pas." />
      </Helmet>
      
      <Container className="not-found">
        <div>
          <img 
            src="/images/404.svg" 
            alt="Illustration page non trouvée" 
            className="not-found-image"
          />
          <h1>Page non trouvée</h1>
          <p className="lead text-secondary mb-4">
            La page que vous avez demandée n'existe pas ou a été déplacée.
          </p>
          <Link to="/">
            <Button variant="primary" size="lg">
              Retour à l'accueil
            </Button>
          </Link>
        </div>
      </Container>
    </>
  );
};

export default NotFound;
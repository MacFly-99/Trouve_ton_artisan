import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const StepsSection = () => {
  const steps = [
    {
      number: 1,
      title: 'Choisir la catégorie',
      description: 'Parcourez les catégories dans le menu pour trouver la spécialité qui vous correspond.'
    },
    {
      number: 2,
      title: 'Choisir un artisan',
      description: 'Consultez les profils, notes et avis des artisans pour faire votre choix.'
    },
    {
      number: 3,
      title: 'Le contacter',
      description: 'Utilisez le formulaire de contact pour poser vos questions ou demander un devis.'
    },
    {
      number: 4,
      title: 'Réponse sous 48h',
      description: 'L\'artisan vous répondra dans les 48 heures suivant votre demande.'
    }
  ];

  return (
    <section className="steps-section" aria-labelledby="steps-title">
      <Container>
        {/* Barre de séparation rouge */}
        <div className="section-divider"></div>
        
        <h2 id="steps-title" className="text-center mb-5 display-5 fw-bold text-primary-dark">
          Comment trouver mon artisan ?
        </h2>
        <Row className="g-4">
          {steps.map((step) => (
            <Col key={step.number} lg={3} md={6}>
              <div className="step-card">
                <div className="step-number" aria-hidden="true">
                  {step.number}
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default StepsSection;
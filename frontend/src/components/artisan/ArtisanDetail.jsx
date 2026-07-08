import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { FaStar, FaStarHalfAlt, FaRegStar, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa';
import { getArtisanById } from '../../api/artisanApi';
import ContactForm from '../contact/ContactForm';

const ArtisanDetail = () => {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtisan = async () => {
      try {
        const response = await getArtisanById(id);
        setArtisan(response.data);
      } catch (err) {
        setError('Erreur lors du chargement de l\'artisan');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchArtisan();
  }, [id]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-warning" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-warning" />);
    }
    
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-secondary" />);
    }
    
    return stars;
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Chargement de l'artisan...</p>
      </Container>
    );
  }

  if (error || !artisan) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error || 'Artisan non trouvé'}</Alert>
        <Link to="/" className="btn btn-primary">Retour à l'accueil</Link>
      </Container>
    );
  }

  return (
    <>
      <Helmet>
        <title>{artisan.nom} - Trouve ton artisan</title>
        <meta name="description" content={`${artisan.nom} - ${artisan.specialite?.nom || 'Artisan'} à ${artisan.ville || ''}. Contactez-le directement.`} />
      </Helmet>
      
      <main id="main-content">
        <Container className="py-4 artisan-detail">
          <nav aria-label="Fil d'Ariane">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Accueil</Link></li>
              <li className="breadcrumb-item"><Link to="/artisans">Artisans</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{artisan.nom}</li>
            </ol>
          </nav>
          
          <div className="artisan-header">
            <Row>
              <Col lg={4} className="text-center text-lg-start">
                <img 
                  src={artisan.url_image || '/images/default-artisan.jpg'} 
                  alt={`${artisan.nom}`}
                  className="artisan-image"
                />
              </Col>
              <Col lg={8}>
                <h1 className="display-5 fw-bold text-primary-dark">{artisan.nom}</h1>
                {artisan.nom_entreprise && (
                  <h2 className="h5 text-secondary">{artisan.nom_entreprise}</h2>
                )}
                
                <div className="mb-3">
                  <span className="rating" aria-label={`Note de ${artisan.note} sur 5`}>
                    {renderStars(artisan.note)}
                  </span>
                  <span className="rating-number ms-1 fw-bold">{artisan.note.toFixed(1)}</span>
                </div>
                
                <div className="mb-2">
                  <span className="specialty-badge bg-primary text-white px-3 py-2 rounded-pill">
                    {artisan.specialite?.nom || 'Spécialité non définie'}
                  </span>
                  {artisan.specialite?.categorie && (
                    <span className="ms-2 text-secondary">
                      • {artisan.specialite.categorie.nom}
                    </span>
                  )}
                </div>
                
                {artisan.ville && (
                  <div className="mb-3">
                    <FaMapMarkerAlt className="me-2 text-primary" aria-hidden="true" />
                    <span>{artisan.ville}</span>
                    {artisan.code_postal && <span> ({artisan.code_postal})</span>}
                  </div>
                )}
                
                {artisan.site_web && (
                  <div className="mb-3">
                    <FaGlobe className="me-2 text-primary" aria-hidden="true" />
                    <a 
                      href={artisan.site_web} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-decoration-none"
                    >
                      {artisan.site_web.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}
                
                {artisan.telephone && (
                  <div>
                    <a href={`tel:${artisan.telephone}`} className="btn btn-outline-primary">
                      Appeler
                    </a>
                  </div>
                )}
              </Col>
            </Row>
          </div>
          
          <Row>
            <Col lg={6} className="mb-4">
              <h3 className="text-primary-dark">À propos</h3>
              <p className="text-secondary">
                {artisan.description || 'Aucune description disponible.'}
              </p>
            </Col>
            <Col lg={6}>
              <h3 className="text-primary-dark">Contacter l'artisan</h3>
              <ContactForm artisan={artisan} />
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
};

export default ArtisanDetail;
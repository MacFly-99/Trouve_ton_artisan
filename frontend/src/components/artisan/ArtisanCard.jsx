import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar, FaMapMarkerAlt } from 'react-icons/fa';

const ArtisanCard = ({ artisan }) => {
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

  return (
    <Card className="artisan-card h-100">
      <Link 
        to={`/artisan/${artisan.id}`} 
        className="text-decoration-none text-dark"
        aria-label={`Voir le profil de ${artisan.nom}`}
      >
        <Card.Img 
          variant="top" 
          src={artisan.url_image || '/images/default-artisan.jpg'} 
          alt={`${artisan.nom}`}
        />
        <Card.Body>
          <Card.Title className="h5">{artisan.nom}</Card.Title>
          
          <div className="mb-2">
            <span className="rating" aria-label={`Note de ${artisan.note} sur 5`}>
              {renderStars(artisan.note)}
            </span>
            <span className="rating-number ms-1">{artisan.note.toFixed(1)}</span>
          </div>
          
          <div className="mb-2">
            <span className="specialty-badge">
              {artisan.specialite?.nom || 'Spécialité non définie'}
            </span>
          </div>
          
          {artisan.ville && (
            <div className="location">
              <FaMapMarkerAlt className="location-icon" aria-hidden="true" />
              {artisan.ville}
            </div>
          )}
        </Card.Body>
      </Link>
    </Card>
  );
};

export default ArtisanCard;
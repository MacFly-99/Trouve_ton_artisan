import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer" role="contentinfo">
      <Container>
        <Row className="py-4">
          {/* Logo uniquement */}
          <Col lg={4} md={6} className="mb-4 mb-lg-0">
            <img 
              src="/Logo.png" 
              alt="Trouve ton artisan - Auvergne-Rhône-Alpes" 
              className="footer-logo mb-3"
              onError={(e) => {
                e.target.src = '/favicon-32.png';
              }}
            />
            <p className="footer-description">
              Trouvez facilement un artisan qualifié dans la région Auvergne-Rhône-Alpes.
            </p>
          </Col>
          
          {/* Liens utiles */}
          <Col lg={4} md={6} className="mb-4 mb-lg-0">
            <h5>Liens utiles</h5>
            <ul className="list-unstyled footer-links">
              <li><Link to="/mentions-legales">Mentions légales</Link></li>
              <li><Link to="/donnees-personnelles">Données personnelles</Link></li>
              <li><Link to="/accessibilite">Accessibilité</Link></li>
              <li><Link to="/cookies">Cookies</Link></li>
            </ul>
          </Col>
          
          {/* Contact */}
          <Col lg={4}>
            <h5>Contact</h5>
            <div className="footer-contact">
              <p>
                <FaMapMarkerAlt className="footer-icon" />
                <span>
                  101 cours Charlemagne<br />
                  CS 20033<br />
                  69269 LYON CEDEX 02<br />
                  France
                </span>
              </p>
              <p>
                <FaPhone className="footer-icon" />
                <a href="tel:+33426734000">+33 (0)4 26 73 40 00</a>
              </p>
              <p>
                <FaEnvelope className="footer-icon" />
                <a href="mailto:contact@auvergnerhonealpes.fr">
                  contact@auvergnerhonealpes.fr
                </a>
              </p>
              <p className="footer-hours">
                <FaClock className="footer-icon" />
                <span>Lun-Ven : 8h30 - 17h</span>
              </p>
            </div>
          </Col>
        </Row>
        
        <hr className="footer-divider" />
        
        <Row>
          <Col className="text-center footer-copyright">
            &copy; {new Date().getFullYear()} - Région Auvergne-Rhône-Alpes - Tous droits réservés
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
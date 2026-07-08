import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer" role="contentinfo">
      <Container>
        <Row>
          <Col lg={4} md={6} className="mb-4 mb-lg-0">
            <img 
              src="/logo.png" 
              alt="Trouve ton artisan - Auvergne Rhône-Alpes" 
              className="footer-logo mb-3"
            />
            <p className="text-light opacity-75">
              Trouvez facilement un artisan dans la région Auvergne-Rhône-Alpes.
            </p>
          </Col>
          
          <Col lg={4} md={6} className="mb-4 mb-lg-0">
            <h5 className="text-white mb-3">Liens utiles</h5>
            <ul className="list-unstyled">
              <li><Link to="/mentions-legales">Mentions légales</Link></li>
              <li><Link to="/donnees-personnelles">Données personnelles</Link></li>
              <li><Link to="/accessibilite">Accessibilité</Link></li>
              <li><Link to="/cookies">Cookies</Link></li>
            </ul>
          </Col>
          
          <Col lg={4}>
            <h5 className="text-white mb-3">Contact</h5>
            <address className="contact-info">
              <p>
                <FaMapMarkerAlt className="me-2" aria-hidden="true" />
                101 cours Charlemagne<br />
                CS 20033<br />
                69269 LYON CEDEX 02<br />
                France
              </p>
              <p>
                <FaPhone className="me-2" aria-hidden="true" />
                <a href="tel:+33426734000">+33 (0)4 26 73 40 00</a>
              </p>
              <p>
                <FaEnvelope className="me-2" aria-hidden="true" />
                <a href="mailto:contact@auvergnerhonealpes.fr">
                  contact@auvergnerhonealpes.fr
                </a>
              </p>
            </address>
          </Col>
        </Row>
        
        <hr className="border-light opacity-25 my-4" />
        
        <Row>
          <Col className="text-center text-light opacity-75 small">
            &copy; {new Date().getFullYear()} - Région Auvergne-Rhône-Alpes - Tous droits réservés
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
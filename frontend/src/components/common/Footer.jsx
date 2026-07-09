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
              src="/Logo.png" 
              alt="Trouve ton artisan - Auvergne Rhône-Alpes" 
              className="footer-logo"
              onError={(e) => {
                e.target.src = '/favicon-32.png';
              }}
            />
            <p className="text-white-50">
              Trouvez facilement un artisan dans la région Auvergne-Rhône-Alpes.
            </p>
          </Col>
          
          <Col lg={4} md={6} className="mb-4 mb-lg-0">
            <h5>Liens utiles</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/mentions-legales">Mentions légales</Link></li>
              <li className="mb-2"><Link to="/donnees-personnelles">Données personnelles</Link></li>
              <li className="mb-2"><Link to="/accessibilite">Accessibilité</Link></li>
              <li className="mb-2"><Link to="/cookies">Cookies</Link></li>
            </ul>
          </Col>
          
          <Col lg={4}>
            <h5>Contact</h5>
            <address className="contact-info">
              <p>
                <FaMapMarkerAlt aria-hidden="true" />
                <span>
                  101 cours Charlemagne<br />
                  CS 20033<br />
                  69269 LYON CEDEX 02<br />
                  France
                </span>
              </p>
              <p>
                <FaPhone aria-hidden="true" />
                <a href="tel:+33426734000">+33 (0)4 26 73 40 00</a>
              </p>
              <p>
                <FaEnvelope aria-hidden="true" />
                <a href="mailto:contact@auvergnerhonealpes.fr">
                  contact@auvergnerhonealpes.fr
                </a>
              </p>
            </address>
          </Col>
        </Row>
        
        <hr />
        
        <Row>
          <Col className="text-center copyright">
            &copy; {new Date().getFullYear()} - Région Auvergne-Rhône-Alpes - Tous droits réservés
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
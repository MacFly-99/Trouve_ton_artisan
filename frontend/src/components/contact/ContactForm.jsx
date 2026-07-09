import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import api from '../../api/artisanApi';

const ContactForm = ({ artisan }) => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    objet: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nom || !formData.email || !formData.message) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Utiliser l'API configurée avec la clé API
      const response = await api.post('/contact', {
        artisanId: artisan.id,
        artisanNom: artisan.nom,
        artisanEmail: artisan.email,
        nom: formData.nom,
        email: formData.email,
        objet: formData.objet,
        message: formData.message
      });

      console.log('✅ Email envoyé:', response.data);
      setSubmitted(true);
      setFormData({
        nom: '',
        email: '',
        objet: '',
        message: ''
      });
    } catch (err) {
      console.error('❌ Erreur envoi email:', err);
      if (err.response?.status === 401) {
        setError('Erreur d\'authentification. Veuillez vérifier la configuration de l\'API.');
      } else {
        setError('Erreur lors de l\'envoi du message. Veuillez réessayer.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Alert variant="success">
        <Alert.Heading>✅ Message envoyé !</Alert.Heading>
        <p>
          Votre message a bien été envoyé à <strong>{artisan.nom}</strong>.
          Il vous répondra dans les 48 heures.
        </p>
        <Button variant="outline-success" onClick={() => setSubmitted(false)}>
          Envoyer un autre message
        </Button>
      </Alert>
    );
  }

  return (
    <Form onSubmit={handleSubmit} className="contact-form">
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form.Group className="mb-3">
        <Form.Label htmlFor="nom">Nom *</Form.Label>
        <Form.Control
          id="nom"
          type="text"
          name="nom"
          placeholder="Votre nom"
          value={formData.nom}
          onChange={handleChange}
          required
          disabled={loading}
          aria-required="true"
        />
      </Form.Group>
      
      <Form.Group className="mb-3">
        <Form.Label htmlFor="email">Email *</Form.Label>
        <Form.Control
          id="email"
          type="email"
          name="email"
          placeholder="votre@email.fr"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={loading}
          aria-required="true"
        />
      </Form.Group>
      
      <Form.Group className="mb-3">
        <Form.Label htmlFor="objet">Objet</Form.Label>
        <Form.Control
          id="objet"
          type="text"
          name="objet"
          placeholder="Objet de votre message"
          value={formData.objet}
          onChange={handleChange}
          disabled={loading}
        />
      </Form.Group>
      
      <Form.Group className="mb-3">
        <Form.Label htmlFor="message">Message *</Form.Label>
        <Form.Control
          id="message"
          as="textarea"
          name="message"
          rows={4}
          placeholder="Votre message..."
          value={formData.message}
          onChange={handleChange}
          required
          disabled={loading}
          aria-required="true"
        />
      </Form.Group>
      
      <Button type="submit" variant="primary" className="w-100" disabled={loading}>
        {loading ? (
          <>
            <Spinner animation="border" size="sm" className="me-2" />
            Envoi en cours...
          </>
        ) : (
          'Envoyer le message'
        )}
      </Button>
    </Form>
  );
};

export default ContactForm;
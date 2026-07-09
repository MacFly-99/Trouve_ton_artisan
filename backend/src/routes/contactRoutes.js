const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { authenticateAPI } = require('../middleware/auth');
require('dotenv').config();

// Configuration du transporteur Mailtrap
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: parseInt(process.env.MAILTRAP_PORT),
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASSWORD
  }
});

// Vérifier la connexion SMTP
transporter.verify(function(error, success) {
  if (error) {
    console.log('❌ Erreur connexion SMTP Mailtrap:', error);
  } else {
    console.log('✅ Serveur Mailtrap prêt à envoyer des emails');
  }
});

router.post('/contact', authenticateAPI, async (req, res) => {
  try {
    const { artisanNom, artisanEmail, nom, email, objet, message } = req.body;

    // Validation
    if (!nom || !email || !message) {
      return res.status(400).json({
        error: 'Champs obligatoires manquants',
        message: 'Nom, email et message sont requis'
      });
    }

    // Construction de l'email
    const mailOptions = {
      from: process.env.MAIL_FROM || 'contact@trouve-ton-artisan.fr',
      to: artisanEmail,
      subject: `[Trouve ton artisan] Demande de contact - ${artisanNom}`,
      html: `
        <h2>Nouveau message de ${nom}</h2>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Artisan :</strong> ${artisanNom}</p>
        ${objet ? `<p><strong>Objet :</strong> ${objet}</p>` : ''}
        <h3>Message :</h3>
        <p>${message}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">
          Ce message a été envoyé via la plateforme "Trouve ton artisan" - Région Auvergne-Rhône-Alpes
        </p>
      `
    };

    // Envoi de l'email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: 'Email envoyé avec succès'
    });
  } catch (error) {
    console.error('Erreur envoi email:', error);
    res.status(500).json({
      error: 'Erreur lors de l\'envoi de l\'email',
      message: error.message
    });
  }
});

module.exports = router;
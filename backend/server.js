const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const artisanRoutes = require('./src/routes/artisanRoutes');
const { initDatabase } = require('./src/models');

const app = express();
const PORT = process.env.PORT || 5002;

// =============================================
// CONFIGURATION DE LA SÉCURITÉ
// =============================================

// Helmet pour sécuriser les headers HTTP
app.use(helmet());

// Limitation du taux de requêtes (Rate Limiting)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite de 100 requêtes par fenêtre
  message: {
    error: 'Trop de requêtes',
    message: 'Veuillez réessayer dans 15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api', limiter);

// Configuration CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key']
}));

// Middleware pour parser le JSON et les URL encodées
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// =============================================
// ROUTES
// =============================================

// Routes API
app.use('/api', artisanRoutes);

// Route de santé pour vérifier que l'API fonctionne
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API Trouve ton Artisan - Auvergne Rhône-Alpes',
    timestamp: new Date().toISOString()
  });
});

// Route 404 - API
app.use('/api/*', (req, res) => {
  res.status(404).json({
    error: 'Route non trouvée',
    message: `La route ${req.originalUrl} n'existe pas`
  });
});

// =============================================
// GESTION DES ERREURS
// =============================================

app.use((err, req, res, next) => {
  console.error('Erreur:', err.stack);
  
  // Erreur de validation
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      error: 'Erreur de validation',
      details: err.errors.map(e => e.message)
    });
  }
  
  // Erreur de base de données
  if (err.name === 'SequelizeDatabaseError') {
    return res.status(500).json({
      error: 'Erreur de base de données',
      message: 'Une erreur est survenue lors de l\'accès à la base de données'
    });
  }
  
  res.status(500).json({
    error: 'Erreur serveur',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Une erreur est survenue'
  });
});

// =============================================
// DÉMARRAGE DU SERVEUR
// =============================================

const startServer = async () => {
  try {
    // Initialiser la base de données
    await initDatabase();
    
    // Démarrer le serveur
    app.listen(PORT, () => {
      console.log('='.repeat(50));
      console.log('🚀 SERVEUR DÉMARRÉ');
      console.log('='.repeat(50));
      console.log(`📡 URL: http://localhost:${PORT}`);
      console.log(`🏥 Health: http://localhost:${PORT}/health`);
      console.log(`📖 API: http://localhost:${PORT}/api`);
      console.log(`🌍 Environnement: ${process.env.NODE_ENV || 'development'}`);
      console.log('='.repeat(50));
    });
  } catch (error) {
    console.error('❌ Erreur au démarrage du serveur:', error);
    process.exit(1);
  }
};

// Gestion des signaux d'arrêt
process.on('SIGTERM', () => {
  console.log('🛑 Signal SIGTERM reçu, arrêt du serveur...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 Signal SIGINT reçu, arrêt du serveur...');
  process.exit(0);
});

// Démarrer le serveur
startServer();
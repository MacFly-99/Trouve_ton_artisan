const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const artisanRoutes = require('./src/routes/artisanRoutes');
const contactRoutes = require('./src/routes/contactRoutes');
const { initDatabase } = require('./src/models');

const app = express();
const PORT = process.env.PORT || 5002;

// =============================================
// CONFIGURATION CORS
// =============================================

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    'http://127.0.0.1:3002',
    'https://trouve-ton-artisan-backend-k4y0.onrender.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key']
};

app.use(cors(corsOptions));

// =============================================
// CONFIGURATION DE LA SÉCURITÉ
// =============================================

// Helmet pour sécuriser les headers HTTP
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Limitation du taux de requêtes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    error: 'Trop de requêtes',
    message: 'Veuillez réessayer dans 15 minutes'
  }
});

app.use('/api', limiter);

// Middleware pour parser le JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// =============================================
// ROUTES
// =============================================

// Route de santé
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API Artisan Platform - Auvergne Rhône-Alpes',
    timestamp: new Date().toISOString()
  });
});

// Routes API
app.use('/api', artisanRoutes);
app.use('/api', contactRoutes);

// Route 404 - API
app.use('/api', (req, res) => {
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

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      error: 'Erreur de validation',
      details: err.errors.map(e => e.message)
    });
  }

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
    await initDatabase();

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

startServer();
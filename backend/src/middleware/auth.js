require('dotenv').config();

// Middleware pour authentifier l'API
const authenticateAPI = (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.query.api_key;
  
  if (!apiKey) {
    return res.status(401).json({ 
      error: 'Clé API requise',
      message: 'Veuillez fournir une clé API dans le header x-api-key'
    });
  }
  
  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({ 
      error: 'Clé API invalide',
      message: 'La clé API fournie n\'est pas valide'
    });
  }
  
  next();
};

// Middleware pour logger les requêtes
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url} - IP: ${req.ip}`);
  next();
};

module.exports = { authenticateAPI, requestLogger };
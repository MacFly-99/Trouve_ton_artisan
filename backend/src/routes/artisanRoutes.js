const express = require('express');
const router = express.Router();
const { body, param, query } = require('express-validator');
const artisanController = require('../controllers/artisanController');
const { authenticateAPI } = require('../middleware/auth');

// Validation des paramètres
const validateArtisanId = [
  param('id').isInt().withMessage('ID doit être un entier')
];

const validateSearch = [
  query('search').optional().isString().trim().escape(),
  query('category').optional().isString().trim().escape(),
  query('specialty').optional().isString().trim().escape(),
  query('city').optional().isString().trim().escape()
];

// Routes publiques (protégées par clé API)
router.get('/artisans', 
  authenticateAPI, 
  validateSearch, 
  artisanController.getAllArtisans
);

router.get('/artisans/featured', 
  authenticateAPI, 
  artisanController.getFeaturedArtisans
);

router.get('/artisans/:id', 
  authenticateAPI, 
  validateArtisanId, 
  artisanController.getArtisanById
);

router.get('/categories', 
  authenticateAPI, 
  artisanController.getMenuCategories
);

router.get('/categories/:categorieId/specialites', 
  authenticateAPI, 
  artisanController.getSpecialitesByCategorie
);

router.get('/cities', 
  authenticateAPI, 
  artisanController.getCities
);

module.exports = router;
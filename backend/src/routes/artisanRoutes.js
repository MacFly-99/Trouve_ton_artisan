const express = require('express');
const router = express.Router();
const artisanController = require('../controllers/artisanController');
const { authenticateAPI } = require('../middleware/auth');

// Routes protégées par clé API
router.get('/artisans', authenticateAPI, artisanController.getAllArtisans);
router.get('/artisans/vedette', authenticateAPI, artisanController.getArtisansVedette);
router.get('/artisans/:id', authenticateAPI, artisanController.getArtisanById);
router.get('/categories', authenticateAPI, artisanController.getCategoriesMenu);
router.get('/categories/:categorieId/specialites', authenticateAPI, artisanController.getSpecialitesByCategorie);
router.get('/villes', authenticateAPI, artisanController.getVilles);

module.exports = router;
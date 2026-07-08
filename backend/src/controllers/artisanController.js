const { models } = require('../models');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');

const { Artisan, Specialite, Categorie } = models;

// Récupérer tous les artisans avec filtres
exports.getAllArtisans = async (req, res) => {
  try {
    const { category, specialty, search, featured, city, sort } = req.query;
    
    let whereConditions = {};
    let include = [
      {
        model: Specialite,
        as: 'specialite',
        include: [{
          model: Categorie,
          as: 'categorie'
        }]
      }
    ];
    
    // Filtre par recherche (nom de l'artisan)
    if (search) {
      whereConditions.name = {
        [Op.like]: `%${search}%`
      };
    }
    
    // Filtre par catégorie
    if (category) {
      include[0].include[0].where = {
        name: {
          [Op.like]: `%${category}%`
        }
      };
    }
    
    // Filtre par spécialité
    if (specialty) {
      include[0].where = {
        name: {
          [Op.like]: `%${specialty}%`
        }
      };
    }
    
    // Filtre par ville
    if (city) {
      whereConditions.city = {
        [Op.like]: `%${city}%`
      };
    }
    
    // Filtre artisans en vedette
    if (featured === 'true') {
      whereConditions.is_featured = true;
    }
    
    // Gestion du tri
    let order = [];
    if (sort === 'rating') {
      order = [['rating', 'DESC']];
    } else if (sort === 'name') {
      order = [['name', 'ASC']];
    } else {
      order = [['rating', 'DESC']];
    }
    
    const artisans = await Artisan.findAll({
      where: whereConditions,
      include: include,
      order: order
    });
    
    res.status(200).json({
      success: true,
      count: artisans.length,
      data: artisans
    });
  } catch (error) {
    console.error('Erreur getAllArtisans:', error);
    res.status(500).json({ 
      error: 'Erreur serveur',
      message: error.message 
    });
  }
};

// Récupérer un artisan par ID
exports.getArtisanById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const artisan = await Artisan.findByPk(id, {
      include: [
        {
          model: Specialite,
          as: 'specialite',
          include: [{
            model: Categorie,
            as: 'categorie'
          }]
        }
      ]
    });
    
    if (!artisan) {
      return res.status(404).json({ 
        error: 'Artisan non trouvé',
        message: `Aucun artisan trouvé avec l'ID ${id}`
      });
    }
    
    res.status(200).json({
      success: true,
      data: artisan
    });
  } catch (error) {
    console.error('Erreur getArtisanById:', error);
    res.status(500).json({ 
      error: 'Erreur serveur',
      message: error.message 
    });
  }
};

// Récupérer les artisans en vedette (Top 3)
exports.getFeaturedArtisans = async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      where: {
        is_featured: true
      },
      include: [
        {
          model: Specialite,
          as: 'specialite',
          include: [{
            model: Categorie,
            as: 'categorie'
          }]
        }
      ],
      order: [['rating', 'DESC']],
      limit: 3
    });
    
    res.status(200).json({
      success: true,
      count: artisans.length,
      data: artisans
    });
  } catch (error) {
    console.error('Erreur getFeaturedArtisans:', error);
    res.status(500).json({ 
      error: 'Erreur serveur',
      message: error.message 
    });
  }
};

// Récupérer les catégories avec leurs spécialités pour le menu
exports.getMenuCategories = async (req, res) => {
  try {
    const categories = await Categorie.findAll({
      include: [{
        model: Specialite,
        as: 'specialites',
        attributes: ['id', 'name']
      }],
      attributes: ['id', 'name']
    });
    
    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Erreur getMenuCategories:', error);
    res.status(500).json({ 
      error: 'Erreur serveur',
      message: error.message 
    });
  }
};

// Récupérer les spécialités par catégorie
exports.getSpecialitesByCategorie = async (req, res) => {
  try {
    const { categorieId } = req.params;
    
    const specialites = await Specialite.findAll({
      where: {
        categorie_id: categorieId
      },
      include: [{
        model: Categorie,
        as: 'categorie',
        attributes: ['name']
      }]
    });
    
    res.status(200).json({
      success: true,
      data: specialites
    });
  } catch (error) {
    console.error('Erreur getSpecialitesByCategorie:', error);
    res.status(500).json({ 
      error: 'Erreur serveur',
      message: error.message 
    });
  }
};

// Récupérer toutes les villes distinctes (pour filtres)
exports.getCities = async (req, res) => {
  try {
    const cities = await Artisan.findAll({
      attributes: [[Artisan.sequelize.fn('DISTINCT', Artisan.sequelize.col('city')), 'city']],
      where: {
        city: {
          [Op.ne]: null
        }
      },
      order: [['city', 'ASC']]
    });
    
    res.status(200).json({
      success: true,
      data: cities.map(c => c.city).filter(c => c)
    });
  } catch (error) {
    console.error('Erreur getCities:', error);
    res.status(500).json({ 
      error: 'Erreur serveur',
      message: error.message 
    });
  }
};
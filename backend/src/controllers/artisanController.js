const { models } = require('../models');
const { Op } = require('sequelize');

const { Artisan, Specialite, Categorie } = models;

// =============================================
// RÉCUPÉRER TOUS LES ARTISANS
// =============================================
exports.getAllArtisans = async (req, res) => {
  try {
    const { categorie, specialite, recherche, vedette, ville, tri } = req.query;
    
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
    if (recherche) {
      whereConditions.nom = {
        [Op.like]: `%${recherche}%`
      };
    }
    
    // Filtre par catégorie
    if (categorie) {
      include[0].include[0].where = {
        nom: {
          [Op.like]: `%${categorie}%`
        }
      };
    }
    
    // Filtre par spécialité
    if (specialite) {
      include[0].where = {
        nom: {
          [Op.like]: `%${specialite}%`
        }
      };
    }
    
    // Filtre par ville
    if (ville) {
      whereConditions.ville = {
        [Op.like]: `%${ville}%`
      };
    }
    
    // Filtre artisans en vedette
    if (vedette === 'true') {
      whereConditions.est_vedette = true;
    }
    
    // Gestion du tri
    let order = [];
    if (tri === 'note') {
      order = [['note', 'DESC']];
    } else if (tri === 'nom') {
      order = [['nom', 'ASC']];
    } else {
      order = [['note', 'DESC']];
    }
    
    const artisans = await Artisan.findAll({
      where: whereConditions,
      include: include,
      order: order,
      attributes: {
        include: [
          [Artisan.sequelize.fn('CAST', Artisan.sequelize.col('note'), 'DECIMAL(2,1)'), 'note']
        ]
      }
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

// =============================================
// RÉCUPÉRER UN ARTISAN PAR ID
// =============================================
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

// =============================================
// RÉCUPÉRER LES ARTISANS EN VEDETTE (TOP 3)
// =============================================
exports.getArtisansVedette = async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      where: {
        est_vedette: true
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
      order: [['note', 'DESC']],
      limit: 3
    });
    
    res.status(200).json({
      success: true,
      count: artisans.length,
      data: artisans
    });
  } catch (error) {
    console.error('Erreur getArtisansVedette:', error);
    res.status(500).json({ 
      error: 'Erreur serveur',
      message: error.message 
    });
  }
};

// =============================================
// RÉCUPÉRER LES CATÉGORIES POUR LE MENU
// =============================================
exports.getCategoriesMenu = async (req, res) => {
  try {
    const categories = await Categorie.findAll({
      include: [{
        model: Specialite,
        as: 'specialites',
        attributes: ['id', 'nom']
      }],
      attributes: ['id', 'nom']
    });
    
    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Erreur getCategoriesMenu:', error);
    res.status(500).json({ 
      error: 'Erreur serveur',
      message: error.message 
    });
  }
};

// =============================================
// RÉCUPÉRER LES SPÉCIALITÉS PAR CATÉGORIE
// =============================================
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
        attributes: ['nom']
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

// =============================================
// RÉCUPÉRER TOUTES LES VILLES
// =============================================
exports.getVilles = async (req, res) => {
  try {
    const villes = await Artisan.findAll({
      attributes: [[Artisan.sequelize.fn('DISTINCT', Artisan.sequelize.col('ville')), 'ville']],
      where: {
        ville: {
          [Op.ne]: null
        }
      },
      order: [['ville', 'ASC']]
    });
    
    res.status(200).json({
      success: true,
      data: villes.map(v => v.ville).filter(v => v)
    });
  } catch (error) {
    console.error('Erreur getVilles:', error);
    res.status(500).json({ 
      error: 'Erreur serveur',
      message: error.message 
    });
  }
};
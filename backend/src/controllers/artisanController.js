const { models } = require('../models');
const { Op } = require('sequelize');

const { Artisan, Specialite, Categorie } = models;

// =============================================
// RÉCUPÉRER TOUS LES ARTISANS AVEC FILTRES
// =============================================
exports.getAllArtisans = async (req, res) => {
  try {
    const { categorie, specialite, recherche, vedette, ville, tri } = req.query;
    
    console.log('📡 Filtres reçus:', req.query);
    
    // Construction de la requête avec des sous-requêtes
    let whereConditions = {};
    let includeConditions = [];
    
    // Filtre par recherche (nom de l'artisan)
    if (recherche) {
      whereConditions.nom = {
        [Op.like]: `%${recherche}%`
      };
      console.log(`🔍 Recherche: "${recherche}"`);
    }
    
    // Filtre par ville
    if (ville) {
      whereConditions.ville = {
        [Op.like]: `%${ville}%`
      };
      console.log(`🏙️ Ville: "${ville}"`);
    }
    
    // Filtre artisans en vedette
    if (vedette === 'true') {
      whereConditions.est_vedette = true;
      console.log('⭐ Filtré par vedette');
    }
    
    // Construction de l'include avec conditions
    const include = [
      {
        model: Specialite,
        as: 'specialite',
        include: [
          {
            model: Categorie,
            as: 'categorie'
          }
        ]
      }
    ];
    
    // Ajouter les conditions sur la spécialité
    if (specialite) {
      include[0].where = {
        nom: {
          [Op.like]: `%${specialite}%`
        }
      };
      console.log(`🔧 Spécialité: "${specialite}"`);
    }
    
    // Ajouter les conditions sur la catégorie (solution avec sous-requête)
    if (categorie) {
      // Utiliser une sous-requête pour filtrer par catégorie
      const categoryIds = await Categorie.findAll({
        where: {
          nom: {
            [Op.like]: `%${categorie}%`
          }
        },
        attributes: ['id']
      });
      
      const categoryIdList = categoryIds.map(c => c.id);
      console.log(`📂 Catégorie "${categorie}" => IDs:`, categoryIdList);
      
      if (categoryIdList.length > 0) {
        // Récupérer les spécialités de ces catégories
        const specialtyIds = await Specialite.findAll({
          where: {
            categorie_id: {
              [Op.in]: categoryIdList
            }
          },
          attributes: ['id']
        });
        
        const specialtyIdList = specialtyIds.map(s => s.id);
        console.log(`🔧 Spécialités associées:`, specialtyIdList);
        
        if (specialtyIdList.length > 0) {
          whereConditions.specialite_id = {
            [Op.in]: specialtyIdList
          };
        } else {
          // Aucune spécialité trouvée, on retourne un tableau vide
          return res.status(200).json({
            success: true,
            count: 0,
            data: []
          });
        }
      } else {
        // Aucune catégorie trouvée, on retourne un tableau vide
        return res.status(200).json({
          success: true,
          count: 0,
          data: []
        });
      }
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
    
    console.log('📋 Conditions WHERE finales:', JSON.stringify(whereConditions, null, 2));
    
    const artisans = await Artisan.findAll({
      where: whereConditions,
      include: include,
      order: order
    });
    
    console.log(`✅ ${artisans.length} artisans trouvés`);
    console.log(`📋 Noms des artisans:`, artisans.map(a => a.nom));
    
    res.status(200).json({
      success: true,
      count: artisans.length,
      data: artisans
    });
  } catch (error) {
    console.error('❌ Erreur getAllArtisans:', error);
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
    
    console.log(`📡 Récupération artisan ID: ${id}`);
    
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
    
    console.log(`✅ Artisan trouvé: ${artisan.nom}`);
    
    res.status(200).json({
      success: true,
      data: artisan
    });
  } catch (error) {
    console.error('❌ Erreur getArtisanById:', error);
    res.status(500).json({ 
      error: 'Erreur serveur',
      message: error.message 
    });
  }
};

// =============================================
// RÉCUPÉRER LES ARTISANS EN VEDETTE
// =============================================
exports.getArtisansVedette = async (req, res) => {
  try {
    console.log('📡 Récupération des artisans vedette...');
    
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
    
    console.log(`✅ ${artisans.length} artisans vedette trouvés`);
    console.log(`📋 Noms:`, artisans.map(a => a.nom));
    
    res.status(200).json({
      success: true,
      count: artisans.length,
      data: artisans
    });
  } catch (error) {
    console.error('❌ Erreur getArtisansVedette:', error);
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
    console.log('📡 Récupération des catégories...');
    
    const categories = await Categorie.findAll({
      include: [{
        model: Specialite,
        as: 'specialites',
        attributes: ['id', 'nom']
      }],
      attributes: ['id', 'nom']
    });
    
    console.log(`✅ ${categories.length} catégories récupérées`);
    
    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('❌ Erreur getCategoriesMenu:', error);
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
    
    console.log(`📡 Récupération des spécialités pour catégorie ${categorieId}`);
    
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
    
    console.log(`✅ ${specialites.length} spécialités récupérées`);
    
    res.status(200).json({
      success: true,
      data: specialites
    });
  } catch (error) {
    console.error('❌ Erreur getSpecialitesByCategorie:', error);
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
    console.log('📡 Récupération des villes...');
    
    const villes = await Artisan.findAll({
      attributes: [
        [Artisan.sequelize.fn('DISTINCT', Artisan.sequelize.col('ville')), 'ville']
      ],
      where: {
        ville: {
          [Op.ne]: null
        }
      },
      order: [['ville', 'ASC']]
    });
    
    const villesList = villes.map(v => v.ville).filter(v => v);
    console.log(`✅ ${villesList.length} villes récupérées`);
    
    res.status(200).json({
      success: true,
      data: villesList
    });
  } catch (error) {
    console.error('❌ Erreur getVilles:', error);
    res.status(500).json({ 
      error: 'Erreur serveur',
      message: error.message 
    });
  }
};
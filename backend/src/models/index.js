const sequelize = require('../config/database');
const Categorie = require('./Categorie');
const Specialite = require('./Specialite');
const Artisan = require('./Artisan');

// =============================================
// DÉFINITION DES ASSOCIATIONS
// =============================================

// Une catégorie a plusieurs spécialités
Categorie.hasMany(Specialite, { 
  foreignKey: 'categorie_id', 
  as: 'specialites' 
});
Specialite.belongsTo(Categorie, { 
  foreignKey: 'categorie_id', 
  as: 'categorie' 
});

// Une spécialité a plusieurs artisans
Specialite.hasMany(Artisan, { 
  foreignKey: 'specialite_id', 
  as: 'artisans' 
});
Artisan.belongsTo(Specialite, { 
  foreignKey: 'specialite_id', 
  as: 'specialite' 
});

// =============================================
// EXPORT DES MODÈLES
// =============================================

const models = {
  Categorie,
  Specialite,
  Artisan,
  sequelize
};

// =============================================
// FONCTION D'INITIALISATION
// =============================================

const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion à la base de données établie.');
    
    // Synchroniser les modèles
    await sequelize.sync({ alter: true });
    console.log('✅ Modèles synchronisés.');
  } catch (error) {
    console.error('❌ Erreur de connexion à la base de données:', error);
    throw error;
  }
};

module.exports = { models, initDatabase };
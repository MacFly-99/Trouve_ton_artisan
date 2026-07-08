const sequelize = require('../config/database');
const Categorie = require('./Categorie');
const Specialite = require('./Specialite');
const Artisan = require('./Artisan');

// Initialiser les associations
const models = {
  Categorie,
  Specialite,
  Artisan,
  sequelize
};

// Synchroniser les modèles avec la base de données
const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion à la base de données établie.');
    
    // Synchroniser les modèles (sans forcer pour ne pas perdre les données)
    await sequelize.sync({ alter: true });
    console.log('✅ Modèles synchronisés.');
  } catch (error) {
    console.error('❌ Erreur de connexion à la base de données:', error);
    throw error;
  }
};

module.exports = { models, initDatabase };
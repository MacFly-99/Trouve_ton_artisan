const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Specialite = sequelize.define('Specialite', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      len: [1, 100]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  categorie_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'specialties',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = Specialite;
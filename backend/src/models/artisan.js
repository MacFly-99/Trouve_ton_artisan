const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Artisan = sequelize.define('Artisan', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 200]
    }
  },
  nom_entreprise: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  telephone: {
    type: DataTypes.STRING(20),
    allowNull: true,
    validate: {
      is: /^[0-9+\s\-()]{10,20}$/
    }
  },
  site_web: {
    type: DataTypes.STRING(255),
    allowNull: true,
    validate: {
      isUrl: true
    }
  },
  adresse: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  ville: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  code_postal: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  note: {
    type: DataTypes.DECIMAL(2, 1),
    defaultValue: 0,
    validate: {
      min: 0,
      max: 5
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  url_image: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  specialite_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  est_vedette: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'artisans',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Artisan;
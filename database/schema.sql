-- =============================================
-- BASE DE DONNÉES - PLATEFORME ARTISANS
-- RÉGION AUVERGNE RHÔNE-ALPES
-- =============================================

-- Supprimer la base si elle existe déjà
DROP DATABASE IF EXISTS trouve_ton_artisan;

-- Créer la base de données
CREATE DATABASE trouve_ton_artisan 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Sélectionner la base
USE trouve_ton_artisan;

-- =============================================
-- TABLE : CATEGORIES
-- =============================================
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- TABLE : SPECIALTIES (spécialités)
-- =============================================
CREATE TABLE specialties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    categorie_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categorie_id) REFERENCES categories(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- TABLE : ARTISANS
-- =============================================
CREATE TABLE artisans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(200) NOT NULL,
    nom_entreprise VARCHAR(200),
    email VARCHAR(255) NOT NULL UNIQUE,
    telephone VARCHAR(20),
    site_web VARCHAR(255),
    adresse VARCHAR(255),
    ville VARCHAR(100),
    code_postal VARCHAR(10),
    note DECIMAL(2,1) DEFAULT 0 CHECK (note >= 0 AND note <= 5),
    description TEXT,
    url_image VARCHAR(255),
    specialite_id INT NOT NULL,
    est_vedette BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (specialite_id) REFERENCES specialties(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- INDEX pour optimiser les performances
-- =============================================
CREATE INDEX idx_artisan_nom ON artisans(nom);
CREATE INDEX idx_artisan_ville ON artisans(ville);
CREATE INDEX idx_artisan_specialite ON artisans(specialite_id);
CREATE INDEX idx_artisan_vedette ON artisans(est_vedette);
CREATE INDEX idx_specialite_categorie ON specialties(categorie_id);

-- =============================================
-- TABLE : API_USERS (pour sécuriser l'API)
-- =============================================
CREATE TABLE api_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    api_key VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- VÉRIFICATION : Afficher les tables créées
-- =============================================
SHOW TABLES;
-- =============================================
-- BASE DE DONNÉES - TROUVE_TON_ARTISAN
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
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- TABLE : SPECIALTIES (spécialités)
-- =============================================
CREATE TABLE specialties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    category_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- TABLE : ARTISANS
-- =============================================
CREATE TABLE artisans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    company_name VARCHAR(200),
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    website VARCHAR(255),
    address VARCHAR(255),
    city VARCHAR(100),
    postal_code VARCHAR(10),
    rating DECIMAL(2,1) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
    description TEXT,
    image_url VARCHAR(255),
    specialty_id INT NOT NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (specialty_id) REFERENCES specialties(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- INDEX pour optimiser les performances
-- =============================================
CREATE INDEX idx_artisan_name ON artisans(name);
CREATE INDEX idx_artisan_city ON artisans(city);
CREATE INDEX idx_artisan_specialty ON artisans(specialty_id);
CREATE INDEX idx_artisan_featured ON artisans(is_featured);
CREATE INDEX idx_specialty_category ON specialties(category_id);

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
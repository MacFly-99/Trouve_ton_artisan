-- =============================================
-- ALIMENTATION DE LA BASE DE DONNÉES
-- =============================================
USE trouve_ton_artisan;

-- =============================================
-- 1. Insertion des CATÉGORIES (4 catégories)
-- =============================================
INSERT INTO categories (name, description) VALUES
('Alimentation', 'Artisans de l''alimentation, gastronomie et bouche'),
('Bâtiment', 'Artisans du bâtiment, construction et rénovation'),
('Fabrication', 'Artisans fabricants, créateurs et artisans d''art'),
('Services', 'Services divers aux particuliers');

-- =============================================
-- 2. Insertion des SPÉCIALITÉS
-- =============================================
INSERT INTO specialites (name, description, categorie_id) VALUES
-- Alimentation (catégorie 1)
('Boucher', 'Boucherie artisanale, viandes et charcuterie', 1),
('Boulanger', 'Boulangerie, pâtisserie artisanale', 1),
('Chocolatier', 'Chocolaterie, confiserie artisanale', 1),
('Traiteur', 'Traiteur, restauration, plats préparés', 1),

-- Bâtiment (catégorie 2)
('Chauffagiste', 'Chauffage, climatisation, plomberie', 2),
('Electricien', 'Installations électriques, domotique', 2),
('Menuisier', 'Menuiserie, agencement, ébénisterie', 2),
('Plombier', 'Plomberie, sanitaire, chauffage', 2),

-- Fabrication (catégorie 3)
('Bijoutier', 'Bijouterie, joaillerie, création', 3),
('Couturier', 'Couture, création textile, sur mesure', 3),
('Ferronnier', 'Ferronnerie, métallerie, forge', 3),

-- Services (catégorie 4)
('Coiffeur', 'Coiffure homme, femme, enfant', 4),
('Fleuriste', 'Floristerie, composition florale', 4),
('Toiletteur', 'Toilettage animalier, soins', 4),
('Webdesigner', 'Webdesign, création graphique', 4);

-- =============================================
-- 3. Insertion des ARTISANS (avec les données fournies)
-- =============================================

-- ALIMENTATION (catégorie 1)
INSERT INTO artisans (name, company_name, email, phone, website, address, city, postal_code, rating, description, image_url, specialite_id, is_featured) VALUES
('Boucherie Dumont', 'Boucherie Dumont', 'boucherie.dumond@gmail.com', '04 75 00 00 01', NULL, '1 Rue de la Boucherie', 'Lyon', '69001', 4.5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifec', '/images/artisans/boucherie-dumont.jpg', 1, FALSE),

('Au pain chaud', 'Boulangerie Au Pain Chaud', 'aupainchaud@hotmail.com', '04 75 00 00 02', NULL, '2 Rue des Bakers', 'Montélimar', '26200', 4.8, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifec', '/images/artisans/au-pain-chaud.jpg', 2, TRUE),

('Chocolaterie Labbé', 'Chocolaterie Labbé', 'chocolaterie-labbe@gmail.com', '04 75 00 00 03', 'https://chocolaterie-labbe.fr', '3 Rue du Chocolat', 'Lyon', '69002', 4.9, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifec', '/images/artisans/chocolaterie-labbe.jpg', 3, TRUE),

('Traiteur Truchon', 'Traiteur Truchon', 'contact@truchon-traiteur.fr', '04 75 00 00 04', 'https://truchon-traiteur.fr', '4 Rue de la Gastronomie', 'Lyon', '69003', 4.1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifec', '/images/artisans/traiteur-truchon.jpg', 4, FALSE),

-- BÂTIMENT (catégorie 2)
('Orville Salmons', 'Salmons Chauffage', 'o-salmons@live.com', '04 75 00 00 05', NULL, '5 Rue de la Chaleur', 'Evian', '74500', 5.0, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifec', '/images/artisans/orville-salmons.jpg', 5, TRUE),

('Mont Blanc Électricité', 'Mont Blanc Électricité', 'contact@mont-blanc-electricite.com', '04 75 00 00 06', 'https://mont-blanc-electricite.com', '6 Rue des Alpes', 'Chamonix', '74400', 4.5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifec', '/images/artisans/mont-blanc-electricite.jpg', 6, FALSE),

('Boutot & fils', 'Menuiserie Boutot', 'boutot-menuiserie@gmail.com', '04 75 00 00 07', 'https://boutot-menuiserie.com', '7 Rue du Bois', 'Bourg-en-bresse', '01000', 4.7, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifec', '/images/artisans/boutot-fils.jpg', 7, FALSE),

('Vallis Bellemare', 'Plomberie Bellemare', 'v.bellemare@gmail.com', '04 75 00 00 08', 'https://plomberie-bellemare.com', '8 Rue de l''Eau', 'Vienne', '38200', 4.0, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifec', '/images/artisans/vallis-bellemare.jpg', 8, FALSE),

-- FABRICATION (catégorie 3)
('Claude Quinn', 'Bijouterie Quinn', 'claude.quinn@gmail.com', '04 75 00 00 09', NULL, '9 Rue des Bijoux', 'Aix-les-bains', '73100', 4.2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifec', '/images/artisans/claude-quinn.jpg', 9, FALSE),

('Amitee Lécuyer', 'Couture Lécuyer', 'a.amitee@hotmail.com', '04 75 00 00 10', 'https://lecuyer-couture.com', '10 Rue de la Mode', 'Annecy', '74000', 4.5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifec', '/images/artisans/amitee-lecuyer.jpg', 10, FALSE),

('Ernest Carignan', 'Ferronnerie Carignan', 'e-carigan@hotmail.com', '04 75 00 00 11', NULL, '11 Rue du Fer', 'Le Puy-en-Velay', '43000', 5.0, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifec', '/images/artisans/ernest-carignan.jpg', 11, FALSE),

-- SERVICES (catégorie 4)
('Royden Charbonneau', 'Coiffure Charbonneau', 'r.charbonneau@gmail.com', '04 75 00 00 12', NULL, '12 Rue de la Coiffure', 'Saint-Priest', '69800', 3.8, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifec', '/images/artisans/royden-charbonneau.jpg', 12, FALSE),

('Leala Dennis', 'Coiffure Leala', 'l.dennos@hotmail.fr', '04 75 00 00 13', 'https://coiffure-leala-chambery.fr', '13 Rue des Coiffeurs', 'Chambéry', '73000', 3.8, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifec', '/images/artisans/leala-dennis.jpg', 12, FALSE),

('C''est sup''hair', 'Coiffure Sup''Hair', 'sup-hair@gmail.com', '04 75 00 00 14', 'https://sup-hair.fr', '14 Rue de la Tête', 'Romans-sur-Isère', '26100', 4.1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifec', '/images/artisans/sup-hair.jpg', 12, FALSE),

('Le monde des fleurs', 'Le Monde des Fleurs', 'contact@le-monde-des-fleurs-annonay.fr', '04 75 00 00 15', 'https://le-monde-des-fleurs-annonay.fr', '15 Rue des Fleurs', 'Annonay', '07100', 4.6, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifec', '/images/artisans/le-monde-des-fleurs.jpg', 13, FALSE),

('Valérie Laderoute', 'Toilettage Laderoute', 'v-laredoute@gmail.com', '04 75 00 00 16', NULL, '16 Rue des Animaux', 'Valence', '26000', 4.5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifec', '/images/artisans/valerie-laderoute.jpg', 14, FALSE),

('CM Graphisme', 'CM Graphisme', 'contact@cm-graphisme.com', '04 75 00 00 17', 'https://cm-graphisme.com', '17 Rue du Design', 'Valence', '26000', 4.4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifec', '/images/artisans/cm-graphisme.jpg', 15, FALSE);

-- =============================================
-- 4. Insertion d'un utilisateur API
-- =============================================
INSERT INTO api_users (username, api_key) VALUES 
('admin', 'artisan_api_key_2026_secure_token_123456');

-- =============================================
-- VÉRIFICATION DES DONNÉES
-- =============================================
SELECT 
    'Vérification des données' as 'Statut',
    (SELECT COUNT(*) FROM categories) as 'Catégories',
    (SELECT COUNT(*) FROM specialites) as 'Spécialités',
    (SELECT COUNT(*) FROM artisans) as 'Artisans';

-- Afficher les artisans en vedette
SELECT name, company_name, rating, city, is_featured 
FROM artisans 
WHERE is_featured = TRUE;

-- Afficher les artisans par catégorie
SELECT 
    c.name as 'Catégorie',
    s.name as 'Spécialité',
    a.name as 'Artisan',
    a.city as 'Ville',
    a.rating as 'Note',
    CASE WHEN a.is_featured = 1 THEN '⭐ En vedette' ELSE '' END as 'Statut'
FROM artisans a
JOIN specialites s ON a.specialite_id = s.id
JOIN categories c ON s.categorie_id = c.id
ORDER BY c.name, s.name, a.name;

-- Vérification des emails uniques
SELECT email, COUNT(*) as count 
FROM artisans 
GROUP BY email 
HAVING count > 1;
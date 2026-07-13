# 🛠️ Trouve ton artisan - Région Auvergne-Rhône-Alpes

[![Status](https://img.shields.io/badge/status-completed-success)](https://github.com/)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.16.0-green)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)](https://mysql.com/)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

---

## 📖 Présentation

**Trouve ton artisan** est une plateforme web développée pour la **Région Auvergne-Rhône-Alpes**.  
Elle permet aux particuliers de :

- 🔍 **Rechercher** des artisans qualifiés par catégorie, spécialité ou localisation
- ⭐ **Consulter** les notes et avis des artisans
- 📧 **Contacter** facilement un artisan via un formulaire de contact
- 📱 **Accéder** au site sur tous les supports (mobile, tablette, desktop)

---

## 🎯 Contexte

La région **Auvergne-Rhône-Alpes** compte plus de **221 000 entreprises artisanales** (2021).  
Cette plateforme a pour objectif de **mettre en relation** les particuliers avec les artisans de la région, en simplifiant la recherche et le contact.

---

## ✨ Fonctionnalités

| Fonctionnalité | Description |
|----------------|-------------|
| 🔍 **Recherche** | Barre de recherche par nom d'artisan |
| 📂 **Catégories** | Navigation par catégories (Alimentation, Bâtiment, Fabrication, Services) |
| 🏙️ **Filtres** | Filtrage par ville et tri par note |
| ⭐ **Artisans vedette** | Mise en avant des 3 meilleurs artisans |
| 📄 **Fiche artisan** | Détail complet : note, spécialité, localisation, description |
| ✉️ **Contact** | Formulaire de contact avec envoi d'email via Mailtrap |
| ♿ **Accessibilité** | Conforme aux normes WCAG 2.1 (focus visible, contrastes, skip link) |
| 📱 **Responsive** | Mobile-first, adapté à tous les écrans |

---

## 🛠️ Stack technique

### Frontend
| Technologie | Version | Utilisation |
|-------------|---------|-------------|
| React | 18.2.0 | Framework principal |
| React Router | 6.15.0 | Gestion des routes |
| Bootstrap | 5.3.1 | Composants UI |
| Sass | 1.66.1 | Styles personnalisés |
| Axios | 1.5.0 | Requêtes HTTP |
| React Helmet Async | 1.3.0 | Gestion du SEO |
| React Icons | 4.11.0 | Icônes |

### Backend
| Technologie | Version | Utilisation |
|-------------|---------|-------------|
| Node.js | 18.16.0 | Environnement runtime |
| Express | 4.18.2 | Serveur HTTP |
| Sequelize | 6.33.0 | ORM pour MySQL |
| MySQL2 | 3.6.0 | Driver MySQL |
| Nodemailer | 6.9.0 | Envoi d'emails |
| Helmet | 7.0.0 | Sécurité des headers |
| CORS | 2.8.5 | Gestion des accès cross-origin |

---

## 📊 Modèle de données

### MCD (Modèle Conceptuel de Données)
CATÉGORIE (1) ----< (0,n) SPÉCIALITÉ
|- id
|- nom
|- description

SPÉCIALITÉ (1) ----< (0,n) ARTISAN
|- id
|- nom
|- description
|- categorie_id (FK)

ARTISAN
|- id
|- nom
|- nom_entreprise
|- email (UNIQUE)
|- téléphone
|- site_web
|- adresse
|- ville
|- code_postal
|- note (0-5)
|- description
|- url_image
|- specialite_id (FK)
|- est_vedette (BOOLEAN)


### MLD (Modèle Logique de Données)
CATEGORIES (id, nom, description)
SPECIALITES (id, nom, description, #categorie_id)
ARTISANS (id, nom, nom_entreprise, email, telephone, site_web, adresse, ville, code_postal, note, description, url_image, #specialite_id, est_vedette)


---

## 🚀 Installation

1. Prérequis

- [Node.js](https://nodejs.org/) (v18+)
- [MySQL](https://mysql.com/) (v8+)
- [Compte Mailtrap](https://mailtrap.io/) (pour les emails de test)


2. Cloner le projet

```bash
git clone https://github.com/MacFly-99/Trouve_ton_artisan.git
cd trouve_ton_artisan


3. Base de données

# Se connecter à MySQL
mysql -u root -p

# Créer la base de données
CREATE DATABASE trouve_ton_artisan;
USE trouve_ton_artisan;

# Importer les scripts
source database/schema.sql;
source database/datas.sql;


4. Backend

cd backend

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env

# Configurer le .env
# - DB_PASSWORD : mot de passe MySQL
# - MAILTRAP_USER / MAILTRAP_PASSWORD : identifiants Mailtrap

# Démarrer le serveur
npm run dev


5. Frontend

cd frontend

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env

# Configurer le .env
# - REACT_APP_API_URL : URL du backend (http://localhost:5002/api)
# - REACT_APP_API_KEY : Clé API

# Démarrer l'application
npm start


🌐 Accès
Service	        URL
Frontend	    http://localhost:3002
API Backend	    http://localhost:5002
Health Check	http://localhost:5002/health


📁 Structure du projet
trouve_ton_artisan/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   └── artisanController.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── models/
│   │   │   ├── index.js
│   │   │   ├── categorie.js
│   │   │   ├── specialite.js
│   │   │   └── artisan.js
│   │   └── routes/
│   │       ├── artisanRoutes.js
│   │       └── contactRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   ├── favicon.png
│   │   ├── Logo.png
│   │   └── index.html
│   ├── src/
│   │   ├── api/
│   │   │   └── artisanApi.js
│   │   ├── components/
│   │   │   ├── artisan/
│   │   │   │   ├── ArtisanCard.jsx
│   │   │   │   ├── ArtisanDetail.jsx
│   │   │   │   ├── ArtisanList.jsx
│   │   │   │   └── FeaturedArtisans.jsx
│   │   │   │   └── StepsSections.jsx
│   │   │   ├── common/
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── SearchBar.jsx  
│   │   │   ├── contact/
│   │   │   │   └── ContactForm.jsx
│   │   │   └── pages/
│   │   │       ├── HomePage.jsx
│   │   │       └── NotFound.jsx
│   │   ├── hooks/
│   │   │   └── useScroll.js
│   │   ├── styles/
│   │   │   ├── main.scss
│   │   │   └── variables.scss
│   │   ├── App.js
│   │   └── index.js
│   ├── .env.example
│   └── package.json
├── database/
│   ├── schema.sql
│   └── datas.sql
├── docs/
│   ├── MCD_MLD.png
│   └── maquettes_figma/
├── .gitignore
└── README.md


🔒 Sécurité
Mesure	                    Implémentation	             Description

Clé API	                    Middleware authenticateAPI	 Protection des routes backend
Helmet	                    app.use(helmet())	         Sécurisation des headers HTTP
Rate Limiting	            express-rate-limit	         Limitation des requêtes (100/15min)
CORS	                    Configuration cors()	     Autorisation des domaines autorisés
Validation	                express-validator	         Validation des données entrantes
Variables d'environnement	.env	                     Séparation des secrets du code
Accessibilité	            WCAG 2.1	                 Focus visible, skip link, contrastes


📧 Mailtrap (Emails de test)
Le projet utilise Mailtrap en environnement de développement pour tester l'envoi d'emails.

Configuration :
MAILTRAP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USER=votre_username
MAILTRAP_PASSWORD=votre_password
MAIL_FROM=contact@trouve-ton-artisan.fr


👤 Auteur

Matteo Ventura
GitHub : @MacFly-99


📅 Année
2026 - Projet réalisé dans le cadre de ma formation avec le Centre Européen de Formation


📄 Licence
Ce projet est sous licence MIT.
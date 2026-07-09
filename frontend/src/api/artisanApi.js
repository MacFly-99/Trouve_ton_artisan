import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002/api';
const API_KEY = process.env.REACT_APP_API_KEY || 'artisan_api_key_2026_secure_token_123456';

console.log('🔑 API URL:', API_URL);
console.log('🔑 API Key:', API_KEY ? 'Présente' : 'Manquante');

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'x-api-key': API_KEY,
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

// Intercepteur pour logger les requêtes
api.interceptors.request.use(
  config => {
    console.log(`📤 Requête ${config.method.toUpperCase()} ${config.url}`);
    console.log('📤 Headers:', config.headers);
    return config;
  },
  error => {
    console.error('❌ Erreur requête:', error);
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  response => {
    console.log(`📥 Réponse ${response.config.url}:`, response.status);
    return response;
  },
  error => {
    console.error('❌ Erreur API:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      console.error('🔑 Erreur 401: Clé API invalide ou manquante');
    }
    return Promise.reject(error);
  }
);

// =============================================
// Récupérer tous les artisans
// =============================================
export const getArtisans = async (params = {}) => {
  try {
    const response = await api.get('/artisans', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// =============================================
// Récupérer un artisan par ID
// =============================================
export const getArtisanById = async (id) => {
  try {
    const response = await api.get(`/artisans/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// =============================================
// Récupérer les artisans en vedette
// =============================================
export const getArtisansVedette = async () => {
  try {
    const response = await api.get('/artisans/vedette');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// =============================================
// Récupérer les catégories pour le menu
// =============================================
export const getCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// =============================================
// Récupérer toutes les villes
// =============================================
export const getVilles = async () => {
  try {
    const response = await api.get('/villes');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'x-api-key': API_KEY,
    'Content-Type': 'application/json'
  }
});

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  response => response,
  error => {
    console.error('Erreur API:', error.response?.data || error.message);
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
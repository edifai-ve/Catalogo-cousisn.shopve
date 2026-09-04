import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getProductos = async (params = {}) => {
  try {
    const response = await api.get('/productos', { params });
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener productos: ' + error.message);
  }
};

export const getProductoById = async (id) => {
  try {
    const response = await api.get(`/productos/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener producto: ' + error.message);
  }
};

export const getCategorias = async () => {
  try {
    const response = await api.get('/productos/categorias');
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener categorías: ' + error.message);
  }
};

export default api;
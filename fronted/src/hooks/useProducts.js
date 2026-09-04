import { useState, useEffect, useCallback } from 'react';
import { getProductos } from '../services/api';

export const useProducts = (initialSearch = '') => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState(initialSearch);

  const fetchProductos = useCallback(async (searchTerm) => {
    try {
      setCargando(true);
      setError(null);
      
      const params = searchTerm ? { busqueda: searchTerm } : {};
      const response = await getProductos(params);
      
      setProductos(response.data || []);
    } catch (err) {
      setError(err.message);
      setProductos([]);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    fetchProductos(busqueda);
  }, [busqueda, fetchProductos]);

  return { 
    productos, 
    cargando, 
    error, 
    setBusqueda, 
    busqueda,
    refetch: fetchProductos
  };
};
const ProductoModel = require('../models/productoModel');

class ProductoService {
  static async obtenerTodos() {
    try {
      return ProductoModel.getAll();
    } catch (error) {
      throw new Error('Error al obtener productos: ' + error.message);
    }
  }

  static async obtenerPorId(id) {
    try {
      const producto = ProductoModel.getById(id);
      if (!producto) {
        throw new Error('Producto no encontrado');
      }
      return producto;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async buscar(termino) {
    try {
      if (!termino || termino.trim() === '') {
        return ProductoModel.getAll();
      }
      return ProductoModel.search(termino);
    } catch (error) {
      throw new Error('Error en la búsqueda: ' + error.message);
    }
  }

  static async obtenerPorCategoria(categoria) {
    try {
      if (!categoria) {
        return ProductoModel.getAll();
      }
      return ProductoModel.getByCategoria(categoria);
    } catch (error) {
      throw new Error('Error al filtrar por categoría: ' + error.message);
    }
  }

  static async obtenerCategorias() {
    try {
      return ProductoModel.getCategorias();
    } catch (error) {
      throw new Error('Error al obtener categorías: ' + error.message);
    }
  }
}

module.exports = ProductoService;
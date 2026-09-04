const ProductoService = require('../services/productoService');

class ProductoController {
  static async getAll(req, res, next) {
    try {
      const { busqueda, categoria } = req.query;
      let productos;

      if (busqueda) {
        productos = await ProductoService.buscar(busqueda);
      } else if (categoria) {
        productos = await ProductoService.obtenerPorCategoria(categoria);
      } else {
        productos = await ProductoService.obtenerTodos();
      }

      res.json({
        success: true,
        count: productos.length,
        data: productos
      });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const producto = await ProductoService.obtenerPorId(id);
      
      res.json({
        success: true,
        data: producto
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCategorias(req, res, next) {
    try {
      const categorias = await ProductoService.obtenerCategorias();
      
      res.json({
        success: true,
        data: categorias
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductoController;
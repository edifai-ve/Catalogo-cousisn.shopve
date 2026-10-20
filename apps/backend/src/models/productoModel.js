const productos = require('../data/productos.json');

class ProductoModel {
  static getAll() {
    return productos;
  }

  static getById(id) {
    return productos.find(p => p.id === parseInt(id));
  }

  static getByCategoria(categoria) {
    return productos.filter(p => 
      p.categoria.toLowerCase() === categoria.toLowerCase()
    );
  }

  static search(termino) {
    const lowerTermino = termino.toLowerCase();
    return productos.filter(p => 
      p.nombre.toLowerCase().includes(lowerTermino) ||
      p.descripcion.toLowerCase().includes(lowerTermino) ||
      p.categoria.toLowerCase().includes(lowerTermino)
    );
  }

  static getCategorias() {
    const categorias = productos.map(p => p.categoria);
    return [...new Set(categorias)];
  }
}

module.exports = ProductoModel;
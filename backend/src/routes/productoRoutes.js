const express = require('express');
const router = express.Router();
const ProductoController = require('../controllers/productoController');

// GET /api/productos - Obtener todos los productos (con filtros)
router.get('/', ProductoController.getAll);

// GET /api/productos/categorias - Obtener todas las categorías
router.get('/categorias', ProductoController.getCategorias);

// GET /api/productos/:id - Obtener producto por ID
router.get('/:id', ProductoController.getById);

module.exports = router;
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const productos = require('./src/data/productos.json');

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors());
app.use(express.json());

// ============================================
// SERVIR IMÁGENES (CRÍTICO PARA QUE APAREZCAN)
// ============================================

// Las imágenes están en backend/public/images
// Cuando Railway construye, las copia a /app/backend/public/images
const imagesPath = path.join(__dirname, 'public/images');

// Esta línea le dice a Express que sirva las imágenes en la URL /images
app.use('/images', express.static(imagesPath));

// ============================================
// RUTAS DE LA API (SIEMPRE PRIMERO)
// ============================================

app.get('/api/productos', (req, res) => {
  const { busqueda, categoria } = req.query;
  let resultado = productos;

  if (busqueda) {
    const termino = busqueda.toLowerCase();
    resultado = resultado.filter(p => 
      p.nombre.toLowerCase().includes(termino) ||
      p.descripcion.toLowerCase().includes(termino)
    );
  }

  if (categoria) {
    resultado = resultado.filter(p => 
      p.categoria.toLowerCase() === categoria.toLowerCase()
    );
  }

  res.json({
    success: true,
    count: resultado.length,
    data: resultado
  });
});

app.get('/api/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const producto = productos.find(p => p.id === id);
  
  if (!producto) {
    return res.status(404).json({
      success: false,
      error: 'Producto no encontrado'
    });
  }
  
  res.json({
    success: true,
    data: producto
  });
});

app.get('/api/categorias', (req, res) => {
  const categorias = [...new Set(productos.map(p => p.categoria))];
  res.json({
    success: true,
    data: categorias
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    productos: productos.length
  });
});

// ============================================
// IMPORTANTE: NO SIRVAS EL FRONTEND AQUÍ
// ============================================
// Caddy ya se encarga de servir el frontend. 
// Si sirves el frontend aquí y también en Caddy, se produce un error 
// de "Conexión cerrada" (ERR_CONNECTION_CLOSED).

// ============================================
// INICIAR SERVIDOR
// ============================================

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📦 API disponible en /api/productos`);
  console.log(`📁 Sirviendo imágenes desde: ${imagesPath}`);
});
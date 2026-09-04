require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const productos = require('./src/data/productos.json');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Servir imágenes
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// ============================================
// RUTAS DE LA API
// ============================================

app.get('/', (req, res) => {
  res.json({
    mensaje: '🛍️ Bienvenido a Cousins Shop API',
    endpoints: {
      productos: '/api/productos',
      productoPorId: '/api/productos/:id',
      categorias: '/api/categorias',
      salud: '/api/health'
    }
  });
});

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
    productos: productos.length,
    version: '1.0.0'
  });
});

// ============================================
// SERVIR FRONTEND (SOLO EN PRODUCCIÓN)
// ============================================

// Servir archivos estáticos del frontend
const frontendPath = path.join(__dirname, '..', 'frontend', 'dist');
console.log('📁 Sirviendo frontend desde:', frontendPath);
app.use(express.static(frontendPath));

// Redirigir todas las rutas no API al index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// ============================================
// INICIAR SERVIDOR
// ============================================

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📦 API disponible en /api/productos`);
  console.log(`📦 Total productos: ${productos.length}`);
  console.log(`✨ Visita http://localhost:${PORT} para ver la tienda`);
});
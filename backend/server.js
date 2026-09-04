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
// SERVIR FRONTEND (VERSIÓN RAILWAY)
// ============================================

// Opción 1: Buscar en diferentes lugares
const possiblePaths = [
  path.join(__dirname, '../frontend/dist'),
  path.join(__dirname, '../../frontend/dist'),
  path.join(process.cwd(), 'frontend/dist')
];

let frontendPath = null;
for (const p of possiblePaths) {
  const fs = require('fs');
  if (fs.existsSync(p)) {
    frontendPath = p;
    break;
  }
}

if (!frontendPath) {
  console.log('⚠️ No se encontró el frontend en las rutas esperadas');
  frontendPath = path.join(__dirname, '../frontend/dist');
}

console.log('📁 Sirviendo frontend desde:', frontendPath);

// Servir archivos estáticos
app.use(express.static(frontendPath));

// Redirigir TODAS las rutas que no sean API al index.html
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
  console.log(`📁 Sirviendo frontend desde: ${frontendPath}`);
});
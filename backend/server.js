require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const productos = require('./src/data/productos.json');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ===== RUTAS DE LA API =====
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
  res.json({ success: true, count: resultado.length, data: resultado });
});

app.get('/api/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const producto = productos.find(p => p.id === id);
  if (!producto) {
    return res.status(404).json({ success: false, error: 'Producto no encontrado' });
  }
  res.json({ success: true, data: producto });
});

app.get('/api/categorias', (req, res) => {
  const categorias = [...new Set(productos.map(p => p.categoria))];
  res.json({ success: true, data: categorias });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString(), productos: productos.length });
});

// ============================================
// SERVIR FRONTEND (Solución Nativa)
// ============================================

// El frontend compilado (dist) ya incluye las imágenes dentro de /dist/images
const frontendPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendPath));

// Cualquier ruta que no sea API, redirigir al index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// ============================================
// INICIAR SERVIDOR
// ============================================
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
  console.log(`📁 Frontend servido desde: ${frontendPath}`);
});
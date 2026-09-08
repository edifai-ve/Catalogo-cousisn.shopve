import React from 'react';
import './ProductCard.css';

const ProductCard = ({ producto }) => {
  const { nombre, precio, imagen, descripcion, categoria } = producto;

  // 🔥 URL FIJA PARA RAILWAY
  const API_URL = 'https://catalogo-cousinshopve-production.up.railway.app';

  // Construir la URL de la imagen
  const imagenUrl = imagen && imagen.startsWith('/') 
    ? `${API_URL}${imagen}`
    : imagen || 'https://via.placeholder.com/300x200?text=Sin+Imagen';

  console.log('🖼️ Cargando imagen:', imagenUrl); // Para depuración

  return (
    <div className="product-card">
      <div className="product-card-image">
        <img 
          src={imagenUrl} 
          alt={nombre} 
          loading="lazy"
          onError={(e) => {
            console.error('❌ Error cargando imagen:', imagenUrl);
            e.target.src = 'https://via.placeholder.com/300x200?text=Sin+Imagen';
          }}
        />
        <span className="product-category">✦ {categoria}</span>
      </div>
      <div className="product-card-body">
        <h3 className="product-card-title">{nombre}</h3>
        <p className="product-card-description">{descripcion}</p>
        <div className="product-card-footer">
          <span className="product-card-price">✦ €{precio.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
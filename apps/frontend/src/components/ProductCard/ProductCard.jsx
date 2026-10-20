import React from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 IMPORTA ESTO
import './ProductCard.css';

const ProductCard = ({ producto }) => {
  const navigate = useNavigate(); // 👈 Hook

  const { nombre, precio, imagen, descripcion } = producto;

 const imagenUrl = imagen
  ? (imagen.startsWith('/') ? imagen : `/images/${imagen}`)
  : 'https://via.placeholder.com/300x200?text=Sin+Imagen';

  const irAlDetalle = () => {
    navigate(`/producto/${producto.id}`); // 👈 Navega usando el ID
  };

  return (
    <div className="product-card" onClick={irAlDetalle} style={{ cursor: 'pointer' }}>
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

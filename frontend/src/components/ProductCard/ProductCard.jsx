import React from 'react';
import './ProductCard.css';

const ProductCard = ({ producto }) => {
  const { nombre, precio, imagen, descripcion, categoria } = producto;

  return (
    <div className="product-card">
      <div className="product-card-image">
        <img src={imagen} alt={nombre} loading="lazy" />
        <span className="product-category">{categoria}</span>
      </div>
      <div className="product-card-body">
        <h3 className="product-card-title">{nombre}</h3>
        <p className="product-card-description">{descripcion}</p>
       <div className="product-card-footer">
  <span className="product-card-price">€{precio.toFixed(2)}</span>
</div>
      </div>
    </div>
  );
};

export default ProductCard;
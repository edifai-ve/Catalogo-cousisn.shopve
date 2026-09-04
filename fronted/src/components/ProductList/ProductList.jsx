import React from 'react';
import ProductCard from '../ProductCard';
import './ProductList.css';

const ProductList = ({ productos, cargando, error }) => {
  if (cargando) {
    return (
      <div className="product-list-loading">
        <div className="spinner"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-list-error">
        <span className="error-icon">❌</span>
        <p>{error}</p>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>
          Intentar de nuevo
        </button>
      </div>
    );
  }

  if (productos.length === 0) {
    return (
      <div className="product-list-empty">
        <span className="empty-icon">🔍</span>
        <p>No se encontraron productos</p>
        <p className="empty-sub">Intenta con otra búsqueda</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      {productos.map((producto) => (
        <ProductCard key={producto.id} producto={producto} />
      ))}
    </div>
  );
};

export default ProductList;
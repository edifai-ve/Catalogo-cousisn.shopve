import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';
import Header from '../../components/Header/Header';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [recomendados, setRecomendados] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [imagenActiva, setImagenActiva] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await fetch(`/api/productos/${id}`);
        const data = await res.json();
        setProducto(data.data);
        setImagenActiva(data.data.imagen);

        const resRec = await fetch('/api/productos');
        const dataRec = await resRec.json();
        
        const mismos = dataRec.data.filter(p => String(p.categoria) === String(data.data.categoria) && String(p.id) !== String(data.data.id));
        const otros = dataRec.data.filter(p => String(p.categoria) !== String(data.data.categoria) && String(p.id) !== String(data.data.id));
        
        const combinados = [...mismos, ...otros].slice(0, 4);
        setRecomendados(combinados);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  // ============ PANTALLA DE CARGA (CON HEADER) ============
  if (loading) return (
    <div>
      <Header />
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <h2 className="loading-title">Cargando producto...</h2>
        <p className="loading-subtitle">Preparando los detalles para ti ✨</p>
      </div>
    </div>
  );

  // ============ PRODUCTO NO ENCONTRADO (CON HEADER) ============
  if (!producto) return (
    <div>
      <Header />
      <div className="error" style={{ textAlign: 'center', padding: '60px 20px', color: '#666' }}>
        <h2>Producto no encontrado 😔</h2>
        <p>Lo sentimos, este producto ya no está disponible.</p>
      </div>
    </div>
  );

  // Lógica para construir TODAS las URLs de las imágenes
  const todasLasImagenes = [];
  if (producto.imagen) {
    todasLasImagenes.push(producto.imagen.startsWith('/') ? producto.imagen : `/images/${producto.imagen}`);
  }
  if (producto.imagenes && producto.imagenes.length > 0) {
    producto.imagenes.forEach(img => {
      todasLasImagenes.push(img.startsWith('/') ? img : `/images/${img}`);
    });
  }

  const indiceActual = todasLasImagenes.indexOf(imagenActiva);

  const cambiarImagen = (direccion) => {
    if (todasLasImagenes.length <= 1) return;
    const nuevoIndice = (indiceActual + direccion + todasLasImagenes.length) % todasLasImagenes.length;
    setImagenActiva(todasLasImagenes[nuevoIndice]);
  };

  return (
    <div>
      {/* 👈 HEADER FUERA del contenedor principal */}
      <Header />
      
      <div className="product-detail-page">
        <button onClick={() => navigate(-1)} className="back-btn">
          <span className="back-arrow">‹</span> Volver
        </button>
        
        <div className="product-detail-container">
          <div className="product-images">
            <div className="image-slider">
              {todasLasImagenes.length > 1 && (
                <button className="nav-arrow left-arrow" onClick={() => cambiarImagen(-1)}>‹</button>
              )}
              
              <img src={imagenActiva} alt={producto.nombre} className="main-image" />
              
              {todasLasImagenes.length > 1 && (
                <button className="nav-arrow right-arrow" onClick={() => cambiarImagen(1)}>›</button>
              )}
            </div>

            {todasLasImagenes.length > 1 && (
              <div className="thumbnails">
                {todasLasImagenes.map((img, i) => (
                  <img 
                    key={i} 
                    src={img} 
                    alt={`${producto.nombre} ${i+1}`} 
                    className={`thumb-image ${img === imagenActiva ? 'active' : ''}`}
                    onClick={() => setImagenActiva(img)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="product-info">
            <span className="detail-category">{producto.categoria}</span>
            <h1>{producto.nombre}</h1>
            <p className="detail-price">✦ €{producto.precio.toFixed(2)}</p>
            
            <div className="detail-description">
              <h3>Descripción</h3>
              <p>{producto.descripcion}</p>
            </div>
          </div>
        </div>

        <div className="recommended-section">
          <h2>También te puede gustar</h2>
          <div className="recommended-grid">
            {recomendados.length > 0 ? (
              recomendados.map(rec => {
                const recImagenUrl = rec.imagen && rec.imagen.startsWith('/') 
                  ? rec.imagen 
                  : `/images/${rec.imagen}`;
                  
                return (
                  <div 
                    key={rec.id} 
                    className="recommended-item" 
                    onClick={() => navigate(`/producto/${rec.id}`)}
                  >
                    <img src={recImagenUrl} alt={rec.nombre} className="recommended-image" />
                    <h4>{rec.nombre}</h4>
                    <span className="recommended-price">✦ €{rec.precio.toFixed(2)}</span>
                  </div>
                );
              })
            ) : (
              <p>No hay más productos disponibles.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
import React from 'react';
import Header from '../../components/Header';
import ProductList from '../../components/ProductList';
import { useProducts } from '../../hooks/useProducts';
import './Home.css';

const Home = () => {
  const { productos, cargando, error, setBusqueda, busqueda } = useProducts();

  return (
    <div className="home">
      <Header onSearch={setBusqueda} searchValue={busqueda} />
      <main className="home-main">
        <div className="container">
          <ProductList 
            productos={productos} 
            cargando={cargando} 
            error={error}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 👈 Agregué useNavigate
import SearchBar from '../SearchBar';
import './Header.css';

const Header = ({ onSearch, searchValue }) => {
  const navigate = useNavigate();

  // Si no nos pasan una función de búsqueda, redirigimos al inicio al buscar
  const handleSearch = (value) => {
    if (onSearch) {
      onSearch(value);
    } else {
      navigate('/');
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          {/* 👈 Logo clickeable que lleva a la página principal */}
          <Link to="/" className="logo-container" style={{ textDecoration: 'none' }}>
            <svg className="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                fill="#e26899" stroke="#e26899" strokeWidth="1.5"/>
              <path d="M12 6L13.5 9.5L17.5 10.2L14.8 12.9L15.5 16.8L12 15L8.5 16.8L9.2 12.9L6.5 10.2L10.5 9.5L12 6Z" 
                fill="#fffeff" stroke="#e26899" strokeWidth="1"/>
            </svg>
            <h1 className="logo-text">Cousins<span className="logo-highlight">Shop</span></h1>
          </Link>
          <span className="header-badge">✦ Manualidades</span>
        </div>
        <SearchBar 
          value={searchValue}
          onChange={handleSearch}
          placeholder="Buscar entre nuestras creaciones..."
        />
      </div>
    </header>
  );
};

export default Header;
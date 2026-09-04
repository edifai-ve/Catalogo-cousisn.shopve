import React from 'react';
import SearchBar from '../SearchBar';
import './Header.css';

const Header = ({ onSearch, searchValue }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <div className="logo-container">
            <svg className="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                fill="#e26899" stroke="#e26899" strokeWidth="1.5"/>
              <path d="M12 6L13.5 9.5L17.5 10.2L14.8 12.9L15.5 16.8L12 15L8.5 16.8L9.2 12.9L6.5 10.2L10.5 9.5L12 6Z" 
                fill="#fffeff" stroke="#e26899" strokeWidth="1"/>
            </svg>
            <span className="logo-text">Cousins<span className="logo-highlight">Shop</span></span>
          </div>
          <span className="header-badge">✦ Manualidades</span>
        </div>
        <SearchBar 
          value={searchValue}
          onChange={onSearch}
          placeholder="Buscar entre nuestras creaciones..."
        />
      </div>
    </header>
  );
};

export default Header;
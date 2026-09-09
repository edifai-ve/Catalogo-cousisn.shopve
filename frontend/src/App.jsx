import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Home from './pages/Home'; 
import ProductDetail from './pages/ProductDetail/ProductDetail'; // 👈 Apunta a la carpeta y al archivo
import './App.css';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}

export default App;
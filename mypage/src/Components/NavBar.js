// src/NavBar.js
import React from 'react';

const NavBar = () => {
  return (
    <nav style={{ backgroundColor: '#333', color: '#fff', padding: '10px', position: 'sticky', top: '0', zIndex: '1000' }}>
      <a href="#home" style={{ color: '#fff', textDecoration: 'none', margin: '0 15px' }}>Home</a>
      <a href="#about" style={{ color: '#fff', textDecoration: 'none', margin: '0 15px' }}>About</a>
      <a href="#services" style={{ color: '#fff', textDecoration: 'none', margin: '0 15px' }}>Services</a>
      <a href="#contact" style={{ color: '#fff', textDecoration: 'none', margin: '0 15px' }}>Contact</a>
    </nav>
  );
};

export default NavBar;

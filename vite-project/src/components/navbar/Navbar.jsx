import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <div
        className={`menu ${isOpen ? 'open' : ''}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`side-menu ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/login" onClick={toggleMenu}>Entrar</Link></li>
          <li><Link to="/donate" onClick={toggleMenu}>Doações</Link></li>
          <li><Link to="/relatorio" onClick={toggleMenu}>Relatório</Link></li>
          <li><Link to="/" onClick={toggleMenu}>Quem Somos?</Link></li>
          <li><Link to="/voluntario" onClick={toggleMenu}>Como ajudar?</Link></li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;

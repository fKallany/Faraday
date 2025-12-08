import React from 'react';
import { Link } from 'react-router-dom';
import './Voluntario.css';

const Voluntario = () => {
  return (
    <div className="voluntario-container">
      <h1 className="voluntario-title">SEJA VOLUNTÁRIO</h1>

      <div className="form-container">
        <label className="form-label">Nome<span>*</span></label>
        <input type="text" className="form-input" />

        <label className="form-label">E-mail<span>*</span></label>
        <input type="email" className="form-input" />

        <label className="form-label">Telefone<span>*</span></label>
        <input type="text" placeholder="+55 ( ) 9 XXXX-XXXX" className="form-input" />

        <button className="voluntario-btn">Enviar</button>
        <Link to="/login" className="voluntario-btn link-btn">Já tenho cadastro</Link>
      </div>
    </div>
  );
};

export default Voluntario;

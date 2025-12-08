import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <div className="login-container">
      <div style={{ marginTop: '100px', marginBottom: '50px', textAlign: 'center' }}>
        <img src="https://raw.githubusercontent.com/EquipeProjetando/EquipeProjetando/main/logoinstituto%404x.png" alt="Logo Instituto VORP" class="logo" />
      </div>

      <input type="text" placeholder="usuario" className="login-input" />
      <input type="password" placeholder="senha" className="login-input" />

      <button className="login-btn">Entrar</button>
    </div>
  );
};

export default Login;

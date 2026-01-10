import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/'); // Redirect to home or dashboard
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao fazer login');
    }
  };

  return (
    <div className="login-container">
      <div style={{ marginTop: '100px', marginBottom: '50px', textAlign: 'center' }}>
        <img src="https://raw.githubusercontent.com/EquipeProjetando/EquipeProjetando/main/logoinstituto%404x.png" alt="Logo Instituto VORP" className="logo" />
      </div>

      <input
        type="text"
        placeholder="email"
        className="login-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="senha"
        className="login-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="error-message" style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <button className="login-btn" onClick={handleLogin}>Entrar</button>

      <div style={{ marginTop: '20px' }}>
        <button
          className="login-btn"
          style={{ backgroundColor: '#F79C33', fontSize: '16px' }}
          onClick={() => navigate('/voluntario')}
        >
          Quero ser voluntário
        </button>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './Voluntario.css';

const Voluntario = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await api.post('/volunteers', formData);
      setMessage('Inscrição enviada com sucesso!');
      setFormData({ name: '', email: '', phone: '' });
    } catch (error) {
      setMessage('Erro ao enviar inscrição. Tente novamente.');
      console.error(error);
    }
  };

  return (
    <div className="voluntario-container">
      <h1 className="voluntario-title">SEJA VOLUNTÁRIO</h1>

      <div className="form-container">
        {message && <p style={{ color: message.includes('Erro') ? 'red' : 'green', textAlign: 'center' }}>{message}</p>}

        <label className="form-label">Nome<span>*</span></label>
        <input
          type="text"
          name="name"
          className="form-input"
          value={formData.name}
          onChange={handleChange}
        />

        <label className="form-label">E-mail<span>*</span></label>
        <input
          type="email"
          name="email"
          className="form-input"
          value={formData.email}
          onChange={handleChange}
        />

        <label className="form-label">Telefone<span>*</span></label>
        <input
          type="text"
          name="phone"
          placeholder="+55 ( ) 9 XXXX-XXXX"
          className="form-input"
          value={formData.phone}
          onChange={handleChange}
        />

        <button className="voluntario-btn" onClick={handleSubmit}>Enviar</button>
        <Link to="/login" className="voluntario-btn link-btn">Já tenho cadastro</Link>
      </div>
    </div>
  );
};

export default Voluntario;

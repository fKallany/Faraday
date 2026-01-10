import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './Voluntario.css';

const Voluntario = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.com/.test(email);
  };

  const validatePhone = (phone) => {
    // Remove tudo que não é dígito
    const cleanPhone = phone.replace(/\D/g, '');
    // Verifica se tem 10 ou 11 dígitos (DDD + Número)
    return cleanPhone.length >= 10 && cleanPhone.length <= 11;
  };

  const validatePassword = (password) => {
    // Pelo menos 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async () => {
    const { name, email, phone, password, confirmPassword } = formData;

    if (!name || !email || !phone || !password || !confirmPassword) {
      setMessage('Preencha todos os campos obrigatórios.');
      return;
    }

    if (!validateEmail(email)) {
      setMessage('O e-mail deve conter @ e terminar com .com');
      return;
    }

    if (!validatePhone(phone)) {
      setMessage('Telefone inválido. Insira o DDD e o número (ex: 11999999999).');
      return;
    }

    if (!validatePassword(password)) {
      setMessage('A senha deve ter no mínimo 8 caracteres, incluindo maiúscula, minúscula, número e caractere especial (@$!%*?&).');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('As senhas não coincidem.');
      return;
    }

    try {
      await api.post('/volunteers', {
        name,
        email,
        phone,
        password
      });
      setMessage('Cadastro realizado com sucesso! Redirecionando para o login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erro ao enviar inscrição. Tente novamente.');
      console.error(error);
    }
  };

  return (
    <div className="voluntario-container">
      <h1 className="voluntario-title">SEJA VOLUNTÁRIO</h1>

      <div className="form-container">
        {message && <p style={{ color: message.includes('sucesso') ? 'green' : 'red', textAlign: 'center' }}>{message}</p>}

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

        <label className="form-label">Senha<span>*</span></label>
        <input
          type="password"
          name="password"
          className="form-input"
          value={formData.password}
          onChange={handleChange}
        />

        <label className="form-label">Confirmar Senha<span>*</span></label>
        <input
          type="password"
          name="confirmPassword"
          className="form-input"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <button className="voluntario-btn" onClick={handleSubmit}>Enviar</button>
        <Link to="/login" className="voluntario-btn link-btn">Já tenho cadastro</Link>
      </div>
    </div>
  );
};

export default Voluntario;

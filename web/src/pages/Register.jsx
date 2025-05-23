import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const API_URL = 'http://localhost:3000/api/auth/register'; // Troque para o IP local se necessário

function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post(API_URL, { name, username, email, password });
      navigate('/login');
    } catch (err) {
      setError('Erro ao cadastrar. Verifique os dados.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 32 }}>
      <h2>Criar conta</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', marginBottom: 8 }} />
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required style={{ width: '100%', marginBottom: 8 }} />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', marginBottom: 8 }} />
        <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', marginBottom: 8 }} />
        {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
        <button type="submit" style={{ width: '100%' }}>Cadastrar</button>
      </form>
      <div style={{ marginTop: 16 }}>
        <Link to="/login">Já tem conta? Entrar</Link>
      </div>
    </div>
  );
}

export default Register; 
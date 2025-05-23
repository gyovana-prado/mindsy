const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

const AuthController = {
  // Registro de usuário
  async register(req, res) {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: 'Preencha todos os campos.' });
    }
    try {
      const existing = await User.findByEmail(email);
      if (existing) {
        return res.status(409).json({ message: 'Email já cadastrado.' });
      }
      const passwordHash = await bcrypt.hash(password, 10);
      const user = await User.create({ name, username, email, passwordHash });
      return res.status(201).json({ id: user.id, name: user.name, username: user.username, email: user.email });
    } catch (err) {
      return res.status(500).json({ message: 'Erro ao registrar usuário.' });
    }
  },

  // Login de usuário (JWT)
  async login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Preencha todos os campos.' });
    }
    try {
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
      }
      const valid = await bcrypt.compare(password, user.password_hash);
      if (!valid) {
        return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
      }
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erro ao fazer login.' });
    }
  },

  // Login com Google OAuth (estrutura básica)
  async googleLogin(req, res) {
    // Aqui seria feita a validação do token Google e busca/criação do usuário
    // Estrutura pronta para integração futura
    return res.status(501).json({ message: 'Login Google ainda não implementado.' });
  },

  // Consultar XP e nível do usuário autenticado
  async getXpAndLevel(req, res) {
    try {
      const { xp, level } = await User.getXpAndLevel(req.user.id);
      return res.json({ xp, level });
    } catch (err) {
      return res.status(500).json({ message: 'Erro ao buscar XP e nível.' });
    }
  },

  // Atualizar XP e nível do usuário autenticado
  async updateXpAndLevel(req, res) {
    const { xp, level } = req.body;
    if (typeof xp !== 'number' || typeof level !== 'number') {
      return res.status(400).json({ message: 'XP e nível devem ser números.' });
    }
    try {
      const updated = await User.updateXpAndLevel(req.user.id, xp, level);
      return res.json(updated);
    } catch (err) {
      return res.status(500).json({ message: 'Erro ao atualizar XP e nível.' });
    }
  },
};

module.exports = AuthController;

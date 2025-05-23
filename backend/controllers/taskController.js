const Task = require('../models/task');
const User = require('../models/user');
const pool = require('../config/db');

const TaskController = {
  async create(req, res) {
    const { title, description, difficulty, points, dueDate } = req.body;
    const userId = req.user.id;
    if (!title || !difficulty || !points) {
      return res.status(400).json({ message: 'Campos obrigatórios não preenchidos.' });
    }
    try {
      const task = await Task.create({ userId, title, description, difficulty, points, dueDate });
      return res.status(201).json(task);
    } catch (err) {
      return res.status(500).json({ message: 'Erro ao criar tarefa.' });
    }
  },

  async list(req, res) {
    const userId = req.user.id;
    try {
      const tasks = await Task.findByUser(userId);
      return res.json(tasks);
    } catch (err) {
      return res.status(500).json({ message: 'Erro ao buscar tarefas.' });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const fields = req.body;
    try {
      const updated = await Task.update(id, fields);
      return res.json(updated);
    } catch (err) {
      return res.status(500).json({ message: 'Erro ao atualizar tarefa.' });
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    try {
      await Task.delete(id);
      return res.json({ message: 'Tarefa removida.' });
    } catch (err) {
      return res.status(500).json({ message: 'Erro ao remover tarefa.' });
    }
  },

  async concluir(req, res) {
    const { id } = req.params;
    const userId = req.user.id;
    try {
      const task = await Task.findById(id);
      if (!task || task.user_id !== userId) return res.status(404).json({ message: 'Tarefa não encontrada.' });
      if (task.concluida) return res.status(400).json({ message: 'Tarefa já concluída.' });
      // Marcar como concluída
      await Task.update(id, { concluida: true });
      // Atualizar pontos, xp e nível do usuário
      const user = await User.findById(userId);
      let xp = user.xp || 0;
      let pontos = user.pontos || 0;
      let nivel = user.nivel || 1;
      xp += task.points;
      pontos += task.points;
      while (xp >= 100) {
        xp -= 100;
        nivel += 1;
      }
      await pool.query('UPDATE users SET xp = $1, pontos = $2, nivel = $3 WHERE id = $4', [xp, pontos, nivel, userId]);
      return res.json({ success: true, xp, pontos, nivel });
    } catch (err) {
      return res.status(500).json({ message: 'Erro ao concluir tarefa.' });
    }
  }
};

module.exports = TaskController;

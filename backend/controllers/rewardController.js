const Reward = require('../models/reward');

const RewardController = {
  async create(req, res) {
    const { title, description, pointsNeeded } = req.body;
    const userId = req.user.id;
    if (!title || !pointsNeeded) {
      return res.status(400).json({ message: 'Campos obrigatórios não preenchidos.' });
    }
    try {
      const reward = await Reward.create({ userId, title, description, pointsNeeded });
      return res.status(201).json(reward);
    } catch (err) {
      return res.status(500).json({ message: 'Erro ao criar recompensa.' });
    }
  },

  async list(req, res) {
    const userId = req.user.id;
    try {
      const rewards = await Reward.findByUser(userId);
      return res.json(rewards);
    } catch (err) {
      return res.status(500).json({ message: 'Erro ao buscar recompensas.' });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const fields = req.body;
    try {
      const updated = await Reward.update(id, fields);
      return res.json(updated);
    } catch (err) {
      return res.status(500).json({ message: 'Erro ao atualizar recompensa.' });
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    try {
      await Reward.delete(id);
      return res.json({ message: 'Recompensa removida.' });
    } catch (err) {
      return res.status(500).json({ message: 'Erro ao remover recompensa.' });
    }
  }
};

module.exports = RewardController;

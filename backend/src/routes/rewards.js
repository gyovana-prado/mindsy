const express = require('express');
const router = express.Router();
const pool = require('../../config/db');
const auth = require('../../middlewares/authMiddleware');

// Listar recompensas do usuário
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query('SELECT * FROM recompensas WHERE user_id = $1 ORDER BY criada_em DESC', [userId]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar recompensas' });
  }
});

// Criar recompensa
router.post('/', auth, async (req, res) => {
  const { nome, descricao, custo_em_pontos } = req.body;
  const userId = req.user.id;
  try {
    const result = await pool.query(
      'INSERT INTO recompensas (nome, descricao, custo_em_pontos, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [nome, descricao, custo_em_pontos, userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar recompensa' });
  }
});

// Editar recompensa
router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, custo_em_pontos } = req.body;
  const userId = req.user.id;
  try {
    const result = await pool.query(
      'UPDATE recompensas SET nome = $1, descricao = $2, custo_em_pontos = $3 WHERE id = $4 AND user_id = $5 RETURNING *',
      [nome, descricao, custo_em_pontos, id, userId]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Recompensa não encontrada' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao editar recompensa' });
  }
});

// Excluir recompensa
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    await pool.query('DELETE FROM recompensas WHERE id = $1 AND user_id = $2', [id, userId]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao excluir recompensa' });
  }
});

// Resgatar recompensa (descontar pontos do usuário)
router.post('/:id/resgatar', auth, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    // Buscar recompensa
    const recompensa = await pool.query('SELECT * FROM recompensas WHERE id = $1 AND user_id = $2', [id, userId]);
    if (recompensa.rows.length === 0) return res.status(404).json({ error: 'Recompensa não encontrada' });
    const custo = recompensa.rows[0].custo_em_pontos;
    // Buscar pontos do usuário
    const usuario = await pool.query('SELECT pontos FROM users WHERE id = $1', [userId]);
    if (usuario.rows.length === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
    if (usuario.rows[0].pontos < custo) return res.status(400).json({ error: 'Pontos insuficientes' });
    // Descontar pontos
    await pool.query('UPDATE users SET pontos = pontos - $1 WHERE id = $2', [custo, userId]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao resgatar recompensa' });
  }
});

module.exports = router; 
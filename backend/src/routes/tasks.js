const express = require('express');
const router = express.Router();
const pool = require('../../config/db');
const auth = require('../../middlewares/authMiddleware');

router.post('/', auth, async (req, res) => {
  const { title, description, difficulty, category, points, dueDate } = req.body;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      'INSERT INTO tasks (title, description, difficulty, category, points, due_date, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [title, description, difficulty, category, points, dueDate, userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating task' });
  }
});

router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { title, description, difficulty, category, points, dueDate } = req.body;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, difficulty = $3, category = $4, points = $5, due_date = $6 WHERE id = $7 AND user_id = $8 RETURNING *',
      [title, description, difficulty, category, points, dueDate, id, userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating task' });
  }
});

// Mark task as completed
router.post('/:id/complete', auth, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    // Find task
    const taskRes = await pool.query('SELECT * FROM tasks WHERE id = $1 AND user_id = $2', [id, userId]);
    if (taskRes.rows.length === 0) return res.status(404).json({ error: 'Task not found' });
    if (taskRes.rows[0].completed) return res.status(400).json({ error: 'Task already completed' });
    const points = taskRes.rows[0].points;
    // Mark as completed
    await pool.query('UPDATE tasks SET completed = true WHERE id = $1', [id]);
    // Update user points, xp and level
    const userRes = await pool.query('SELECT xp, points as user_points, level FROM users WHERE id = $1', [userId]);
    let { xp, user_points, level } = userRes.rows[0];
    let newXP = xp + points;
    let newLevel = level;
    let newPoints = user_points + points;
    // Level up logic: every 100 XP increases 1 level
    while (newXP >= 100) {
      newXP -= 100;
      newLevel += 1;
    }
    await pool.query('UPDATE users SET xp = $1, points = $2, level = $3 WHERE id = $4', [newXP, newPoints, newLevel, userId]);
    res.json({ success: true, xp: newXP, points: newPoints, level: newLevel });
  } catch (err) {
    res.status(500).json({ error: 'Error completing task' });
  }
});

// Adicionar endpoint GET para listar tarefas do usuário autenticado
router.get('/', auth, async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await pool.query('SELECT * FROM tasks WHERE user_id = $1 ORDER BY id DESC', [userId]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
});

module.exports = router; 
const pool = require('../config/db');

const Reward = {
  async create({ userId, title, description, pointsNeeded }) {
    const result = await pool.query(
      `INSERT INTO rewards (user_id, title, description, points_needed) VALUES ($1, $2, $3, $4) RETURNING *`,
      [userId, title, description, pointsNeeded]
    );
    return result.rows[0];
  },

  async findByUser(userId) {
    const result = await pool.query(
      `SELECT * FROM rewards WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );
    return result.rows;
  },

  async findById(id) {
    const result = await pool.query(
      `SELECT * FROM rewards WHERE id = $1`,
      [id]
    );
    return result.rows[0];
  },

  async update(id, fields) {
    const keys = Object.keys(fields);
    const values = Object.values(fields);
    if (keys.length === 0) return null;
    const setString = keys.map((k, i) => `${k} = $${i + 2}`).join(', ');
    const result = await pool.query(
      `UPDATE rewards SET ${setString} WHERE id = $1 RETURNING *`,
      [id, ...values]
    );
    return result.rows[0];
  },

  async delete(id) {
    await pool.query(`DELETE FROM rewards WHERE id = $1`, [id]);
    return true;
  }
};

module.exports = Reward;

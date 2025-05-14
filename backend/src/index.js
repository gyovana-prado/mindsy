require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('../config/db');

const authRoutes = require('../routes/auth');
const taskRoutes = require('../routes/tasks');
const rewardRoutes = require('../routes/rewards');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tarefas', taskRoutes);
app.use('/api/recompensas', rewardRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

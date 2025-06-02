// backend/index.js
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// GET toutes les tâches
app.get('/tasks', async (req, res) => {
  const result = await pool.query('SELECT * FROM tasks ORDER BY id');
  res.json(result.rows);
});

// POST une nouvelle tâche
app.post('/tasks', async (req, res) => {
  const { title } = req.body;
  const result = await pool.query(
    'INSERT INTO tasks (title) VALUES ($1) RETURNING *',
    [title]
  );
  res.json(result.rows[0]);
});

// PUT pour marquer une tâche comme faite / non faite
app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    'UPDATE tasks SET done = NOT done WHERE id = $1 RETURNING *',
    [id]
  );
  res.json(result.rows[0]);
});

// DELETE une tâche
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
  res.sendStatus(204);
});

app.listen(3000, () => {
  console.log('Serveur backend démarré sur http://localhost:3000');
});

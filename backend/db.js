// backend/db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'thibaultcolin',
  host: 'localhost',
  database: 'todo',
  password: '', // ← Mets le mot de passe si besoin, sinon laisse vide si aucun
  port: 5432,
});

module.exports = pool;

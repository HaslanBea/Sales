const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

// POST /autores - Cadastrar autor
router.post('/', (req, res) => {
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ error: 'O campo nome é obrigatório.' });
  }

  const db = new sqlite3.Database('./database.db');
  const query = `INSERT INTO autores (nome) VALUES (?)`;

  db.run(query, [nome], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao cadastrar autor.' });
    }

    return res.status(201).json({
      id: this.lastID,
      nome
    });
  });

  db.close();
});

module.exports = router;

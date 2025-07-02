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

// GET /autores - Listar autores
router.get('/', (req, res) => {
  const db = new sqlite3.Database('./database.db');
  const query = `SELECT * FROM autores`;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao buscar autores.' });
    }

    return res.status(200).json(rows);
  });

  db.close();
});

// PUT /autores/:id - Atualizar autor
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ error: 'O campo nome é obrigatório.' });
  }

  const db = new sqlite3.Database('./database.db');
  const query = `UPDATE autores SET nome = ? WHERE id = ?`;

  db.run(query, [nome, id], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao atualizar autor.' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Autor não encontrado.' });
    }

    return res.status(200).json({ message: 'Autor atualizado com sucesso.' });
  });

  db.close();
});

module.exports = router;

const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

// POST /livros - Cadastrar livro
router.post('/', (req, res) => {
  const { titulo, descricao, ano_publicacao, preco, autor_id } = req.body;

  if (!titulo || !autor_id) {
    return res.status(400).json({ error: 'Título e autor_id são obrigatórios.' });
  }

  const db = new sqlite3.Database('./database.db');

  // Verificar se o autor existe
  db.get(`SELECT * FROM autores WHERE id = ?`, [autor_id], (err, autor) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao buscar autor.' });
    }

    if (!autor) {
      return res.status(404).json({ error: 'Autor não encontrado.' });
    }

    const query = `
      INSERT INTO livros (titulo, descricao, ano_publicacao, preco, autor_id)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.run(
      query,
      [titulo, descricao, ano_publicacao, preco, autor_id],
      function (err) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Erro ao cadastrar livro.' });
        }

        return res.status(201).json({
          id: this.lastID,
          titulo,
          descricao,
          ano_publicacao,
          preco,
          autor_id
        });
      }
    );

    db.close();
  });
});

module.exports = router;

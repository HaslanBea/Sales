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

// GET /livros - Listar livros
router.get('/', (req, res) => {
  const db = new sqlite3.Database('./database.db');

  const query = `
    SELECT livros.*, autores.nome AS autor_nome
    FROM livros
    JOIN autores ON livros.autor_id = autores.id
  `;
  //A linha acima faz um JOIN entre as tabelas livros e autores para trazer o nome do autor junto com os dados do livro.

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao buscar livros.' });
    }

    return res.status(200).json(rows);
  });

  db.close();
});

// PUT /livros/:id - Atualizar livro
router.put('/:id', (req, res) => {
  const { id } = req.params;
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
      UPDATE livros
      SET titulo = ?, descricao = ?, ano_publicacao = ?, preco = ?, autor_id = ?
      WHERE id = ?
    `;

    db.run(query, [titulo, descricao, ano_publicacao, preco, autor_id, id], function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao atualizar livro.' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Livro não encontrado.' });
      }

      return res.status(200).json({
        id,
        titulo,
        descricao,
        ano_publicacao,
        preco,
        autor_id
      });
    });

    db.close();
  });
});

// DELETE /livros/:id - Excluir livro
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const db = new sqlite3.Database('./database.db');

  const query = `DELETE FROM livros WHERE id = ?`;

  db.run(query, [id], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao excluir livro.' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Livro não encontrado.' });
    }

    return res.status(200).json({ message: 'Livro excluído com sucesso.' });
  });

  db.close();
});

// GET /livros/:id - Obter livro por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  const db = new sqlite3.Database('./database.db');

  const query = `
    SELECT livros.*, autores.nome AS autor_nome
    FROM livros
    JOIN autores ON livros.autor_id = autores.id
    WHERE livros.id = ?
  `;

  db.get(query, [id], (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao buscar livro.' });
    }

    if (!row) {
      return res.status(404).json({ error: 'Livro não encontrado.' });
    }

    return res.status(200).json(row);
  });

  db.close();
});

module.exports = router;

// database/init.js

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

// Criar tabela de autores
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS autores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS livros (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descricao TEXT,
      ano_publicacao INTEGER,
      preco REAL,
      autor_id INTEGER,
      FOREIGN KEY (autor_id) REFERENCES autores(id)
    )
  `);

  console.log('Tabelas criadas com sucesso!');
});

db.close();

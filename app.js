const express = require('express');
const app = express();
const autoresRoutes = require('./routes/autores');
const livrosRoutes = require('./routes/livros');

app.use(express.json());

app.use('/autores', autoresRoutes);
app.use('/livros', livrosRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

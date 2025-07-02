# 📚 API REST de Livraria

## 🎯 Objetivo

Criar uma API RESTful em Node.js e SQLite que permita gerenciar autores e livros, com operações de cadastro, consulta e (futuramente) atualização e remoção.

Este projeto tem como foco:
- Exercitar conceitos de API REST.
- Relacionar tabelas (livros pertencendo a autores).
- Praticar organização de rotas e estrutura de projeto.
- Utilizar SQLite como banco de dados relacional.

---

## 🚀 Tecnologias Utilizadas

- **Node.js** + **Express** – Servidor HTTP e rotas
- **JavaScript**
- **SQLite3** – Banco de dados relacional
- **Postman** – Testes de requisição
- **Nodemon** – Reiniciar servidor automaticamente durante desenvolvimento

---

## 📁 Estrutura de Pastas

```bash
/etl-api  
│
├── /database          
│   └── init.js          # Criação das tabelas do banco
│
├── /routes
│   ├── autores.js       # Rotas para cadastrar autores
│   └── livros.js        # Rotas para cadastrar livros
│
├── app.js               # Configuração e inicialização do Express
│
├── package.json         # Dependências do projeto
│
├── README.md            # Documentação do projeto
│
└── node_modules         # Bibliotecas instaladas
```

---
# 🧠 Por que uma estrutura simplificada?
“Optei por uma estrutura simplificada, pois o projeto é pequeno e não utiliza ORM. Mas se fosse crescer, separaria em controllers e models para manter o código organizado.”

## ✨ Funcionalidades atuais
#### 📌 Cadastro de autores (POST /autores)

#### 📌 Cadastro de livros vinculados a um autor (POST /livros)

#### 📌 Endpoints implementados
➕ Criar Autor
Rota: POST /autores

Body exemplo:

```
json
Copiar
Editar
{
  "nome": "Machado de Assis"
}
Resposta:

json
Copiar
Editar
{
  "id": 1,
  "nome": "Machado de Assis"
}
```

## ➕ Criar Livro
Rota: POST /livros

Body exemplo:

```
json
Copiar
Editar
{
  "titulo": "Dom Casmurro",
  "descricao": "Um clássico da literatura brasileira.",
  "ano_publicacao": 1899,
  "preco": 49.90,
  "autor_id": 1
}
Resposta:

json
Copiar
Editar
{
  "id": 1,
  "titulo": "Dom Casmurro",
  "descricao": "Um clássico da literatura brasileira.",
  "ano_publicacao": 1899,
  "preco": 49.90,
  "autor_id": 1
}
```

## 🛠 Próximos Endpoints a Criar
Para completar o CRUD de Autores e Livros:

✅ GET /autores

Listar todos os autores.

✅ GET /livros

Listar todos os livros.

✅ GET /livros/:id

Buscar um livro pelo ID.

✅ PUT /autores/:id

Atualizar dados de um autor.

✅ PUT /livros/:id

Atualizar dados de um livro.

✅ DELETE /autores/:id

Excluir um autor.

✅ DELETE /livros/:id

Excluir um livro.

# ✨ Como executar
### Instale dependências:

```
npm install
```
### Crie o banco e tabelas:

```
node database/init.js
```

### Inicie o servidor:

```
node app.js
```
ou:

```
npx nodemon app.js
```
### Teste endpoints usando Postman.

#### ✨ Possíveis evoluções futuras
- Endpoint para upload de CSV e importação de dados (ETL).

- Autenticação JWT.

- Documentação Swagger.

- Mudar banco SQLite para PostgreSQL.


## ✨ Quais endpoints ainda faltam?

**Hoje você só tem:**
- POST `/autores`
- POST `/livros`

Para ter **CRUD completo**, você pode criar estes:

| Método | Rota               | Descrição                           |
|--------|--------------------|-------------------------------------|
| GET    | /autores           | Listar todos os autores            |
| GET    | /livros            | Listar todos os livros             |
| GET    | /livros/:id        | Buscar livro por ID                |
| PUT    | /autores/:id       | Atualizar um autor                 |
| PUT    | /livros/:id        | Atualizar um livro                 |
| DELETE | /autores/:id       | Excluir um autor                   |
| DELETE | /livros/:id        | Excluir um livro                   |

---

# 📚 API de Livraria — Testes com Postman

Este documento ensina como testar as rotas **POST** da API para cadastrar autores e livros.

---

## 🚀 Pré-requisitos

Antes de testar, certifique-se que:

✅ O servidor está rodando:

```bash
node app.js 
ou
npx nodemon app.js 
```

✅ Você criou as tabelas rodando:

```
node database/init.js
```



# ✨ 1️⃣ Testar cadastro de Autor

<br>

## 📌 Endpoint
# Método: POST

URL: http://localhost:3000/autores

## 📌 Configuração no Postman
Abra o Postman e clique em New Request.

### scolha o método POST.

01. Cole a URL http://localhost:3000/autores.

02. Vá até a aba Body.

03. Selecione raw.

04. No menu suspenso à direita, selecione JSON.

05. Cole este JSON de exemplo:
<br>
```
{
  "nome": "Machado de Assis"
}
```
<br>
08. Clique send.

# 📌 Resposta esperada
### Status Code: 201 Created
```
{
  "id": 1,
  "nome": "Machado de Assis"
}
```

⚠️ Importante: O campo nome é obrigatório. Se enviar vazio, retorna erro 400.

# ✨ 2️⃣ Testar cadastro de Livro
Antes de criar um livro, certifique-se que existe pelo menos um autor cadastrado. Use o id do autor criado no passo anterior.

## 📌 Endpoint
Método: POST

URL: http://localhost:3000/livros

## 📌 Configuração no Postman
Abra o Postman e crie uma nova requisição POST.

Cole a URL http://localhost:3000/livros.

## Vá até a aba Body.

Selecione raw e JSON.

Cole este JSON de exemplo (substitua autor_id pelo id do autor criado):

```
{
  "titulo": "Dom Casmurro",
  "descricao": "Um clássico da literatura brasileira.",
  "ano_publicacao": 1899,
  "preco": 49.90,
  "autor_id": 1
}
```

## 📌 Resposta esperada

```
{
  "id": 1,
  "titulo": "Dom Casmurro",
  "descricao": "Um clássico da literatura brasileira.",
  "ano_publicacao": 1899,
  "preco": 49.90,
  "autor_id": 1
}
```

### ⚠️ Importante:

titulo e autor_id são obrigatórios.

Se o autor_id não existir, retorna erro 404.

### Pronto! 🚀
 Agora você sabe como cadastrar autores e livros usando Postman.

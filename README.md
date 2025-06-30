# 📊 API de Processamento de Dados de Vendas (ETL Simplificado)

## 🎯 Objetivo

Criar uma API REST em Node.js que simula um pipeline ETL (Extract, Transform, Load), processando arquivos CSV/JSON com dados de vendas, realizando transformações e armazenando-os em um banco de dados relacional.

---

## 🚀 Tecnologias Utilizadas

- **Node.js** + **Express**
- **JavaScript**
- **Multer** – Upload de arquivos
- **csv-parser** ou **papaparse** – Leitura de CSV
- **SQLite3** ou **PostgreSQL**
- **Joi** ou **AJV** – Validação de dados
- **JWT** – Autenticação (opcional)
- **Swagger** – Documentação da API
- **Docker** (opcional)

---

## 🔄 Fluxo da Aplicação (ETL)

1. **Extract**
   - A API recebe arquivos CSV ou JSON contendo dados brutos de vendas.
2. **Transform**
   - Limpeza de campos vazios.
   - Conversão e normalização de datas.
   - Padronização de nomes.
   - Cálculo de campos derivados (ex.: `valor_total = quantidade * preco_unitario`).
3. **Load**
   - Inserção dos dados tratados em um banco relacional.
4. **Consulta via API**
   - `GET /vendas` – Listar vendas.
   - `GET /produtos/top-vendidos` – Produtos mais vendidos.
   - `GET /usuarios/:id/compras` – Compras por usuário.
   - `POST /upload` – Upload de novos arquivos.

---

## 📁 Estrutura de Pastas

/etl-api  

│
├── /uploads # CSVs enviados  

├── /controllers # Lógica dos endpoints  

├── /routes # Definição das rotas  

├── /services # Lógica de ETL  

├── /models # Modelos do banco  

├── /database # Conexão com banco  

├── app.js  

└── server.js

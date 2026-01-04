# ⚡ Projeto Faraday

Plataforma web para gestão de voluntários e doações do Instituto VORP, com sistema de autenticação e banco de dados na nuvem.

---

## 🚀 Tecnologias Utilizadas

### Frontend (Interface)
- **React + Vite**: Framework principal para construção da interface.
- **React Router Dom**: Gerenciamento de rotas e navegação.
- **Axios**: Cliente HTTP para comunicação com a API.
- **CSS Modules**: Estilização dos componentes.

### Backend (API)
- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework para criação da API REST.
- **Sequelize (ORM)**: Gerenciamento e modelagem do banco de dados.
- **PostgreSQL**: Banco de dados relacional.
- **JWT (JsonWebToken)**: Sistema de autenticação e segurança.
- **Bcrypt**: Criptografia de senhas.
- **Dotenv**: Gerenciamento de variáveis de ambiente.
- **Nodemon**: Utilitário para desenvolvimento (hot-reload).

### Infraestrutura
- **Supabase**: Hospedagem do banco de dados PostgreSQL na nuvem.

---

## 📂 Estrutura do Projeto

O projeto é dividido em duas partes principais que precisam rodar simultaneamente:

1.  **`/server`**: Backend (API, Banco de Dados, Regras de Negócio).
2.  **`/vite-project`**: Frontend (Telas, React, Axios).

---

## 🛠️ Como Rodar o Projeto

Você precisará de dois terminais abertos: um para o Backend e outro para o Frontend.

### 1. Configurando e Rodando o Backend (Servidor)

No primeiro terminal:

```bash
# Entre na pasta do servidor
cd server

# Instale as dependências (caso seja a primeira vez)
npm install

# Inicie o servidor em modo de desenvolvimento
npm run dev
```

*   **Porta**: O servidor rodará em `http://localhost:5000`.
*   **Banco de Dados**: Ele se conectará automaticamente ao Supabase (configurado no `.env`).
*   **Status**: Você verá mensagens como "Database connected" e "Database synced".

### 2. Configurando e Rodando o Frontend (Interface)

No segundo terminal:

```bash
# Entre na pasta do projeto frontend
cd vite-project

# Instale as dependências (caso seja a primeira vez)
npm install

# Inicie o servidor frontend
npm run dev
```

*   **Porta**: O site abrirá em `http://localhost:5173`.
*   **Acesso**: Abra seu navegador neste endereço.

### 3. Build para Produção (Opcional)

Caso queira gerar a versão otimizada para produção do frontend:

```bash
cd vite-project
npm run build
```

---

## 🔐 Acesso e Testes

### Usuário Administrador Padrão
Para acessar o sistema pela primeira vez, utilize as credenciais criadas (via seed):

- **Login**: `admin@admin.com`
- **Senha**: `admin`

### Rotas e Funcionalidades
- **`/` (Home)**: Página inicial (Protegida - Requer Login).
- **`/login`**: Tela de Login (Pública).
- **`/voluntario`**: Cadastro de Voluntários (Protegida - Salva no Banco).
- **`/donate`**: Página de Doação (Protegida).

*O sistema possui redirecionamento inteligente: se tentar acessar a Home sem logar, vai para o Login. Se tentar acessar o Login já logado, vai para a Home.*

---

## 📡 Testando a API (Postman / Insomnia)

Se quiser testar apenas o Backend sem o Frontend, utilize as seguintes rotas em `http://localhost:5000`:

### Autenticação
- **POST** `/api/auth/login`
    - Body (JSON): `{ "email": "admin@admin.com", "password": "admin" }`
    - Retorno: Token JWT.

- **POST** `/api/auth/register` (Para criar novos admins via API)
    - Body (JSON): `{ "username": "Novo", "email": "novo@teste.com", "password": "123" }`

### Voluntários (Requer Token no Header `Authorization: Bearer SEU_TOKEN`)
- **GET** `/api/volunteers`: Lista todos os voluntários.
- **POST** `/api/volunteers`: Cria um voluntário.
    - Body: `{ "name": "João", "email": "joao@email.com", "phone": "99999999" }`
- **PUT** `/api/volunteers/:id`: Edita um voluntário.
- **DELETE** `/api/volunteers/:id`: Remove um voluntário.

---

## ☁️ Banco de Dados

O banco de dados está hospedado no **Supabase**.
Para visualizar os dados (usuários criados, voluntários cadastrados), acesse o painel do projeto no Supabase e vá em **Table Editor**.

- Tabela `Users`: Administradores do sistema.
- Tabela `Volunteers`: Voluntários cadastrados pelo formulário.

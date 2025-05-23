# Mindsy Web

Aplicativo web gamificado para organização de tarefas, focado em pessoas com TDAH.

## Tecnologias
- Frontend: React (Vite)
- Backend: Node.js (Express)
- Banco de Dados: PostgreSQL

## Como rodar o projeto

### 1. Backend

1. Instale as dependências:
   ```bash
   cd backend
   npm install
   ```
2. Configure o arquivo `.env` com as variáveis de conexão do banco de dados e JWT:
   ```env
   DATABASE_URL=postgres://usuario:senha@localhost:5432/mindsy
   JWT_SECRET=sua_chave_secreta
   DB_SSL=false
   ```
3. Execute as migrations (se necessário) e inicie o backend:
   ```bash
   npm start
   ```
   O backend estará disponível em http://localhost:3000

### 2. Frontend

1. Instale as dependências:
   ```bash
   cd web
   npm install
   ```
2. Inicie o frontend:
   ```bash
   npm run dev
   ```
   O frontend estará disponível em http://localhost:5174

---

## Funcionalidades
- Cadastro/login de usuário
- Cadastro/listagem/edição/conclusão de tarefas
- Cadastro/listagem/resgate de recompensas
- Sistema de XP, pontos e níveis

---

## Observações
- O projeto não possui mais versão mobile.
- Para dúvidas ou sugestões, abra uma issue no repositório privado.

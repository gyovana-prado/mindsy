# Passo a passo para rodar e testar o Mindsy localmente

## 1. Banco de Dados
- Certifique-se de ter o PostgreSQL instalado e rodando.
- Crie o banco de dados `mindsy_app`.
- Execute o script `backend/schema.sql` para criar as tabelas.

## 2. Backend
- Acesse a pasta backend:
  ```bash
  cd backend
  ```
- Crie um arquivo `.env` com o conteúdo:
  ```
  DATABASE_URL=postgres://postgres:SUA_SENHA@localhost:5432/mindsy_app
  ```
  (Troque SUA_SENHA pela senha real do usuário postgres)
- Instale as dependências:
  ```bash
  npm install
  ```
- Inicie o backend SEMPRE a partir da pasta backend:
  ```bash
  node src/index.js
  ```
- O backend deve mostrar: `Servidor rodando na porta 3000`

## 3. Mobile (Expo)
- Acesse a pasta mobile:
  ```bash
  cd mobile
  ```
- Instale as dependências:
  ```bash
  npm install
  ```
- Inicie o Expo:
  ```bash
  npx expo start
  ```
- Abra o emulador Android (ou use Expo Go no celular).
- Pressione `a` no terminal do Expo para abrir no emulador.

## 4. Teste o app
- Use o app normalmente para cadastro, login, tarefas, etc.
- Para testar login, use um usuário já cadastrado no banco.

## 5. Dicas de depuração
- Sempre confira se o backend está lendo o `.env` (rode a partir da pasta backend).
- Se der erro de login, confira o hash da senha no banco e se o backend está conectado ao banco correto.
- Use o comando curl para testar o login:
  ```bash
  curl -X POST http://localhost:3000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"mindsy_teste@gmail.com","password":"mindsy123"}'
  ```
- Veja os logs do backend para mensagens de erro. 
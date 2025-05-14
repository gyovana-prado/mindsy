# Plano de Ação — Mindsy

## 1. Definição do Escopo do MVP
- Cadastro e login de usuário (username, email, senha, OAuth Google)
- Cadastro de tarefas com dificuldade e pontuação
- Cadastro de recompensas com meta de pontos
- Sistema de XP, níveis e boosts
- Tracking de tarefas finalizadas/em andamento
- Notificações locais (Android)
- Relatórios de progresso simples

## 2. Estruturação do Repositório
- [x] Inicializar repositório Git privado
- [x] Criar arquivos auxiliares: plano_acao.md, contexto_projeto.md, cursor_rules, prompt/snippet

## 3. Configuração do Backend
- [x] Estruturar pastas iniciais do backend (Node.js/Express)
- [x] Atualizar Node.js para versão 20+
- [x] Criar arquivos iniciais (index.js, db.js)
- [ ] Modelagem e criação do banco de dados PostgreSQL (em andamento)
- [ ] Implementar autenticação (JWT + OAuth Google)
- [ ] Endpoints para tarefas, recompensas, usuários, XP/níveis

## 4. Configuração do Mobile
- [ ] Inicializar projeto React Native (Expo)
- [ ] Implementar telas de login/cadastro
- [ ] Tela de cadastro/listagem de tarefas
- [ ] Tela de cadastro/listagem de recompensas
- [ ] Tela de progresso/relatórios
- [ ] Integração com backend

## 5. Testes e Ajustes
- [ ] Testes locais no Android
- [ ] Ajustes de UX/UI conforme boas práticas mobile

## 6. Documentação e Versionamento
- [x] Manter documentação atualizada no repositório
- [x] Atualizar arquivo de contexto a cada alteração relevante

---

### Priorização
1. Backend e autenticação
2. Cadastro/listagem de tarefas e recompensas
3. Sistema de XP, níveis e boosts
4. Notificações locais
5. Relatórios de progresso
6. Ajustes de UX/UI

### Entregáveis
- MVP funcional no Android
- Backend documentado e testado
- Documentação de uso e contexto

---

#### Última atualização: [preencher com data atual]
- Última ação concluída: Criação do banco de dados e tabelas no PostgreSQL (arquivo schema.sql gerado, banco mindsy_app criado).
- Próxima ação: Implementar autenticação (JWT + OAuth Google). 
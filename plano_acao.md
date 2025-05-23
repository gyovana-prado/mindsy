# Plano de Ação — Mindsy

## 1. Definição do Escopo do MVP
- Cadastro e login de usuário (username, email, senha, OAuth Google)
- Cadastro de tarefas com dificuldade e pontuação
- Cadastro de recompensas com meta de pontos
- Sistema de XP, níveis e boosts
- Tracking de tarefas finalizadas/em andamento
- Relatórios de progresso simples

## 2. Estruturação do Repositório
- [x] Inicializar repositório Git privado
- [x] Criar arquivos auxiliares: plano_acao.md, contexto_projeto.md, cursor_rules, prompt/snippet

## 3. Configuração do Backend
- [x] Estruturar pastas iniciais do backend (Node.js/Express)
- [x] Atualizar Node.js para versão 20+
- [x] Criar arquivos iniciais (index.js, db.js)
- [x] Modelagem e criação do banco de dados PostgreSQL
- [x] Implementar autenticação (JWT + OAuth Google)
- [x] Endpoints para tarefas, recompensas, usuários, XP/níveis
- [x] Endpoint GET /api/tasks implementado

## 4. Configuração do Frontend Web
- [x] Inicializar projeto React (Vite)
- [x] Implementar telas de login/cadastro
- [x] Tela de cadastro/listagem de tarefas
- [x] Tela de cadastro/listagem de recompensas
- [x] Tela de progresso/relatórios
- [x] Integração com backend

## 5. Testes e Ajustes
- [ ] Testes locais no navegador
- [ ] Ajustes de UX/UI conforme boas práticas web

## 6. Documentação e Versionamento
- [x] Manter documentação atualizada no repositório
- [x] Atualizar arquivo de contexto a cada alteração relevante

---

### Priorização
1. Backend e autenticação
2. Cadastro/listagem de tarefas e recompensas
3. Sistema de XP, níveis e boosts
4. Relatórios de progresso
5. Ajustes de UX/UI

### Entregáveis
- MVP funcional web
- Backend documentado e testado
- Documentação de uso e contexto

---

#### Última atualização: 2024-06-08
- Última ação concluída: Implementação do endpoint GET /api/tasks e limpeza de arquivos mobile.
- Próxima ação: Testes finais e ajustes de UX/UI conforme boas práticas web. 
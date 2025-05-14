# Contexto do Projeto — Mindsy

## Objetivo
Desenvolver um aplicativo gamificado para ajudar pessoas com TDAH (e outros perfis) a manterem uma rotina disciplinada, tornando tarefas cotidianas mais atrativas por meio de pontos, recompensas e sistema de progressão.

## Público-alvo
Inicialmente uso pessoal, mas com arquitetura escalável para múltiplos usuários.

## Funcionalidades Principais
- Cadastro e login de usuário (username, email, senha, OAuth Google)
- Cadastro de tarefas com dificuldade e pontuação
- Cadastro de recompensas com meta de pontos
- Sistema de XP, níveis e boosts (recompensas especiais)
- Tracking de tarefas finalizadas/em andamento
- Notificações locais (Android)
- Relatórios de progresso

## Stack Tecnológica
- **Mobile:** React Native (Expo)
- **Backend:** Node.js (Express)
- **Banco de Dados:** PostgreSQL
- **Autenticação:** JWT + OAuth Google
- **Versionamento:** GitHub (repositório privado)

## Decisões Tomadas
- Foco inicial em Android, com possibilidade de expansão para web
- Backend próprio para maior controle e escalabilidade
- Banco de dados local (PostgreSQL) para desenvolvimento
- Front-end web será desenvolvido separadamente no futuro
- Ferramentas e bibliotecas open-source e gratuitas
- Node.js atualizado para versão 20+
- Modelagem de banco de dados definida e em implementação

## Premissas
- Execução local, compatível com Linux
- Uso diário esperado
- Design seguindo boas práticas mobile
- Sem preocupações específicas de privacidade no momento

---

Este arquivo deve ser atualizado sempre que houver mudanças relevantes no escopo, stack ou decisões do projeto.

#### Última atualização: [preencher com data atual]
- Última ação concluída: Criação do banco de dados e tabelas no PostgreSQL (arquivo schema.sql gerado, banco mindsy_app criado).
- Próxima ação: Implementar autenticação (JWT + OAuth Google). 
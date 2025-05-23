# Contexto do Projeto — Mindsy

## Objetivo
Desenvolver um aplicativo web gamificado para ajudar pessoas com TDAH (e outros perfis) a manterem uma rotina disciplinada, tornando tarefas cotidianas mais atrativas por meio de pontos, recompensas e sistema de progressão.

## Público-alvo
Inicialmente uso pessoal, mas com arquitetura escalável para múltiplos usuários.

## Funcionalidades Principais
- Cadastro e login de usuário (username, email, senha, OAuth Google)
- Cadastro de tarefas com dificuldade e pontuação
- Cadastro de recompensas com meta de pontos
- Sistema de XP, níveis e boosts (recompensas especiais)
- Tracking de tarefas finalizadas/em andamento
- Relatórios de progresso

## Stack Tecnológica
- **Frontend Web:** React (Vite)
- **Backend:** Node.js (Express)
- **Banco de Dados:** PostgreSQL
- **Autenticação:** JWT + OAuth Google
- **Versionamento:** GitHub (repositório privado)

## Decisões Tomadas
- Foco em web (mobile descontinuado)
- Backend próprio para maior controle e escalabilidade
- Banco de dados local (PostgreSQL) para desenvolvimento
- Ferramentas e bibliotecas open-source e gratuitas
- Node.js atualizado para versão 20+
- Modelagem de banco de dados definida e em implementação

## Premissas
- Execução local, compatível com Linux
- Uso diário esperado
- Design seguindo boas práticas web
- Sem preocupações específicas de privacidade no momento

---

Este arquivo deve ser atualizado sempre que houver mudanças relevantes no escopo, stack ou decisões do projeto.

#### Última atualização: 2024-06-08
- Última ação concluída: Migração completa para web, limpeza de arquivos mobile e ajuste das rotas de tarefas.
- Próxima ação: Testes finais e ajustes de UX/UI conforme boas práticas web. 
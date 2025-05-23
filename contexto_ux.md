# Contexto de UX — Mindsy

## Objetivo UX
Desenvolver uma experiência intuitiva, motivadora e acessível para pessoas com TDAH, ajudando-as a manter uma rotina disciplinada por meio de gamificação, evitando sobrecarga cognitiva e promovendo o uso contínuo do app.

---

## Estrutura de Navegação Recomendada

### Biblioteca: `@react-navigation`

- **Stack Navigator** (`createNativeStackNavigator`)
  - `OnboardingScreen`
  - `LoginScreen` / `RegisterScreen`
  - `MainTabs` (após login)

- **Bottom Tab Navigator** (`createBottomTabNavigator`)
  - 🏠 `HomeScreen`: Tarefas do dia e progresso
  - 🏆 `RewardsScreen`: Lista de recompensas desbloqueáveis
  - 📊 `ProgressScreen`: Relatórios e evolução
  - ⚙️ `SettingsScreen`: Perfil, notificações, logout

---

## Telas e Funcionalidades

### 1. Onboarding
- Slides com swipe horizontal (máx. 3):
  - **Boas-vindas**
  - **Explicação da gamificação**
  - **Botões**: Criar conta / Entrar com Google

### 2. Autenticação
- Login e cadastro (username/email/senha)
- OAuth com Google
- Feedback claro em caso de erro

### 3. HomeScreen
- Lista de tarefas do dia com checkbox
- Pontuação visível por tarefa
- Barra de XP e nível atual
- Botão flutuante para adicionar tarefa

### 4. Recompensas
- Lista com nome, pontos necessários e botão de resgate
- Feedback visual ao atingir a meta

### 5. Progresso
- Gráficos simples (tarefas por dia, XP por semana)
- Histórico de níveis
- Título motivacional

### 6. Configurações
- Alterar nome/avatar
- Notificações locais (on/off)
- Logout

---

## Componentes Reutilizáveis Sugeridos

- Botão Primário (com loading)
- Card de Tarefa
- Card de Recompensa
- Barra de XP
- Modal de Confirmação

---

## Bibliotecas Recomendadas

- **UI**: `react-native-paper` ou `nativewind`
- **Gráficos**: `react-native-chart-kit`
- **Ícones**: `react-native-vector-icons`
- **Navegação**: `@react-navigation/native`

---

## Microinterações e Acessibilidade

- Animação suave ao concluir tarefas
- Ícones e cores de alto contraste (acessibilidade básica)
- Navegação facilitada com o polegar (menu inferior)

---

## Decisões Tomadas

- Boosts e funcionalidades avançadas ficarão para versões futuras
- Tema escuro/a11y será avaliado futuramente
- Navegação estruturada com Stack + Bottom Tabs

---

## Próximas Ações UX

1. Implementar estrutura de navegação no app (`App.tsx`)
2. Criar wireframes ou componentes JSX das telas
3. Validar microinterações e acessibilidade básica
4. Documentar fluxo com imagens (caso necessário)

---

## Última atualização: [preencher com data atual]
- Autor: ChatGPT (com instruções da usuária)

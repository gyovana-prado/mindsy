# prompt_snippet.md — Mindsy

## Prompt do Projeto
"Desenvolva um aplicativo gamificado para ajudar pessoas com TDAH (e outros perfis) a manterem uma rotina disciplinada, tornando tarefas cotidianas mais atrativas por meio de pontos, recompensas e sistema de progressão. O app deve permitir cadastro de tarefas, recompensas, sistema de XP, níveis, boosts, tracking de progresso e notificações."

## Exemplo de Snippet (Node.js)
```js
// Exemplo de chamada de endpoint para cadastrar tarefa
fetch('http://localhost:3000/api/tarefas', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer <token>'
  },
  body: JSON.stringify({
    titulo: 'Estudar 30 minutos',
    dificuldade: 'média',
    pontos: 20
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
``` 
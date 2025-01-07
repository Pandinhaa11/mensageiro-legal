const WebSocket = require('ws');
const port = process.env.PORT || 8080;  // Usando a porta configurada no Render
const wss = new WebSocket.Server({ port });

wss.on('connection', (ws) => {
  console.log('Cliente conectado');
  ws.on('message', (message) => {
    console.log('Mensagem recebida:', message);
  });
  ws.send('Bem-vindo ao servidor WebSocket!');
});

console.log(`Servidor WebSocket em execução na porta ${port}`);

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 }); // O servidor WebSocket estará na porta 8080

wss.on('connection', (ws) => {
  console.log('Novo cliente conectado!');

  // Evento para quando uma mensagem for recebida do cliente
  ws.on('message', (message) => {
    console.log('Mensagem recebida: ' + message);

    // Enviar a mensagem para todos os outros clientes conectados
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message); // Envia para os outros clientes
      }
    });
  });

  // Evento quando o cliente desconectar
  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});

console.log('Servidor WebSocket está rodando na porta 8080');

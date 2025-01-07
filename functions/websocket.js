// netlify/functions/websocket.js
const WebSocket = require('ws');

exports.handler = async (event, context) => {
  return new Promise((resolve, reject) => {
    const wss = new WebSocket.Server({ noServer: true });

    wss.on('connection', (ws) => {
      console.log('Client connected');
      
      // Quando uma mensagem for recebida, envia de volta para todos os clientes
      ws.on('message', (message) => {
        console.log('received: %s', message);
        wss.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(message);
          }
        });
      });

      ws.on('close', () => {
        console.log('Client disconnected');
      });
    });

    resolve({
      statusCode: 200,
      body: JSON.stringify({ message: 'WebSocket is ready' }),
    });
  });
};

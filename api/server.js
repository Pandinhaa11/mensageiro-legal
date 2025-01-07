// api/websocket.js
const WebSocket = require('ws');

// Esta função é chamada quando o endpoint `/api/websocket` for acessado
export default function handler(req, res) {
  // Verifica se a requisição é do tipo WebSocket
  if (req.headers.upgrade && req.headers.upgrade === 'websocket') {
    const wss = new WebSocket.Server({ noServer: true });

    // Conexão WebSocket
    wss.on('connection', (ws) => {
      console.log('Client connected');

      ws.on('message', (message) => {
        console.log('received: %s', message);
        // Enviar a mensagem para todos os clientes conectados
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

    // Precisamos configurar o WebSocket para uma conexão
    req.socket.on('upgrade', (req, socket, head) => {
      wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit('connection', ws, req);
      });
    });

    // Resposta HTTP (não é necessário para WebSocket, mas é requerido pelo Vercel)
    res.status(200).json({ message: 'WebSocket server is running' });
  } else {
    res.status(400).json({ message: 'Not a WebSocket connection' });
  }
}

const express = require('express');
const { Server } = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new Server({ server });

const clients = new Set();

wss.on('connection', (ws) => {
  clients.add(ws);
  ws.on('message', (message) => {
    const messageString = message.toString(); // Convert message to string
    for (const client of clients) {
      if (client !== ws && client.readyState === ws.OPEN) { // Updated line
        client.send(messageString); // Send the string message
      }
    }
  });
  ws.on('close', () => {
    clients.delete(ws);
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


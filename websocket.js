// websocket.js
const WebSocket = require('ws');

// Initialize WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Array to store connected clients
const clients = [];

// Function to broadcast message to all clients
const broadcast = (data) => {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

// Handle new WebSocket connections
wss.on('connection', (ws) => {
  console.log('New client connected');

  // Add new client to array
  clients.push(ws);

  // Handle messages from client
  ws.on('message', (message) => {
    console.log('Received message:', message);

    // Parse message data
    const data = JSON.parse(message);

    // Check message type
    switch (data.type) {
      case 'join':
        // Add client to waiting list
        console.log('Client joined waiting list');
        // You can handle adding the client to the waiting list here
        // For example: addClientToWaitingList(data.clientId);
        break;
      case 'reduce':
        // Reduce waiting list
        console.log('Doctor reduced waiting list');
        // You can handle reducing the waiting list here
        // For example: reduceWaitingList(data.numToReduce);
        break;
      default:
        console.log('Unknown message type');
    }
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log('Client disconnected');

    // Remove client from array
    const index = clients.indexOf(ws);
    if (index > -1) {
      clients.splice(index, 1);
    }
  });
});

module.exports = { wss, broadcast };

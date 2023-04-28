const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const messages = document.getElementById('messages');

const ws = new WebSocket('ws://localhost:3000');
ws.binaryType = 'text'; // Specify Websocket should use the 'text' date type.

ws.addEventListener('open', () => {
  console.log('Connected to WebSocket server');
});

ws.addEventListener('message', (event) => {
  console.log('Received data type:', typeof event.data); // Trouble shoot 'binaryType'
  const li = document.createElement('li');
  li.textContent = event.data;
  messages.appendChild(li);
});

sendButton.addEventListener('click', () => {
  const message = messageInput.value;
  if (message) {
    ws.send(message);
    messageInput.value = '';
  }
});


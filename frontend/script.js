const socket = io();

document.getElementById('send-button').onclick = () => {
    const message = document.getElementById('message-input').value;
    const recipientId = document.getElementById('recipient-id').value;
    const groupId = document.getElementById('group-id').value;

    if (groupId) {
        socket.emit('group message', message, groupId);
    } else if (recipientId) {
        socket.emit('private message', message, recipientId);
    }

    document.getElementById('message-input').value = '';
};

document.getElementById('join-group').onclick = () => {
    const groupId = document.getElementById('group-id').value;
    socket.emit('join group', groupId);
};

socket.on('private message', (msg) => {
    const messages = document.getElementById('messages');
    const newMessage = document.createElement('li');
    newMessage.textContent = `Private: ${msg}`;
    messages.appendChild(newMessage);
});

socket.on('group message', (msg) => {
    const messages = document.getElementById('messages');
    const newMessage = document.createElement('li');
    newMessage.textContent = `Group: ${msg}`;
    messages.appendChild(newMessage);
});
// WebSocket connection establish karna
const WebSocket = io();

// Connection event ka handle
socket.on('connect', () => {
    console.log('Connected to server with socket ID:', socket.id);
});

// Other events ka handle
socket.on('private message', (msg) => {
    console.log('Private message received:', msg);
});

socket.on('group message', (msg) => {
    console.log('Group message received:', msg);
});

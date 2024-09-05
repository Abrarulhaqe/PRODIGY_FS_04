const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, '../frontend')));

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('private message', (msg, recipientId) => {
        socket.to(recipientId).emit('private message', msg);
    });

    socket.on('join group', (groupId) => {
        socket.join(groupId);
    });

    socket.on('group message', (msg, groupId) => {
        io.in(groupId).emit('group message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(3000, () => {
    console.log('Server is listening on http://localhost:3000');
});

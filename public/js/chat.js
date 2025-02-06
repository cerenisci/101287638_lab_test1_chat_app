const socket = io('http://localhost:3000');

function sendMessage() {
    const message = document.getElementById('message').value;
    socket.emit('chatMessage', { room: 'nodeJS', message });
}

socket.on('message', (msg) => {
    const messages = document.getElementById('messages');
    messages.innerHTML += `<p>${msg}</p>`;
});

document.getElementById('message').addEventListener('input', () => {
    socket.emit('typing', { room: 'nodeJS', username: 'User' });
});

socket.on('typing', (msg) => {
    document.getElementById('typing').innerText = msg;
});
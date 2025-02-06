const express = require('express');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// MongoDB connection string with your credentials
const dbURI = 'mongodb+srv://cerenisci:Bihter2021@cluster0.us9yy.mongodb.net/chat_app?retryWrites=true&w=majority';

// Connect to MongoDB using Mongoose
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB Connected');
}).catch(err => {
    console.log('MongoDB connection error:', err);
});

// Middleware for parsing JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes for signup and login
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    // Handle user signup logic (e.g., saving user data in MongoDB)
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Handle user login and authentication logic
});

// Socket.io logic for real-time messaging
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle joining a room
    socket.on('joinRoom', (roomName) => {
        socket.join(roomName);
        console.log(`User joined room: ${roomName}`);
    });

    // Handle sending a message to a room
    socket.on('message', (data) => {
        const { room, message, username } = data;
        // Save the message to MongoDB (group or private messages)
        io.to(room).emit('message', { username, message });
    });

    // Handle typing indicator
    socket.on('typing', (username) => {
        socket.broadcast.emit('typing', username);
    });

    // Handle disconnecting from the room
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Set the server to listen on a specific port (default 5000)
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const express = require('express');
const path = require('path');
const app = express();
const port = 5000;

// Serve static files (signup.html, login.html, chatroom.html)
app.use(express.static(path.join(__dirname, 'public')));

// Serve the sign-up page
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Serve the login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Serve the chat room page
app.get('/chatroom', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'chatroom.html'));
});

// Set up other necessary routes for your application (signup, login POST, etc.)

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
app.use(express.urlencoded({ extended: true }));

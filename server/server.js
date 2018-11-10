require ('./config/config.js');
const express 	= require('express');
const path 	= require('path');
const http 	= require('http');
const socketIO 	= require('socket.io');

const {generateMessage} = require('./utils/message.js');

const publicPath = path.join('__dirname', '../public');
const port = process.env.PORT;

var app = express();
app.use (express.static(publicPath));

// create a server using http
var server = http.createServer(app);
var io = socketIO(server);	// websocket server

io.on ('connection', (socket) => {
    console.log ('Server::new user connected');

    // emit an event to a single connection
    socket.emit ('newMessage', 
	generateMessage ('Admin', 'Welcome to the chat app!'));

    // broadcast to everyone except the sender 
    socket.broadcast.emit ('newMessage', 
	generateMessage ('Admin', `New user joined!`));

    socket.on ('createMessage', function (newMessage, callback) {
	console.log ('Server::Received new message via createMessage', newMessage);
	// emit an event to everyone who is connected, including the sender
	io.emit ('newMessage', 
	    generateMessage (newMessage.from, newMessage.text));
	callback('Server:: Got your message! ' + newMessage.text);
    });

    socket.on ('disconnect', () => {
	console.log ('Server::user disconnected');
    });
});

server.listen(port, () => {
    console.log (`Server started on port ${port}`);
});

module.exports = {app};

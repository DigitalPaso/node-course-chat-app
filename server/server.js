require ('./config/config.js');
const express 	= require('express');
const path 	= require('path');
const http 	= require('http');
const socketIO 	= require('socket.io');

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
    socket.emit ('newMessage', {
	from: "Admin",
	text: "Welcome to the chat app!",
	createdAt: new Date().getTime()
    });

    // broadcast to everyone except the sender 
    socket.broadcast.emit ('newMessage', {
	from: 'Admin',
	text: 'new user joined!',
	createdAt: new Date().getTime()
    });

    socket.on ('createMessage', function (newMessage) {
	// emit an event to everyone who is connected, including the sender
	io.emit ('newMessage', {
	    from: newMessage.from, 
	    text: newMessage.text, 
	    createdAt: new Date().getTime()
	});
	// broadcase an event to everyone who is connected, except the sender
	/*
	socket.broadcast.emit ('newMessage', {
	    from: newMessage.from, 
	    text: newMessage.text, 
	    createdAt: new Date().getTime()
	});
	*/

	console.log ('Server::Received new message via createMessage', newMessage);
    });

    socket.on ('disconnect', () => {
	console.log ('Server::user disconnected');
    });
});

server.listen(port, () => {
    console.log (`Server started on port ${port}`);
});

module.exports = {app};

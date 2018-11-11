require ('./config/config.js');
const express 	= require('express');
const path 	= require('path');
const http 	= require('http');
const socketIO 	= require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require('./utils/validators.js');
const {Users} = require('./utils/users.js');

const publicPath = path.join('__dirname', '../public');
const port = process.env.PORT;

var app = express();
app.use (express.static(publicPath));

// create a server using http
var server = http.createServer(app);
var io = socketIO(server);	// websocket server
var users = new Users();

io.on ('connection', (socket) => {

    console.log ('Server::new user connected');

    // joining a room
    socket.on('join', function(params, callback) {
	if (!isRealString(params.name) ||
	    !isRealString(params.room)) {
	    return callback('Name and room name are required.');
	}

	socket.join (params.room);

	users.removeUser(socket.id);	
	users.addUser(socket.id, params.name, params.room);

	// add the new event
	io.to(params.room).emit ('updateUserList', users.getUserList(params.room));

	// emit an event to a single connection
	socket.emit ('newMessage', 
	    generateMessage ('Admin', 'Welcome to the chat app!'));

	// broadcast to everyone except the sender 
	socket.broadcast.to(params.room).emit ('newMessage', 
	    generateMessage (`${params.name} joined ${params.room}`));

	callback();
    });

    socket.on ('createMessage', function (newMessage, callback) {
	// emit an event to everyone who is connected, including the sender
	io.emit ('newMessage', 
	    generateMessage (newMessage.from, newMessage.text));
	callback();
    });

    socket.on ('createLocationMessage', function (coords) {
	io.emit('newLocationMessage', generateLocationMessage(
	    'Position', coords.latitude, coords.longitude));
    });

    socket.on ('disconnect', () => {
	var user = users.removeUser(socket.id);	
	if (user) {
	    io.to(user.room).emit('updateUserList', 
		users.getUserList(user.room));
	    io.to(user.room).emit('newMessage',
		generateMessage ('Admin',`${user.name} has left the room.` ));
	} else {
	}
    });
});

server.listen(port, () => {
    console.log (`Server started on port ${port}`);
});

module.exports = {app};


/*********************
io.emit: 		emit to every connected user
socket.broadcast.emit:	emit to everyone connected except current user
socket.emit:		emit to once user


// specific rooms
io.to(room).emit: 	emit to every connected user in a room
socket.broadcast.to(room).emit:	emit to everyone connected except current user
socket.emit:		emit to once user

************************/



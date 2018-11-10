require ('./config/config.js');
const express 	= require('express');
const path 	= require('path');
const http 	= require('http');
const socketIO 	= require('socket.io');

const publicPath = path.join('__dirname', '../public');
const port = process.env.PORT;

var app = express();
// create a server using http
var server = http.createServer(app);
var io = socketIO(server);	// websocket server

io.on ('connection', (socket) => {
    console.log ('new user connected');
    socket.on ('disconnect', () => {
	console.log ('User disconnected');
    });
});

app.use (express.static(publicPath));

//server.get ('/', (req, res) => {
//});

server.listen(port, () => {
    console.log (`Server started on port ${port}`);
});

module.exports = {app};

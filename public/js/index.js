var socket = io();      // initiate the request
socket.on('connect', function() {
    console.log ('Connected to the server');
});

socket.on('disconnect', function() {
    console.log ('Client::Disconnected from the server');

    socket.emit('createMessage', {
	from: "elmo@foopity.com",
	text: "Hello from Elmo!"
    });
});

socket.on('newMessage', function(data) {
    console.log ('Client::Received a new message', data);
});


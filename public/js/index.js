var socket = io();      // initiate the request
socket.on('connect', function() {
    console.log ('Connected to the server');
});

socket.on('disconnect', function() {
    console.log ('Client::Disconnected from the server');
});

socket.on('newMessage', function(message) {
    console.log ('Client::new message', message);
    var li = jQuery('<li></li>');
    li.text (`${message.from}: ${message.text}`);
    $('#messages').append(li);
});

$('#messageForm').on('submit', function(e) {
    e.preventDefault();
    socket.emit('createMessage', {
	from: 'User',
	text: $('[name=message]').val()
    }, function(message) {
	console.log ("Client::", message);
    });
});

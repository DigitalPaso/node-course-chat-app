var socket = io();      // initiate the request
socket.on('connect', function() {
    console.log ('Connected to the server');
});

socket.on('disconnect', function() {
    console.log ('Client::Disconnected from the server');
});

socket.on('newMessage', function(message) {
    //console.log ('Client::new message', message);
    var li = jQuery('<li></li>');
    li.text (`${message.from}: ${message.text}`);
    $('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>');
    li.text (`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
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

//
// location button
//
var locationButton = $('#sendLocation');
locationButton.on('click', function() {
    if (!navigator.geolocation)
	return alert ('GeoLocation not supported!');
    navigator.geolocation.getCurrentPosition(
	function(position) {
	    socket.emit('createLocationMessage', {
		latitude: position.coords.latitude,
		longitude: position.coords.longitude
	    });
	    console.log (position);
	}, 
	function(err) {
	    return alert ('Something went wrong'); 
	}
    );
});

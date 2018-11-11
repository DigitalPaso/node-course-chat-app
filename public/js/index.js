var socket = io();      // initiate the request
socket.on('connect', function() {
    console.log ('Connected to the server');
});

socket.on('disconnect', function() {
    console.log ('Client::Disconnected from the server');
});

socket.on('newMessage', function(message) {
    var formattedTime = moment(message.createdAt).format ('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
	text: message.text,
	from: message.from,
	createdAt: formattedTime
    });
    $('#messages').append(html);
});

socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(message.createdAt).format ('h:mm a');

    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });
    $('#messages').append(html);
});

var messageTextbox = $('[name=message]');
$('#messageForm').on('submit', function(e) {
    e.preventDefault();
    socket.emit('createMessage', {
	from: 'User',
	text: messageTextbox.val()
    }, function(message) {
	messageTextbox.val('');
    });
});

//
// location button
//
var locationButton = $('#sendLocation');
locationButton.on('click', function() {
    if (!navigator.geolocation)
	return alert ('GeoLocation not supported!');

    locationButton.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(
	function(position) {
	    locationButton.removeAttr('disabled', 'disabled').text('Send location...');
	    socket.emit('createLocationMessage', {
		latitude: position.coords.latitude,
		longitude: position.coords.longitude
	    });
	    console.log (position);
	}, 
	function(err) {
	    locationButton.removeAttr('disabled', 'disabled').text('Send location...');
	    return alert ('Something went wrong'); 
	}
    );
});

var socket = io();      // initiate the request
socket.on('connect', function() {
    console.log ('Connected to the server');
});

socket.on('disconnect', function() {
    console.log ('Client::Disconnected from the server');
});

socket.on('newMessage', function(message) {
    //console.log ('Client::new message', message);
    var formattedTime = moment(message.createdAt).format ('h:mm a');
	
    var li = jQuery('<li></li>');
    li.text (`${message.from} ${formattedTime}: ${message.text}`);
    $('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(message.createdAt).format ('h:mm a');
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>');
    li.text (`${message.from} ${formattedTime}: `);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);
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

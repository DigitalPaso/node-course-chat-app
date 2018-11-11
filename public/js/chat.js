var socket = io();      // initiate the request

function scrollToBottom() {
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');

    var clientHeight = messages.prop('clientHeight');
    var scrollTop    = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight 
        +scrollTop
        +newMessageHeight
        +lastMessageHeight >= scrollHeight) {
	
	messages.scrollTop(scrollHeight);

    } else {
    }
}

socket.on('connect', function() {
    console.log ('Connected to the server');
    var params = jQuery.deparam (window.location.search);
    socket.emit('join', params, function(err){
	if (err) {
	    alert (err);
	    window.location.href = '/';
	} else {
	    console.log("No error!");
	}
    });
});

socket.on('disconnect', function() {
    console.log ('Client::Disconnected from the server');
});

socket.on('updateUserList', function(users) {

    console.log("UserList:", users);
    var ol = jQuery('<ol></ol>');
    users.forEach ((user) =>{
	ol.append(jQuery('<li></li>').text(user));
    });
    jQuery('#user').html(ol);
});

socket.on('newMessage', function(message) {
    var formattedTime = moment(message.createdAt).format ('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
	text: message.text,
	from: message.from,
	createdAt: formattedTime
    });
    scrollToBottom();
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
    scrollToBottom();
    $('#messages').append(html);
});

var messageTextbox = $('[name=message]');
$('#messageForm').on('submit', function(e) {
    e.preventDefault();
    socket.emit('createMessage', {
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

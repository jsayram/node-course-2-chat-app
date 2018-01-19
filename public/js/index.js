var socket = io();

socket.on('connect', function() {
    console.log('connected to server');

});

socket.on('disconnect', function() {
    console.log('disconnected from server');
});


//event listenier from the server 
socket.on('newMessage', function (message) {
	// console.log('Got newMessage', message);

	var formattedTime = moment(message.createdAt).format('h:mm a'); //this formats the time

	var li = jQuery('<li></li>');
	li.text(`${message.from} ${formattedTime}: ${message.text}`);

	jQuery('#messages').append(li);
	
});

/* setting up location listener */
socket.on('newLocationMessage', function(message) {
	 // console.log(message);
	var formattedTime = moment(message.createdAt).format('h:mm a'); //this formats the time
	
	var li = jQuery('<li></li>');
	//target set to blank to open up a new tab
	var a = jQuery('<a target="_blank"> My currrent location </a>');

	li.text(`${message.from} ${formattedTime}: `);
	a.attr('href', message.url);
	li.append(a);
	jQuery('#messages').append(li);
});



jQuery('#message-form').on('submit', function (e) {
	e.preventDefault();

	var messageTextBox = jQuery('[name=message');

	socket.emit('createMessage',{
		from: 'User',
		text: messageTextBox.val()
	}, function () {
		//this the aknowledgement callback 
		messageTextBox.val('')
	});

});


//this is for the location button 
var locationButton = jQuery('#send-location');
//event listener
locationButton.on('click', function(){
	if(!navigator.geolocation){
		return alert('Geolocation not supported by your browser.');
	}

	locationButton.attr('disabled', 'disabled').text('Sending location...');

	navigator.geolocation.getCurrentPosition(function (position){
		// console.log(position);

		locationButton.removeAttr('disabled').text('Send location');

		socket.emit('createLocationMessage',{
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});

	}, function () {
		locationButton.removeAttr('disabled').text('Send location');
		alert('Unable to fetch location.');
	});
});














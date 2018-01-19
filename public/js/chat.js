var socket = io();



function scrollToBottom() {
	//selectors 
	var messages = jQuery('#messages');
	var newMessage = messages.children('li:last-child');

	//heights
	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
	var newMessaeHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();

	if (clientHeight + scrollTop + newMessaeHeight + lastMessageHeight >= scrollHeight){
		// console.log('should scroll');

		messages.scrollTop(scrollHeight);
	};
};


socket.on('connect', function() {
    // console.log('connected to server');
    var params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function (err) {
    	if(err){
    		alert(err);
    		window.location.href = '/';
    	} else {
    		console.log('No Error');
    	};
    });


});

socket.on('disconnect', function() {
    console.log('disconnected from server');
});

//listener for updating user list
socket.on('updateUserList', function(users){
	console.log('User list', users);
	var ol = jQuery('<ol></ol>');

	users.forEach(function (user) {
		ol.append(jQuery('<li></li>').text(user));
	});
	jQuery('#users').html(ol);
})


//event listenier from the server 
socket.on('newMessage', function (message) {
	// console.log('Got newMessage', message);

	var formattedTime = moment(message.createdAt).format('h:mm a'); //this formats the time
	var template = jQuery('#message-template').html();
	var html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	});

	jQuery('#messages').append(html);
	scrollToBottom();

    /* old way of doing things */
	// var formattedTime = moment(message.createdAt).format('h:mm a'); //this formats the time
	// var li = jQuery('<li></li>');
	// li.text(`${message.from} ${formattedTime}: ${message.text}`);
	// jQuery('#messages').append(li);
	
});

/* setting up location listener */
socket.on('newLocationMessage', function(message) {
	 // console.log(message);

	var formattedTime = moment(message.createdAt).format('h:mm a'); //this formats the time
	var template = jQuery('#location-message-template').html();
	var html = Mustache.render(template, {
		from: message.from,
		url: message.url,
		createdAt: formattedTime
	});

	jQuery('#messages').append(html);
	scrollToBottom();


	/* old way of doing it */
	// var formattedTime = moment(message.createdAt).format('h:mm a'); //this formats the time
	// var li = jQuery('<li></li>');
	// //target set to blank to open up a new tab
	// var a = jQuery('<a target="_blank"> My currrent location </a>');
	// li.text(`${message.from} ${formattedTime}: `);
	// a.attr('href', message.url);
	// li.append(a);
	// jQuery('#messages').append(li);
});



jQuery('#message-form').on('submit', function (e) {
	e.preventDefault();

	var messageTextBox = jQuery('[name=message]');

	socket.emit('createMessage',{
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














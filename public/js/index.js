var socket = io();

socket.on('connect', function() {
    console.log('connected to server');

});

socket.on('disconnect', function() {
    console.log('disconnected from server');
});


//event listenier from the server 
socket.on('newMessage', function (message) {
	console.log('Got New Message', message);
});
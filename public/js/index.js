var socket = io();

socket.on('connect', function() {
    console.log('connected to server');

    //emits to the server 
    socket.emit('createMessage', {
    	from: 'Jose',
    	text: 'Yeah that works from me, the client side'
    });
});

socket.on('disconnect', function() {
    console.log('disconnected from server');
});


//event listener to get data from the server 
socket.on('newMessage', function (message) {
	console.log('Got New Message', message);
});
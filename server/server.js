const path = require('path');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');



//built in modules
const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);


//configured middleware for static website
app.use(express.static(publicPath))


io.on('connection', (socket) => {
    console.log('New User Connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));


    //this listens to an event from the client to the server
    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        /*emits to every single connection*/
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();

        // socket.broadcast.emit('newMessage', {
        // 	from: message.from,
        // 	text: message.text,
        // 	createdAt: new Date().getTime()
        // });

    });

    // this will emit latitude and logitude coordinates
    socket.on('createLocationMessage', (coords)=>{
    	io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
    });


    socket.on('disconnect', () => {
        console.log('user was disconnected');
    });
});

//configure the port
server.listen(port, () => {
    console.log(`Started up at port ${port}`);
});


module.exports = { app };
const path = require('path');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');



//built in modules
const { generateMessage, generateLocationMessage } = require('./utils/message.js');
const { isRealString } = require('./utils/validation.js')
const { Users } = require('./utils/users');
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

//configured middleware for static website
app.use(express.static(publicPath))


io.on('connection', (socket) => {
    console.log('New User Connected');

    //listener for the join function in chat.js
    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and room name are required');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        // io.emit -> io.to('The Office Fans').emit
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));



        // socket.broadcast.emit -> socket.broadcast.to('The Office Fans').emit
        // socket.emit -> //this sends it to specific person 
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
        callback();
    });

    //this listens to an event from the client to the server
    socket.on('createMessage', (message, callback) => {
        // console.log('createMessage', message);

        var user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {
            /*emits to just a single connection*/
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        callback();

        // socket.broadcast.emit('newMessage', {
        // 	from: message.from,
        // 	text: message.text,
        // 	createdAt: new Date().getTime()
        // });

    });

    // this will emit latitude and logitude coordinates
    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);

        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });


    socket.on('disconnect', () => {
        // console.log('user was disconnected');
        //remove user 
        var user = users.removeUser(socket.id);

        //update the user list again
        if (user) {
            //update user list
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            //emits message to the chat
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`))
        }
    });
});

//configure the port
server.listen(port, () => {
    console.log(`Started up at port ${port}`);
});


module.exports = { app };
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');



//built in modules
const path = require('path');
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);


//configured middleware for static website
app.use(express.static(publicPath))


io.on('connection', (socket)=>{
	console.log('New User Connected');


	socket.on('disconnect',()=>{
		console.log('dißsconnected from server');
	});
});

//configure the port
server.listen(port, () => {
    console.log(`Started up at port ${port}`);
});


module.exports = { app };
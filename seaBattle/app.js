var express = require('express');
var app = express();
var http = require('http').Server(app);
var socket = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/index.html');
});

// app.get('/index.js', function(req, res){
//   res.sendFile(__dirname + '/index.js');
// });

socket.on('connection', function(socket) {
 	console.log('a user connected');
 	socket.on('play', function(text){
		console.log(text);
		send(text);
	});

	socket.on('hy', console.log);

});

var send = function(data){
	socket.emit('send', data);
}

app.use(express.static(__dirname + '/client'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

http.listen(3000, function(){
  console.log('listening on *:3000');
});


   



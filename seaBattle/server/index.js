// var express = require('express');
// var app = express();
// var http = require('http');
// // var io = require('socket.io')(3100);
// var server = http.Server(app);
var logic = require('./logic');
var express = require('express');
var app = express();
const bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Entities = require('html-entities').AllHtmlEntities;
var entities = new Entities();
var Game = require('./game.js');

var port = 8902;
var userArray = [];
var dataTable;
var playersShipCount = {};
var players;
var ArrayShip =[0,0];
app.use(express.static('./client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/postadd',function(req,res)
{	

	console.log(req.body.userNick);
	 if(userArray.length == 0){
	      	userArray.push(req.body.userNick);
	       	res.status(200).send({success : true});
	   }

	   else {
	   
	       for(var i =0;i<userArray.length;i++){
	           if(req.body.userNick == userArray[i]){
	           		 
	               	res.status(200).send({success : false});
	               	return;
	           }
	       }
	       res.send({success : true});
	       userArray.push(req.body.userNick);
	       console.log(userArray);
	   }

});
http.listen(port, function(){
  console.log('listening on *:' + port);
});

var users = {};
var gameIdCounter = 0;

io.on('connection', function(socket){
	socket.join('waitRoom');
	
	users[socket.id] = {
		inGame:null,
		player:null,
		table : null
	};
	joinWaitingPlayers();
	socket.on('shipValidate',function(data)
	{

		
		if(logic.validateTable(data)){
			
		       dataTable=data;
		       users[socket.id].table = data;

		}
		else
		{///////////////dzel heto
			
				users[socket.id].table = data;
		}


	});
	
	socket.on('Shoot',function(data)
	{	console.log('shoot');
		
		var game1 = users[socket.id].inGame;
		var opponentId = socket.id == game1.plOne ? game1.plTwo :game1.plOne;
		var dataOther = users[opponentId].table;
		var k = socket.id == game1.plOne ? 0:1;
		var  result = logic.hitResult(data.i,data.j, dataOther, ArrayShip,k);
		console.log(result);
		socket.emit('Sockettest',"Helo");
		if(result === "You win")
		{

			io.to(socket.id).emit("gameOver",result);
			socket.broadcast.to('game' +users[socket.id].inGame.id).emit('gameOver', 'You lost');

		}
		socket.emit('CheckFire',result);

		socket.broadcast.to(opponentId).emit('enemyFire', result);
	});
	

	//socket.emit('Sockettest',"Helo");

	
		
	});




	



/**
 * Create games for players in waiting room
 */
function joinWaitingPlayers() {
	 players = getClientsInRoom('waitRoom');
	
	if(players.length >= 2) {
	  // 2 player waiting. Create new game!
	  var game = new Game(gameIdCounter++, players[0].id, players[1].id);
  		console.log(game);
	  // create new room for this game
	  players[0].leave('waitRoom');
	  players[1].leave('waitRoom');
	  players[0].join('game' + game.id);
	  players[1].join('game' + game.id);
  
	  users[players[0].id].player = 0;
	  users[players[1].id].player = 1;
	  users[players[0].id].inGame = game;
	  users[players[1].id].inGame = game;
	  
	  io.to('game' + game.id).emit('join', game.id);
  
	  // send initial ship placements
	  // io.to(players[0].id).emit('update', game.getGameState(0, 0));
	  // io.to(players[1].id).emit('update', game.getGameState(1, 1));
  
	  console.log((new Date().toISOString()) + " " + players[0].id + " and " + players[1].id + " have joined game ID " + game.id);
	}
  }

function getClientsInRoom(room) {
  var clients = [];
  for (var id in io.sockets.adapter.rooms[room]) {
    clients.push(io.sockets.adapter.nsp.connected[id]);
  }
  return clients;
}

function leaveRoom(room,player1,player2){
	player1.leave(room);
	player2.leave(room);
}

function connectToRoom(room,player1,player2) {
	player1.join(room);
	player2.join(room);
};

 var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/',function(req,res)
{
    res.sendFile(__dirname+
        '/index.html');

});

io.on('connection',(socket)=>
{
    console.log("user connected");
    socket.on('chat message',function(msg){
        io.emit('chat message',msg);
    });
    
    socket.on('disconnect',function()
    {
        console.log('user disconected');
    })

    socket.on('chat message',function(msg)
    {
        console.log('massage : ' + msg);
    })
});

http.listen(3001,function()
{
    console.log("Server Started And Listens to port: 3000");
});
// var net = require('net');
// var http = require('http').Server(server);
// var server=net.createServer(socket=>{
//     socket.write("Disconected");
// });

// server.listen(5000);

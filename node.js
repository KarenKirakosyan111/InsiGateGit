const express = require('express')
const app = express();
const bodyParser = require('body-parser');
var device = require('./supporteddevices');
const fs = require('fs')

app.use(express.static('./firstangujs'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/supporteddevices', function(req, res) {
    res.status(200).json(device);
})

app.get('/device/:id', function(req, res) {
    // res.send({})
})

app.post('/postadd', function(req, res) {
    var json = device;
    json.push(req.body);
    fs.writeFile("./supporteddevices.json", JSON.stringify(json));
    device = require('./supporteddevices');
    res.send({})
})

app.put('/editdev', function(req, res) {
	var json = device;
    json[req.body.index] = req.body.object;
    fs.writeFile("./supporteddevices.json", JSON.stringify(json));
    device = require('./supporteddevices');
    res.send({})
})

app.delete('/deletedev', function(req, res) {
	console.log(req.body.index, "index = ")
	var json = device;
    json.splice(req.body.index, 1);
    fs.writeFile("./supporteddevices.json", JSON.stringify(json));
    device = require('./supporteddevices');
    res.send({})
})

app.listen(8080, function() {
    console.log('Example app listening on port 3000!')
})
var express = require('express')
var path = require('path')
var app = express()

app.use(express.static(path.join(__dirname, '/')));

app.get('/', function(req, res) {
	res.sendfile('main1.html');
});

var server = app.listen(8000);
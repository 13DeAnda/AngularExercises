var express = require('express')
var path = require('path')
var app = express()

app.use(express.static(path.join(__dirname, '/')));

app.get('/', function(req, res) {
    res.sendfile('main.html');
});

var server = app.listen(8000);
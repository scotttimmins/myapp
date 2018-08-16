port = process.env.PORT;

var express = require('express');
var app = express();
app.get('/', function (req, res) {
    res.send('Hello JJ Frijoles Beans!');
});
app.listen(port, function () {
    console.log('Example app listening on port' + port);
});

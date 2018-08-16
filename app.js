port = process.env.PORT;

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.send(/dashboard.html);
});

app.listen(port, function () {
    console.log('Example app listening on port' + port);
});

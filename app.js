port = process.env.PORT;

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

/*app.get('/hello', function (req, res) {
    res.send("hej!");
});*/

app.listen(port, function () {
    console.log('Example app listening on port' + port);
});

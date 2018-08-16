port = process.env.PORT;

var express = require('express');
var app = express();
app.get('/hello', function (req, res) {
    res.send('Hello JJ Frijoles Beans!');
});
app.get('/goodbye', function (req, res) {
    res.send('Ciao banana!');
});
app.listen(port, function () {
    console.log('Example app listening on port' + port);
});

port = process.env.PORT;

var express = require('express');
var app = express();

/*
const express = require('express');
*/
var exphbs = require('express-handlebars');
/*
const app = express();
*/


// Register Handlebars view engine
app.engine('handlebars', exphbs());
// Use Handlebars view engine
app.set('view engine', 'handlebars');



app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('dashboard');
});

app.listen(port, function () {
    console.log('Example app listening on port' + port);
});

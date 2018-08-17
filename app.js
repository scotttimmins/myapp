port = process.env.PORT;

var express = require('express');
var exphbs = require('express-handlebars');
var app = express();


// Register Handlebars view engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
// Use Handlebars view engine
app.set('view engine', 'handlebars');



/**/app.use(express.static(__dirname + '/views'));

app.get('/', (req, res) => {
    res.render('dashboard');
});

app.listen(port, function () {
    console.log('Example app listening on port' + port);
});

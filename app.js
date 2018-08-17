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
    res.render('dashboard', {name: 'Bex', bex_monzo: '52.06', peet_monzo: '66.43', bex_firstdirect: '150.23', peet_lloyds: '9,998.12', bex_barclaycard: '-500', peet_mbna1: '-9,786.99'});
});

app.listen(port, function () {
    console.log('Example app listening on port' + port);
});

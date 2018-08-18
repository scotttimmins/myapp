port = process.env.PORT;

const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
passport = require('passport'),
    auth = require('./auth');

auth(passport);
app.use(passport.initialize());

// Register Handlebars view engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
// Use Handlebars view engine
app.set('view engine', 'handlebars');


/*
app.use(express.static(__dirname + '/public'));
*/



app.get('/', (req, res) => {
    res.json({
        status: 'session cookie not set'
    });
});


app.get('/auth/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/'
    }), (req, res) => {
        res.render('dashboard', {name: 'Bex', bex_monzo: '52.06', peet_monzo: '66.43', bex_firstdirect: '150.23', peet_lloyds: '9,998.12', bex_barclaycard: '-500', peet_mbna1: '-9,786.99'});
    }
);




/*
app.get('/', (req, res) => {
    res.render('index',);
});
*/

/*
app.get('/dashboard', (req, res) => {
    res.render('dashboard', {name: 'Bex', bex_monzo: '52.06', peet_monzo: '66.43', bex_firstdirect: '150.23', peet_lloyds: '9,998.12', bex_barclaycard: '-500', peet_mbna1: '-9,786.99'});
});
*/

app.listen(port, function () {
    console.log('Example app listening on port' + port);
});

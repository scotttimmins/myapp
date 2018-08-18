port = process.env.PORT;

const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const passport = require('passport');
const auth = require('./auth');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

app.use(cookieSession({
    name: 'session',
    keys: ['123']
}));
app.use(cookieParser());


auth(passport);
app.use(passport.initialize());

// Register Handlebars view engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
// Use Handlebars view engine
app.set('view engine', 'handlebars');


/*
server.use(express.static(__dirname + '/public'));
*/



app.get('/', (req, res) => {
    if (req.session.token) {
        res.cookie('token', req.session.token);
        res.json({
            status: 'session cookie set'
        });
    } else {
        res.cookie('token', '')
        res.json({
            status: 'session cookie not set'
        });
    }
});


app.get('/auth/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));
app.get('/auth/google/callback',
    passport.authenticate('google', {failureRedirect:'/public'}),
    (req, res) => {
        req.session.token = req.user.token;
        res.redirect('dashboard', {name: 'Bex', bex_monzo: '52.06', peet_monzo: '66.43', bex_firstdirect: '150.23', peet_lloyds: '9,998.12', bex_barclaycard: '-500', peet_mbna1: '-9,786.99'});
    }
);


app.get('/logout', (req, res) => {
    req.logout();
    req.session = null;
    res.redirect('/public');
});

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
    console.log('Example server listening on port' + port);
});

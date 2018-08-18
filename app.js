port = process.env.PORT;
sessionKey = process.env.SESSION_KEY

const express = require('express');
const exphbs = require('express-handlebars');
var session  = require('express-session');
var cors = require('cors');


const app = express();
const passport = require('passport');
const uuid = require('uuid/v4')
const auth = require('./auth');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

app.use(express.static(__dirname + '/public'));
app.use(cors());

app.use(cookieParser(sessionKey));
app.use(cookieSession({
    name: 'session',
    keys: [sessionKey]  // key to sign/verify cookies
}));

app.use(session({
    genid: (req) => {
        console.log('Inside the session middleware')
        console.log(req.sessionID)
        return uuid() // use UUIDs for session IDs
    },
    secret: sessionKey,
    resave: true,
    saveUninitialized: true
}))



auth(passport);
app.use(passport.initialize());
// app.use(passport.session());

// Register Handlebars view engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
// Use Handlebars view engine
app.set('view engine', 'handlebars');



function setSessionCookie(req, res) {
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
}



app.get('/auth/google', passport.authenticate('google', {
     scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));


app.post('/login', passport.authenticate('google', { successRedirect: '/',
    failureRedirect: '/login' }));


app.get('/auth/google/callback',
    passport.authenticate('google', {failureRedirect:'/login'
    }),
    (req, res) => {
        req.session.token = req.user.token;
        console.log("Google callback called, redirecting to dashboard"+ req.session.token);
        res.redirect('dashboard', {name: 'Bex', bex_monzo: '52.06', peet_monzo: '66.43', bex_firstdirect: '150.23', peet_lloyds: '9,998.12', bex_barclaycard: '-500', peet_mbna1: '-9,786.99'});
    }
);


app.get('/logout', (req, res) => {
    req.logout();
    req.session = null;
    res.redirect('/public');
});


//
// function ensureAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//         console.log("Is authenticated, going to render dashboard");
//         return next();
//     }
//     res.redirect('/login.html')
// }


app.get('/' , (req, res) => {
    console.log("in get(/)");
    console.log("Request: " +req.isAuthenticated())
    if (!req.isAuthenticated()) {
        console.log("redirecting to logon page");
        return res.redirect('/login.html')
    }
    console.log("About to render dashboard");
    res.render('dashboard', {name: 'Bex', bex_monzo: '52.06', peet_monzo: '66.43', bex_firstdirect: '150.23', peet_lloyds: '9,998.12', bex_barclaycard: '-500', peet_mbna1: '-9,786.99'});
});


app.listen(port, function () {
    console.log('Example server listening on port' + port);
});

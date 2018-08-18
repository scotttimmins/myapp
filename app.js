port = process.env.PORT;

const express = require('express');
const exphbs = require('express-handlebars');
const app = express();


// Register Handlebars view engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
// Use Handlebars view engine
app.set('view engine', 'handlebars');


app.use(express.static(__dirname + '/public'));



const GoogleStrategy = require('passport-google-    oauth').OAuth2Strategy;
module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
        clientID: 797266126678-p55b4276r50bgjv8cb3q3k3tv70f89s3.apps.googleusercontent.com,
        clientSecret: HPcpFZSyBeS3I11B8vprwLxc,
        callbackURL: https://my-money-dashboard.herokuapp.com/dashboard
},
    (token, refreshToken, profile, done) => {
        return done(null, {
            profile: profile,
            token: token
        });
    }));
};



app.get('/', (req, res) => {
    res.render('index',);
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard', {name: 'Bex', bex_monzo: '52.06', peet_monzo: '66.43', bex_firstdirect: '150.23', peet_lloyds: '9,998.12', bex_barclaycard: '-500', peet_mbna1: '-9,786.99'});
});

app.listen(port, function () {
    console.log('Example app listening on port' + port);
});

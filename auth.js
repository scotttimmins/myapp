client_ID = process.env.CLIENT_ID;
client_Secret = process.env.CLIENT_SECRET;

console.log('read in client_ID ' +client_ID)


const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        console.log('Serialising user'+user);
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        console.log('Deserialising user');
        done(null, user);
    });
    passport.use(new GoogleStrategy({
            clientID: client_ID,
            clientSecret: client_Secret,
            callbackURL: 'https://my-money-dashboard.herokuapp.com/auth/google/callback',
        },
        (token, refreshToken, profile, done) => {
        console.log("Authenticated USer:"+ token);
            return done(null, {
                profile: profile,
                token: token
            });
        }));
};

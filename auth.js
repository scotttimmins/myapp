client_ID = process.env.CLIENT_ID;
client_Secret = process.env.CLIENT_SECRET;

console.log('read in client_ID ' +client_ID)


const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
            clientID: client_ID,
            clientSecret: client_Secret,
            callbackURL: '/dashboard',
        },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));
};

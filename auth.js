const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
            clientID: '797266126678-p55b4276r50bgjv8cb3q3k3tv70f89s3.apps.googleusercontent.com',
            clientSecret: 'HPcpFZSyBeS3I11B8vprwLxc',
            callbackURL: '/dashboard',
        },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));
};

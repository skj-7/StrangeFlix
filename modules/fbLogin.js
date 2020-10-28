const facebook = require('express').Router();
const passport = require('passport');
const { getMaxListeners } = require('process');
const FacebookStrategy = require('passport-facebook').Strategy;

facebook.get('/error', (req, res) => res.send("error logging in"));

facebook.use(passport.initialize());
var userProfile;

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});


passport.use(new FacebookStrategy({
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/fbLogin/callback"
},
    function (accessToken, refreshToken, profile, done) {
        userProfile = profile;
        return done(null, profile);
    }
));

facebook.get('/', passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
}));

facebook.get('/callback',
    passport.authenticate('facebook', { failureRedirect: '/fblogin/error' }),
    function (req, res) {

        //Add this to database & session
        var userData = { 'name': userProfile.displayName, 'id': userProfile.id };


        // Successful authentication, redirect home.
        res.redirect('/home');
    });





module.exports = facebook;
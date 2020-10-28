const google = require('express').Router();
const { getMaxListeners } = require('process');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

google.get('/error', (req, res) => res.send("error logging in"));

google.use(passport.initialize());
var userProfile;

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/googleLogin/callback"
},
  function (accessToken, refreshToken, profile, done) {
    userProfile = profile;
    return done(null, userProfile);
  }
));

google.get('/',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

google.get('/callback',
  passport.authenticate('google', { failureRedirect: '/googleLogin/error' }),
  function (req, res) {

    //Add this to database & session
    var userData = { 'name': userProfile.displayName, 'email': userProfile.emails[0].value };

    // Successful authentication, redirect home.
    res.redirect('/home');
  });



module.exports = google;
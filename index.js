'use strict';

require('dotenv').config();
const express = require('express');
var bodyParser = require('body-parser');
const fs=require("fs")
const path=require("path")
const app = express();

//Google Login
const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, SESSION_SECRET } =  process.env;
const port = process.env.PORT || 27017;
passport.use(new Strategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: '/return'
},
(accessToken, refreshToken, profile, cb) => {
  return cb(null, profile);
}));

passport.serializeUser((user, cb) => {
cb(null, user);
});

passport.deserializeUser((obj, cb) => {
cb(null, obj);
});
app.use(require('express-session')({ secret: SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());



//FaceBook Login
var strategy=require('passport-facebook');
const FacebookStrategy = strategy.Strategy;
const { FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET, SESSION_SECRETFB } =  process.env;
passport.use(new FacebookStrategy({
  clientID: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_CLIENT_SECRET,
  callbackURL: '/return'
},
(accessToken, refreshToken, profile, cb) => {
  return cb(null, profile);
}));

passport.serializeUser((user, cb) => {
cb(null, user);
});

passport.deserializeUser((obj, cb) => {
cb(null, obj);
});




var mongoose = require('mongoose');
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'))
app.use("/static",express.static('static')) ;
app.set("view engine", "ejs");
const hostname = 'localhost';
mongoose.connect('mongodb://localhost:27017/StrangeFlix', {useNewUrlParser: true,useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DB connected');
});


//Router

const mainRouter = require("./modules/router");
app.use("/", mainRouter);
app.listen(port, () => {
	console.log("Server Started!");
})
const google = require('express').Router();
const { getMaxListeners } = require('process');
const passport = require('passport');
const userdata = require('../schemas/userData');
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

google.get('/callback', passport.authenticate('google',
{ failureRedirect: '/googleLogin/error' }), (req, res) => {

	//Add this to database & session
	var userData = { 'name': userProfile.displayName, 'email': userProfile.emails[0].value };

	userdata.findOne({ email: "google=" + userData.email }, (err, data) => {
		if (err)
			console.log(err);
		else if (data == null) {
			var data = { fName: userData.name, lName: "__", email: "google=" + userData.email, age: 18, password: "googlepass", isVerified: true, "cart.totalCount": 0, "cart.totalPrice": 0 };
			var mydata = new userdata(data);
			mydata.save(function (err) {
				if (err)
					return console.error(err);

				req.session.user_id = mydata._id;
				req.session.data = {
					email: mydata.email
				};

				// Successful authentication, redirect home.
				res.redirect('/home');
			});
		}
		else {
			req.session.user_id = data._id;
			req.session.data = {
				email: data.email
			};

			// Successful authentication, redirect home.
			res.redirect('/home');
		}
	})
});

module.exports = google;
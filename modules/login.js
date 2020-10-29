const routerLogin = require('express').Router();
var bcrypt = require("bcrypt");
const forgotPass = require('./forgotPass');
var userdata = require('../schemas/userData');

routerLogin.get('/', (req, res) => {
	if (req.session.user_id) {
		res.redirect('/home');
	}
	else {
		res.render('login.ejs', {
			"error": "",
			"message": ""
		});
	}
});

routerLogin.use("/forgot", forgotPass);

routerLogin.post('/',(req, res) => {
	if (req.session.user_id) {
		res.redirect('/home');
	}
    var Email = req.body.email;
    var Password = req.body.password;

    userdata.findOne({ email:Email }, (err, user) => {
		if (err) {
			console.log(err);
			res.render('error.ejs', {
				"error": err,
				"message": ""
			});
			return;
		}
		else{
			console.log(user);
			if (user == null) {
				res.render('login.ejs', {
					"error": 'The email address ' + Email + ' is not associated with any account. Double-check your email address and try again.',
					"message": ""
				});
				return;
			}
			else if(user != null)
			{
				bcrypt.compare(Password, user.password, (error, isPasswordVerify) => {
					if (error)
						return console.error(error);

					if (!isPasswordVerify) {
						res.render('login.ejs', {
							"error": 'Invalid email or password',
							"message": ""
						});
						return;
					}

					// Checking if email is verified
					if (!user.isVerified) {
						res.render('login.ejs', {
							"error": 'E-mail ID not verified! Check your mailbox and try again.',
							"message": ""
						});
						return;
					}
					else {
						req.session.user_id = user._id;
						req.session.data = {
							subCode: user.subscriptionCode,
							email: user.email,
							message: null
						};
						res.redirect('/home');
					}
				});
			}
      	}
    })
})

module.exports = routerLogin;
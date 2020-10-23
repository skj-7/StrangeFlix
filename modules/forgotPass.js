const forgotPass = require('express').Router();

var crypto = require('crypto');
var nodemailer = require('nodemailer');
var bcrypt = require("bcrypt");

const passtoken = require('../schemas/resetPassToken');
const userdata = require('../schemas/userData');

require('dotenv').config();

forgotPass.get('/', (req, res) => {
	if (req.session.user_id) {
		res.redirect('/home');
	}
	else {
		res.render('forgotPassword.ejs', {
			"error": "",
			"message": ""
		});
	}
});

forgotPass.post('/', (req, res) => {
	var Email = req.body.email;
	
	userdata.findOne({ email: Email }, (err, user) => {
		if (err) {
			console.log(err);
			res.render('error.ejs', {
				"error": "",
				"message": err
			});
			return;
		}
		else if (user == null) {
			res.render('forgotPassword.ejs', {
				"error": "We were unable to find a user with that email. Please try again!",
				"message": ""
			});
			return;
		}
		else if (user.isVerified == false) {
			res.render('forgotPassword.ejs', {
				"error": "",
				"message": "This Email-ID has not been verified yet. Check mailbox and verify to reset password."
			});
			return;
		}

		//Mail Verification
		var token = new passtoken({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

		// Save the verification token
		token.save(function (err) {
			if (err)
				return console.error(err);
		});

		// Send the email
		var transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: process.env.TOKEN_MAIL, pass: process.env.TOKEN_PASS } });
		var mailOptions = {
			from: process.env.TOKEN_MAIL,
			to: Email,
			subject: 'Reset StrangeFlix Password',
			text: 'Hey,\n\n' + 'Please click the below link to reset your password: \nhttp:\/\/' + req.headers.host + '\/verification\/passreset\/' + token.token + '\n\nThe link is valid for next 5 minutes only.\n\nRegards,\nStrangeFlix\n\nKeep Flixing! :)'
		};
		transporter.sendMail(mailOptions, function (err) {
			if (err) {
				console.error(err);
				res.render('error.ejs', {
					"error": "",
					"message": err
				});
			}
			res.render('forgotPassword.ejs', {
				"error": "",
				"message": "A reset email has been sent. Check your mailbox to reset password."
			});
		});
	});
});

forgotPass.post('/passreset/:userID', (req, res) => {
	var userid = req.params.userID;
	var newpass = req.body.password;

	userdata.findOne({ _id: userid }, (err, user) => {
		if (err)
			console.log(err);
		else if (!user) {
			res.render('error.ejs', {
				"error": "",
				"message": "We were unable to find a valid user. Please try again!"
			});
			return;
		}

		bcrypt.hash(newpass, 10, (err, hash) => {
			if (err) {
				console.log(err);
				return;
			}
			// Now we can store the password hash in db.
			user.password = hash;
			user.save(function (err) {
				if (err) {
					console.log(err);
					res.render('error.ejs', {
						"error": "",
						"message": "Unable to verify. Please try later."
					});
					return;
				}

				res.render('login.ejs', {
					"error": "",
					"message": "Your password has been reset successfully. Please log in."
				});
				return;
			})
		});
	});
});

module.exports = forgotPass;
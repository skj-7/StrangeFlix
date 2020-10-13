const resendToken = require('express').Router();
var mongoose = require('mongoose');

var userdata = mongoose.model('user');
var usertoken = mongoose.model('token');
// const usertoken = require('../schemas/token');
// const userdata = require('../schemas/userData');

require('dotenv').config();

resendToken.get('/', (req, res) => {
	if (req.session.user_id) {
		res.render('Flexing.ejs');
	}
	else {
		res.render('reVerify.ejs', {
			"error": "",
			"message": ""
		});
	}
});

resendToken.post('/', (req, res) => {
	var Email = req.body.email;
	if (Email == "") {
		res.status(200).render('reVerify.ejs', {
			"error": "Fill all the fields below",
			"message": ""
		});
		return;
	}
	userdata.findOne({ email: Email }, (err, user) => {
		if (err) {
			console.log(err);
			res.status(200).render('error.ejs', {
				"error": "",
				"message": err
			});
			return;
		}
		else if (!user) {
			res.status(200).render('reVerify.ejs', {
				"error": "We were unable to find a user with that email. Please try again!",
				"message": ""
			});
			return;
		}
		else if (user.isVerified) {
			res.status(200).render('reVerify.ejs', {
				"error": "",
				"message": "This account has already been verified. Please log in."
			});
			return;
		}

		//Mail Verification
		var token = new usertoken({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

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
			subject: 'Account Verification Token',
			text: 'Hey ' + data.fName + ',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '\n\nThe link is valid for next 5 minutes only.\n\nRegards,\nStrangeFlix\n\nKeep Flixing! :)'
		};
		transporter.sendMail(mailOptions, function (err) {
			if (err) {
				console.error(err);
				res.status(200).render('error.ejs', {
					"error": "",
					"message": err
				});
			}
			res.status(200).render('reVerify.ejs', {
				"error": "",
				"message": "A verification email has been sent."
			});
		});
	});
});

module.exports = resendToken;
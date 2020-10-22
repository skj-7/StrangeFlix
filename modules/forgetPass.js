const forgetPass = require('express').Router();

const usertoken = require('../schemas/emailVerToken');
const userdata = require('../schemas/userData');

require('dotenv').config();

forgetPass.get('/', (req, res) => {
	if (req.session.user_id) {
		res.redirect('/home');
	}
	else {
		res.render('reVerify.ejs', {
			"error": "",
			"message": ""
		});
	}
});

forgetPass.post('/', (req, res) => {
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
			res.render('reVerify.ejs', {
				"error": "We were unable to find a user with that email. Please try again!",
				"message": ""
			});
			return;
		}
		else if (user.isVerified == false) {
			res.render('reVerify.ejs', {
				"error": "",
				"message": "This emailID has not been verified. Check mailbox and verify to reset password."
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
			subject: 'Reset StrangeFlix Password',
			text: 'Hey ' + data.fName + ',\n\n' + 'Please click the below link to reset your password: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '\n\nThe link is valid for next 5 minutes only.\n\nRegards,\nStrangeFlix\n\nKeep Flixing! :)'
		};
		transporter.sendMail(mailOptions, function (err) {
			if (err) {
				console.error(err);
				res.render('error.ejs', {
					"error": "",
					"message": err
				});
			}
			res.render('reVerify.ejs', {
				"error": "",
				"message": "A reset email has been sent. Check your mailbox to reset password."
			});
		});
	});
});

module.exports = forgetPass;
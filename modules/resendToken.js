const resendToken = require('express').Router();
var mongoose = require('mongoose');

var userdata = mongoose.model('user');
var usertoken = mongoose.model('token');
// const usertoken = require('../schemas/token');
// const userdata = require('../schemas/userData');

resendToken.get('/', (req, res) => {
	res.status(200).render('reVerify.ejs', {
		"error": "",
		"message": ""
	});
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
		var transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: 'strangeflix01@gmail.com', pass: 'Strangeflix@01' } });
		var mailOptions = { from: 'strangeflix01@gmail.com', to: Email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '\n' };
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
















exports.resendTokenPost = function (req, res, next) {
	req.assert('email', 'Email is not valid').isEmail();
	req.assert('email', 'Email cannot be blank').notEmpty();
	req.sanitize('email').normalizeEmail({ remove_dots: false });

	// Check for validation errors    
	var errors = req.validationErrors();
	if (errors) return res.status(400).send(errors);

	User.findOne({ email: req.body.email }, function (err, user) {
		if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
		if (user.isVerified) return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });

		// Create a verification token, save it, and send email
		var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

		// Save the token
		token.save(function (err) {
			if (err) { return res.status(500).send({ msg: err.message }); }

			// Send the email
			var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
			var mailOptions = { from: 'no-reply@codemoto.io', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
			transporter.sendMail(mailOptions, function (err) {
				if (err) { return res.status(500).send({ msg: err.message }); }
				res.status(200).send('A verification email has been sent to ' + user.email + '.');
			});
		});

	});
};
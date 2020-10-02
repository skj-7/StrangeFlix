const register = require('express').Router();

var validator = require("email-validator");
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var mongoose = require('mongoose');
const { getMaxListeners } = require('process');

const usertoken = require('../schemas/token');
const userdata = require('../schemas/userData');

register.get('/', (req, res) => {
	res.status(200).render('register.ejs', {
		"error": "",
		"message": ""
	});
})

register.post('/', (req, res) => {
	var fname = req.body.fName;
	var lname = req.body.lName;
	var Email = req.body.email;
	var password = req.body.password;
	if (fname == "" || lname == "" || Email == "" || password == "") {
		res.status(200).render('register.ejs', {
			"error": "Fill all the fields below",
			"message": ""
		});
		return;
	}
	if (validator.validate(Email) == false) {
		res.status(200).render('register.ejs', {
		"error": "Email is invalid",
		"message": ""
		});
		return;
	}

	userdata.findOne({ email: Email }, (err, data) => {
		if (err)
			console.log(err);
		else if (data != null) {
			res.status(200).render('register.ejs', {
				"error": 'The email address you have entered is already associated with another account.',
				"message": ""
			});
		}
		else {
			//Saving Data
			var data = {fName: fname, lName: lname, email: Email, password: password };
			var mydata = new userdata(data);
			mydata.save(function (err) {
				if (err)
					return console.error(err);
			})

			//Mail Verification
			var token = new usertoken({ _userId: mydata._id, token: crypto.randomBytes(16).toString('hex') });

			// Save the verification token
			token.save(function (err) {
				if (err)
					return console.error(err);
			});

			// Send the email
			var transporter = nodemailer.createTransport({ service: 'gmail', auth: { user:'strangeflix01@gmail.com', pass:'Strangeflix@01' } });
			var mailOptions = {
				from: 'strangeflix01@gmail.com',
				to: Email, subject: 'Account Verification Token',
				text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '\n\nThe link is valid for next 12 hours only.\n\nRegards,\nStrangeFlix\n\nKeep Flixing! :)'
			};
			transporter.sendMail(mailOptions, function (err) {
				if (err) {
					console.error(err);
					res.status(200).render('register.ejs', {
						"error": "Check your Email-ID",
						"message": ""
					});
				}
				res.status(200).render('register.ejs', {
					"error": "",
					"message": "A verification email has been sent."
				});
			});
		}
	});
});

module.exports = register;
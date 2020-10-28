const verification = require('express').Router();
const bodyParser = require('body-parser');
const emailtoken = require('../schemas/emailVerToken');
const passtoken = require('../schemas/resetPassToken');
require('../schemas/userData');

verification.use(bodyParser.json());

verification.get('/email/:tokenID', (req, res) => {
	// Find a matching token
	emailtoken.findOne({ token: req.params.tokenID }).populate('_userId')
	.exec( (err, token) => {
		if (err)
			console.log(err);
		else if (token == null) {
			res.render('error.ejs', {
				"error": "",
				"message": "We were unable to find a valid token. Your token may have expired."
			});
			return;
		}
		else {
			// If we found a token, accessing the populated matching user
			var user = token._userId;
			if (user.isVerified == true) {
				res.render('login.ejs', {
					"error": "",
					"message": 'This user has already been verified.'
				});
				return;
			}

			// Verify and save the user
			user.isVerified = true;
			user.save((err) => {
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
					"message": "The account has been verified. Please log in."
				});
				return;
			});
		}
	});
})

verification.get('/passreset/:tokenID', (req, res) => {
	// Find a matching token
	passtoken.findOne({ token: req.params.tokenID }).populate('_userId')
	.exec( (err, token) => {
		if (err)
			console.log(err);
		else if (token == null) {
			res.render('error.ejs', {
				"error": "",
				"message": "We were unable to find a valid token. Your token may have expired."
			});
			return;
		}
		else {
			// If we found a token, accessing the populated matching user
			res.render('changePassword.ejs', {
				"error": "",
				"message": "",
				"id": token._userId._id
			});
		}
	});
})

module.exports = verification;
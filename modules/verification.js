const verification = require('express').Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const usertoken = require('../schemas/token');
const userdata = require('../schemas/userData');

verification.use(bodyParser.json());

verification.get('/:tokenID', (req, res) => {
	// Find a matching token
	usertoken.findOne({ token: req.params.tokenID }, (err, token) => {
		if (err)
			console.log(err);
		else if (token == null) {
			res.status(200).render('error.ejs', {
				"error": "",
				"message": "We were unable to find a valid token. Your token may have expired."
			});
			return;
		}
		else {
			// If we found a token, find a matching user
			userdata.findOne({ _id: token._userId }, (err, user) => {
				if (err)
					console.log(err);
				else if (!user) {
					res.status(200).render('error.ejs', {
						"error": "",
						"message": "We were unable to find a user for this token. Please try again!"
					});
					return;
				}
				else if (user.isVerified) {
					res.status(200).render('login.ejs', {
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
						res.status(200).render('error.ejs', {
							"error": "",
							"message": "Unable to verify. Please try later."
						});
						return;
					}
					
					res.status(200).render('login.ejs', {
						"error": "",
						"message": "The account has been verified. Please log in."
					});
					return;
				});
			});
		}
	});
	
})

module.exports = verification;
const adminsetting = require('express').Router();
var bcrypt = require("bcrypt");
const userdata = require('../../schemas/userData');

adminsetting.get('/', (req, res) => {
	res.render('adminsettings.ejs', {
		"error": "",
		"message": ""
	});
})

adminsetting.post('/', (req, res) => {
	var oldPIN = req.body.old_pin;
	var newPIN = req.body.new_pin;
	var confirmPIN = req.body.confirm_pin;

	if (newPIN != confirmPIN) {
		res.render('adminsettings.ejs', {
			"error": "New PIN and Confirm PIN should be same. Retry",
			"message": ""
		});
		return;
	}

	userdata.findOne({ "email": "admin" }, (err, data) => {
		if (err) {
			return console.error(err);
		}
		bcrypt.compare(oldPIN, data.password, (error, isPinCorrect) => {
			if (error) {
				console.error(error);
				res.render('error.ejs', {
					"error": "Unknown Error!!",
					"message": "Check console at server.."
				});
				return;
			}

			if (!isPinCorrect) {
				res.render('adminsettings.ejs', {
					"error": "Incorrect Old PIN. Please retry.",
					"message": ""
				});
				return;
			}
			else {
				bcrypt.hash(newPIN, 10, (err, hash) => {
					if (err) {
						console.log(err);
						return;
					}
					data.password = hash;
					data.save((err) => {
						if (err) {
							console.log(err);
							res.render('error.ejs', {
								"error": err,
								"message": "Unable to update password. Please try later."
							});
							return;
						}

						res.render('adminsettings.ejs', {
							"error": "",
							"message": "PIN updated successfully!"
						});
						return;
					});
				});
			}
		});
	});
})

module.exports = adminsetting;
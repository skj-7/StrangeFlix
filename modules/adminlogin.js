const adminlogin = require('express').Router();
var bcrypt = require("bcrypt");
const userdata = require('../schemas/userData');

adminlogin.get('/', (req, res) => {
	if (req.session.admin) {
		res.redirect('/admin/control');
	}
	else {
		res.render('adminlogin.ejs', {
			"error": "",
			"message": ""
		});
	}
})

adminlogin.post('/', (req, res) => {
	userdata.findOne({ email: "admin" }, (err, data) => {
		if(err) {
			res.render('error.ejs', {
				"error": "Create ADMIN account manually to log in...",
				"message": ""
			});
			return;
		}
		const pin = req.body.pin;
		const adminpin = data.password;
		bcrypt.compare(pin, adminpin, (error, isPinVerify) => {
			if(error) {
				console.error(error);
				res.render('error.ejs', {
					"error": "Unknown Error!!",
					"message": "Check console at server.."
				});
				return;
			}

			if (!isPinVerify) {
				res.render('adminlogin.ejs', {
					"error": "Invalid PIN",
					"message": ""
				});
			}
			else {
				req.session.admin = "Authenticated";
				res.redirect('/admin/control');
			}
		});
	});
})

module.exports = adminlogin;
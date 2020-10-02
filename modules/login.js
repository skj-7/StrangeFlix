const routerLogin = require('express').Router();
var mongoose = require('mongoose');
var userdata = mongoose.model('user');

routerLogin.get('/', (req, res) => {
	res.status(200).render('login.ejs', {
		"error": "",
		"message": ""
	});
});

routerLogin.post('/',(req,res) => {
    var Email = req.body.email;
    var Password = req.body.password;
    if (Email == "" || Password == "") {
		res.status(200).render('login.ejs', {
			"error": "Fill all the fields below",
			"message": ""
		});
		return;
    }
    userdata.findOne({ email:Email }, (err, data) => {
		if (err)
			console.log(err);
		else{
			console.log(data);
			if (data == null) {
				res.status(200).render('login.ejs', {
					"error": 'The email address ' + Email + ' is not associated with any account. Double-check your email address and try again.',
					"message": ""
				});
				return;
			}
			else if(data != null)
			{
				if (data.password != Password) {
					res.status(200).render('login.ejs', {
						"error": 'Invalid email or password',
						"message": ""
					});
					return;
				}

				// Checking if email is verified
				if (!data.isVerified) {
					res.status(200).render('login.ejs', {
						"error": 'E-mail ID not verified! Check your mailbox and try again.',
						"message": ""
					});
					return;


					//Redirect a button here to resend token....


				}

				res.status(200).render('Flexing.ejs');
			}
      	}
    })
})

module.exports = routerLogin;
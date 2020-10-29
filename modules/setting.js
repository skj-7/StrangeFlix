const setting = require('express').Router();
var bcrypt = require("bcrypt");

const users = require('../schemas/userData');

setting.get('/', (req, res) => {
    if (req.session.user_id) {
        users.findById(req.session.user_id, (err, data) => {
            if (err) {
                return console.log(err);
            }
            res.render('setting.ejs', { "user": data, "message": "", "error": "" });
        });
    }
    else {
        res.redirect('/');
    }
});

setting.post('/personal', (req, res) => {
    if (req.session.user_id) {
        users.findByIdAndUpdate(req.session.user_id, req.body, (err, data) => {
            if (err) {
                return console.log(err);
            }

            users.findById(req.session.user_id, (err, data) =>{
                res.render('setting.ejs', { "user": data, "message": "User Information is  successfully updated ", "error": "" });
            });
        });
    }
    else {
        res.redirect('/');
    }
});

setting.post('/security', (req, res) => {
    const userID = req.session.user_id;

    var oldPIN = req.body.oldpass;
	var newPIN = req.body.newpass;
    var confirmPIN = req.body.confirmpass;
    
    if (newPIN != confirmPIN) {
		res.render('setting.ejs', {
            "user": userdata,
            "message": "",
            "error": "New PIN and Confirm PIN should be same. Retry"
		});
		return;
	}

	if (userID) {
		users.findById(userID, (error, userdata) => {
            if (error) {
                return console.error(error);
            }

            bcrypt.compare(oldPIN, userdata.password, (error, isPinCorrect) => {
                if (error) {
                    console.error(error);
                    res.render('error.ejs', {
                        "error": "Unknown Error!!",
                        "message": "Check console at server.."
                    });
                    return;
                }
    
                if (!isPinCorrect) {
                    res.render('setting.ejs', { 
                        "user": userdata, 
                        "message": "", 
                        "error": "You have entered incorrect Old PIN. Please retry." 
                    });
                    return;
                }
                else {
                    bcrypt.hash(newPIN, 10, (err, hash) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        userdata.password = hash;
                        userdata.save((err) => {
                            if (err) {
                                console.log(err);
                                res.render('error.ejs', {
                                    "error": err,
                                    "message": "Unable to update password. Please try later."
                                });
                                return;
                            }
    
                            res.render('setting.ejs', {
                                "user": userdata,
                                "message": "PIN updated successfully!",
                                "error": ""
                            });
                            return;
                        });
                    });
                }
            });
        });
    }
    else {
        res.redirect('/login');
    }
})

module.exports = setting;
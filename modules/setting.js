const setting = require('express').Router();
const userdata = require('../schemas/userData');
setting.get('/', (req, res) => {
    if (req.session.user_id) {
        userdata.findById(req.session.user_id, (err, data) => {
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


setting.post('/changePersonal', (req, res) => {
    if (req.session.user_id) {
        userdata.findByIdAndUpdate(req.session.user_id,req.body, (err, data) => {
            if (err) {
                return console.log(err);
            }
        });
        userdata.findById(req.session.user_id, (err, data) =>{
            res.render('setting.ejs', { "user": data, "message": "User Information is  successfully updated ", "error": "" });
        });
    }
    else {
        res.redirect('/');
    }
});


module.exports = setting;
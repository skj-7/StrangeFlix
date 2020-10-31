const userRecord = require('express').Router();
const users = require('../../schemas/userData');
const bodyParser = require('body-parser');

userRecord.use(bodyParser.json());

function displayUser(msg, res) {
    users.find({ subscriptionCode: 0 }, (err, Free) => {
        if (err) {
            return console.log(err);
        }
        users.find({ subscriptionCode: 1 }, (err, Ppv) => {
            if (err) {
                return console.log(err);
            }
            users.find({ subscriptionCode: { $gt: 1 } }, (err, Premium) => {
                if (err) {
                    return console.log(err);
                }
                res.render('adminUserRecord.ejs', { "free": Free, "ppv": Ppv, "premium": Premium, "message": msg, "error": "" });
            });
        });
    });
}

userRecord.get('/', (req, res) => {
    if (req.session.admin) {
        displayUser("", res);
    }
    else
        res.redirect('/admin/login');
});

userRecord.get('/block/:ID', (req, res) => {
    if (req.session.admin) {
        users.findByIdAndUpdate(req.params.ID, { blocked: true }, (err) => {
            displayUser("User is temporarily blocked", res);
        });
    }
    else
        res.redirect('/admin/login');
});

userRecord.get('/unblock/:ID', (req, res) => {
    if (req.session.admin) {
        users.findByIdAndUpdate(req.params.ID, { blocked: false }, (err) => {
            displayUser("User is successfully unblocked", res);
        });
    }
    else
        res.redirect('/admin/login');
});

module.exports = userRecord;
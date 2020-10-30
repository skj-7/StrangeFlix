const userRecord = require('express').Router();
const users = require('../../schemas/userData');

userRecord.get('/', (req, res) => {
    if (req.session.admin) {
        users.find({subscriptionCode :0}, (err, Free) =>{
            if (err) {
				return console.log(err);
            }
            users.find({subscriptionCode :1}, (err, Ppv) =>{
                if (err) {
                    return console.log(err);
                }
                users.find({subscriptionCode : {$gt :1}}, (err, Premium) =>{
                    if (err) {
                        return console.log(err);
                    }
                    res.render('adminUserRecord.ejs',{"free":Free,"ppv":Ppv,"premium":Premium});
                });
            });
        });
    }
    else
        res.redirect('/admin/login');
});


module.exports = userRecord;
const paymentRouter = require('express').Router();
const request = require('request');
const userdata = require('../schemas/userData');
var Amount;
paymentRouter.post('/', (req, res) => {
    if (req.session.user_id) {
        userdata.findById(req.session.user_id, (err, data) => {
            if (err) {
                return console.log(err);
            }
            Amount=req.body.amount;
            var userData = { "name": data.fName+" "+data.lName, "email": data.email, "amount": req.body.amount };
            res.render('payment.ejs', { "user": userData });
        });
    }
    else {
        res.redirect('/');
    }
});

const { initializePayment, verifyPayment } = require('./pay-key')(request);


paymentRouter.post('/pay', (req, res) => {
    const form = req.body;
    form.amount *= 100;
    initializePayment(form, (error, body) => {
        if (error) {
            console.log(error);
            return res.redirect('/error')
            return;
        }
        response = JSON.parse(body);
        res.redirect(response.data.authorization_url)
    });
});

paymentRouter.get('/callback', (req, res) => {
    const ref = req.query.reference;
    verifyPayment(ref, (error, body) => {
        if (error) {
            console.log(error)
        }
        response = JSON.parse(body);

        //ADD subscription info to database........

        res.redirect('/home');
    });

});





module.exports = paymentRouter;
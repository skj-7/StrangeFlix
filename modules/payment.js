const paymentRouter = require('express').Router();
const request = require('request');

const users = require('../schemas/userData');

var Amount;
paymentRouter.post('/', (req, res) => {
    if (req.session.user_id) {
        users.findById(req.session.user_id, (err, data) => {
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
    const userID = req.session.user_id;

    verifyPayment(ref, (error, body) => {
        if (error) {
            console.log(error)
        }
        response = JSON.parse(body);

        console.log(body);
        var dataobj = JSON.parse(body)
        var amount = dataobj.data.amount;

        //Subscription info to database........
        users.findById(userID, (err, userdata) => {

            if(amount == 8900) {
                userdata.updateOne({
                    $set: { "subscriptionCode": 2 }
                }, (error, data) => {
                    req.session.data.subCode = 2;
                    res.redirect('/premium');
                })
            } else if(amount == 49900) {
                userdata.updateOne({
                    $set: { "subscriptionCode": 3 }
                }, (error, data) => {
                    req.session.data.subCode = 3;
                    res.redirect('/premium');
                })
            } else {
                var cartVideos = userdata.cart.itemsVideo;
                var cartSeries = userdata.cart.itemsSeries;

                userdata.updateOne({
                    $push: { "purchased.listSolo": { $each: cartVideos }, "purchased.listSeries": { $each: cartSeries } },
                    $set: { "subscriptionCode": 1, "cart.totalCount": 0, "cart.totalPrice": 0 , "cart.itemsVideo": [], "cart.itemsSeries": [] }
                }, (error, data) => {
                    req.session.data.subCode = 1;
                    res.redirect('/premium');
                })
            }
        })
    });
});

module.exports = paymentRouter;
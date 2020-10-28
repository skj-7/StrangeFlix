const paymentRouter = require('express').Router();
const request = require('request');

paymentRouter.post('/',(req, res)=>{
    //Add user name & email 
    //example
    var userData={"name":"Sanskar","email":"sanskar94511@gmail.com","amount":req.body.amount};
    res.render('payment.ejs',{"user":userData});
});

const {initializePayment, verifyPayment} = require('./pay-key')(request);


paymentRouter.post('/pay',(req,res)=>
{
    const form =req.body;
    form.amount *= 100;
    initializePayment(form, (error, body)=>{
        if(error)
        {
            console.log(error);
            return res.redirect('/error')
            return;
        }
        response = JSON.parse(body);
        res.redirect(response.data.authorization_url)
    });
});

paymentRouter.get('/callback',(req,res)=>
{
    const ref = req.query.reference;
    verifyPayment(ref, (error,body)=>{
        if(error)
        {
            console.log(error)
        }
        response = JSON.parse(body); 

//ADD subscription info to database........

        res.redirect('/home');   
    });    

});





module.exports = paymentRouter;
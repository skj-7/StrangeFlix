const payemntRouter = require('./payment');

const homeRouter = require('express').Router();

paymentRouter=require("./payment");

homeRouter.get('/',(req, res)=>{
    res.render('home.ejs');
});

homeRouter.post('/play',(req, res)=>{
    res.render('streaming.ejs');
});

homeRouter.get('/premium',(req, res)=>{
    res.render('premium.ejs',{"premium":"false"});
});

homeRouter.get('/search',(req, res)=>{
    res.render('search.ejs',{"results":""});
});

homeRouter.get('/cart',(req, res)=>{
    res.render('cart.ejs',{"cart":""});
});

homeRouter.get('/setting',(req, res)=>{
    res.render('setting.ejs');
});

homeRouter.use('/payment',paymentRouter);

module.exports = homeRouter;
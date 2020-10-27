const userRouter = require('express').Router();

const paymentRouter = require('./payment');

userRouter.get('/',(req, res)=>{
    res.render('home.ejs',{"series":"","video":""});
});

userRouter.post('/play',(req, res)=>{
    res.render('streaming.ejs',{"playedvideo":"" ,"selfComments":"","otherComments":"","recom":""});
});

userRouter.get('/premium',(req, res)=>{
    res.render('premium.ejs',{"premium":"false"});
});

userRouter.get('/search',(req, res)=>{
    res.render('search.ejs',{"results":""});
});

userRouter.get('/cart',(req, res)=>{
    res.render('cart.ejs',{"cartVideo":"","totalPrice":0,"totalCount":0});
});

userRouter.get('/setting',(req, res)=>{
    res.render('setting.ejs');
});

userRouter.use('/payment', paymentRouter);

module.exports = userRouter;
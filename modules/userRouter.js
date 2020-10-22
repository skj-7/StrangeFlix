const userRouter = require('express').Router();

const paymentRouter = require('./payment');

userRouter.get('/',(req, res)=>{
    res.render('home.ejs');
});

userRouter.post('/play',(req, res)=>{
    res.render('streaming.ejs');
});

userRouter.get('/premium',(req, res)=>{
    res.render('premium.ejs',{"premium":"false"});
});

userRouter.get('/search',(req, res)=>{
    res.render('search.ejs',{"results":""});
});

userRouter.get('/cart',(req, res)=>{
    res.render('cart.ejs',{"cart":""});
});

userRouter.get('/setting',(req, res)=>{
    res.render('setting.ejs');
});

userRouter.use('/payment', paymentRouter);

module.exports = userRouter;
const userRouter = require('express').Router();

const home = require('./home');
const cart = require('./cartHandler');
const payment = require('./payment');

userRouter.use("/home", home);

userRouter.get('/aboutUs',(req, res) => {
    res.render('aboutUs.ejs');
});

userRouter.use('/payment', payment);

userRouter.post('/play',(req, res)=>{
    res.render('streaming.ejs',{"message": "","error":"","playedvideo":"" ,"selfComments":"","otherComments":"","recom":""});
});

userRouter.get('/premium',(req, res)=>{
    res.render('premium.ejs',{"premium":"false","message": "","error":""});
});

userRouter.get('/search',(req, res)=>{
    res.render('search.ejs',{"results":"","message": "","error":""});
});

userRouter.use('/cart', cart);

userRouter.get('/setting',(req, res)=>{
    res.render('setting.ejs',{"message": "","error":""});
});

module.exports = userRouter;
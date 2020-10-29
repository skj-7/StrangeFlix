const userRouter = require('express').Router();

const home = require('./home');
const stream = require('./streaming');
const favourite = require('./favourite');
const payment = require('./payment');
const cart = require('./cartHandler');

userRouter.get('/', (req, res) => {
    if (req.session.user_id)
        res.redirect('/home');
    else
        res.render('index.ejs');
})

userRouter.use("/home", home);

userRouter.use('/watch', stream);

userRouter.use('/fav', favourite);

userRouter.get('/aboutUs',(req, res) => {
    res.render('aboutUs.ejs');
});

userRouter.use('/payment', payment);

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

userRouter.get('/purchased',(req, res)=>{
    res.render('purchased.ejs',{"subs":1,"series":"","video":""});
});

module.exports = userRouter;
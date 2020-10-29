const userRouter = require('express').Router();

const home = require('./home');
const stream = require('./streaming');
const favourite = require('./favourite');
const payment = require('./payment');
const purchased = require('./purchased');
const cart = require('./cartHandler');
const setting = require('./setting');

userRouter.get('/', (req, res) => {
    if (req.session.user_id)
        res.redirect('/home');
    else
        res.render('index.ejs');
})

userRouter.use("/home", home);

userRouter.use('/watch', stream);

userRouter.use('/fav', favourite);

userRouter.use('/payment', payment);

userRouter.use('/purchased', purchased);

userRouter.get('/premium',(req, res)=>{
    res.render('premium.ejs',{"premium":0,"message": "","error":""});
});

userRouter.get('/search', (req, res) => {
    res.render('search.ejs',{"results":"","message": "","error":""});
});

userRouter.use('/cart', cart);

userRouter.use('/setting', setting);

userRouter.get('/aboutUs', (req, res) => {
    res.render('aboutUs.ejs');
});

module.exports = userRouter;
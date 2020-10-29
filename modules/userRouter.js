const userRouter = require('express').Router();

const home = require('./home');
const cart = require('./cartHandler');
const payment = require('./payment');

userRouter.get('/', (req, res) => {
    if (req.session.user_id)
        res.redirect('/home');
    else
        res.render('index.ejs');
})

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

userRouter.get('/purchased',(req, res)=>{
    res.render('purchased.ejs',{"subs":1,"series":"","video":""});
});

userRouter.get('/fav',(req, res)=>{
    res.render('fav.ejs',{"series":"","video":""});
});

module.exports = userRouter;
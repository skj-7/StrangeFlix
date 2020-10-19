const homeRouter = require('express').Router();


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

module.exports = homeRouter;
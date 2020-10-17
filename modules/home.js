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

module.exports = homeRouter;
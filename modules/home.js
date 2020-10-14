const homeRouter = require('express').Router();


homeRouter.get('/',(req, res)=>{
    res.render('home.ejs');
});


module.exports = homeRouter;
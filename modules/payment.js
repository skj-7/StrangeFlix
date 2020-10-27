const payemntRouter = require('express').Router();


payemntRouter.post('/',(req, res)=>{
    res.render('payment.ejs',{"name":"","email":"","amount":req.body.amount});
});







module.exports = payemntRouter;
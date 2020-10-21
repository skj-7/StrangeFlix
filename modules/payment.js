const payemntRouter = require('express').Router();


payemntRouter.post('/',(req, res)=>{
    res.render('payment.ejs',{"name":"Sanskar Jain","email":"sanskar.20194009@mnnit.ac.in","amount":req.body.amount});
});







module.exports = payemntRouter;
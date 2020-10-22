const router = require('express').Router();

regRouter = require("./register");
loginRouter = require("./login");
verifRouter = require("./verification");
adminRouter = require("./adminrouter");
homeRouter = require('./home'); 

router.use("/register", regRouter);

router.use("/login", loginRouter);

router.use("/confirmation", verifRouter);

router.use("/admin",adminRouter);

router.use("/home",homeRouter);

router.get('/',(req, res)=>{
    res.render('index.ejs');
});

module.exports = router;
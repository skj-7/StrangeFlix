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

router.get('/',(req, res) => {
    if (req.session.user_id) {
		res.redirect('/home');
    }
    else {
        res.render('index.ejs');
    }
});

// Logout endpoint
router.get('/logout', (req, res) => {
	req.session.destroy();
	res.redirect('/login');
});

module.exports = router;
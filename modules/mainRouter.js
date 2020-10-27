const router = require('express').Router();

const regRouter = require("./register");
const loginRouter = require("./login");
const verifRouter = require("./verification");
const adminRouter = require("./adminrouter");
const userRouter = require('./userRouter');
const paymentRouter = require('./payment');

router.use("/register", regRouter);

router.use("/login", loginRouter);

router.use("/verification", verifRouter);

router.use("/admin", adminRouter);

router.use("/home", userRouter);

router.get('/',(req, res) => {
    if (req.session.user_id) {
		res.redirect('/home');
    }
    else {
        res.render('index.ejs');
    }
});

router.get('/aboutUs',(req, res) => {
    res.render('aboutUs.ejs');
});

router.use('/payment', paymentRouter);

// Logout endpoint
router.get('/logout', (req, res) => {
	req.session.destroy();
	res.redirect('/login');
});

module.exports = router;
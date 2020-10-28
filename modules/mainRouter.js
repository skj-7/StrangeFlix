const router = require('express').Router();

const regRouter = require("./register");
const loginRouter = require("./login");
const verifRouter = require("./verification");
const adminRouter = require("./adminrouter");
const userRouter = require('./userRouter');

router.use("/register", regRouter);

router.use("/login", loginRouter);

router.use("/verification", verifRouter);

router.use("/admin", adminRouter);

// Logout endpoint
router.get('/logout', (req, res) => {
	req.session.destroy();
	res.redirect('/login');
});

router.use('/', userRouter);

module.exports = router;
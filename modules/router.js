const router = require('express').Router();

regRouter = require("./register");
loginRouter = require("./login");
verifRouter = require("./verification");

router.use("/register", regRouter);

router.use("/login", loginRouter);

router.use("/confirmation", verifRouter);

module.exports = router;
const router = require('express').Router();

regRouter = require("./register");
loginRouter = require("./login");
verifRouter = require("./verification");
adminRouter = require("./adminrouter");

router.use("/register", regRouter);

router.use("/login", loginRouter);

router.use("/confirmation", verifRouter);

router.get("/admin",adminRouter);
router.post("/admin",adminRouter);

module.exports = router;
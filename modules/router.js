const router = require('express').Router();

router.get("/", (req, res, err) => {
	res.send("Let's flix with strange....");
})

module.exports = router;
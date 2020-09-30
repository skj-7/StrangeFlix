const router = require('express').Router();

router.get('/', (req, res)=>{
    res.status(200).render('register.ejs',{
      "error": "",
      "message": ""
    });
})





loginRouter=require("./login");
router.get("/login",loginRouter);
module.exports = router;
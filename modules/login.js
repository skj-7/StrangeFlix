const router = require('express').Router();
router.get('/login', (req, res)=>{
    res.status(200).render('login.ejs',{
      "error": "",
      "message": ""
    });
})
module.exports = router;
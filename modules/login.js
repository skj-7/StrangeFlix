const routerLogin = require('express').Router();
var mongoose = require('mongoose');
var userdata = mongoose.model('registration');
routerLogin.get('/login', (req, res) => {
  res.status(200).render('login.ejs', {
    "error": "",
    "message": ""
  });
});

routerLogin.post('/login',(req,res)=>{
    var Post=req.body.post;
    var Email=req.body.email;
    var Password=req.body.password;
    if (Email == "" || Password == "") {
      res.status(200).render('login.ejs', {
        "error": "Fill all the fields below",
        "message": ""
      });
      return;
    }
    userdata.findOne({email:Email,password:Password},(err,data)=>{
      if (err)
      console.log(err);
      else{
        console.log(data);
        if(data!=null)
        {
          res.status(200).render('user.ejs');
        }
        else{
          res.status(200).render('login.ejs', {
            "error": "Invalid Details",
            "message": ""
          });
        }
      }
    })
})



module.exports = routerLogin;
const router = require('express').Router();
var validator = require("email-validator");
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var mongoose = require('mongoose');
const { getMaxListeners } = require('process');
var mySchema = new mongoose.Schema({
  lname: String,
  fname: String,
  email: String,
  password: String
});
var emailVef = new mongoose.Schema({
  email: String,
  token:String,
});
var usertoken = mongoose.model('mailvef', emailVef);
var userdata = mongoose.model('registration', mySchema);
router.get('/', (req, res) => {
  res.status(200).render('register.ejs', {
    "error": "",
    "message": ""
  });
})


var Token= crypto.randomBytes(16).toString('hex');
router.post('/', (req, res) => {
  var fname = req.body.fname;
  var lname = req.body.lname;
  var Email = req.body.email;
  var password = req.body.password;
  if (fname == "" || lname == "" || Email == "" || password == "") {
    res.status(200).render('register.ejs', {
      "error": "Fill all the fields below",
      "message": ""
    });
    return;
  }
  if (validator.validate(Email) == false) {
    res.status(200).render('register.ejs', {
      "error": "Email is invalid",
      "message": ""
    });
    return;
  }
  userdata.findOne({ email: Email }, (err, data) => {
    if (err)
      console.log(err);
    else {
      if (data != null) {
        res.status(200).render('register.ejs', {
          "error": "Email already used",
          "message": ""
        });
      }
      else {
        //Mail Verification
        var token = new usertoken({email:Email, token:Token });

        // Save the verification token
        token.save(function (err, ok) {
          if (err)
            return console.error(err)
          });

          // Send the email
          var transporter = nodemailer.createTransport({ service: 'gmail', auth: { user:'strangeflix01@gmail.com', pass:'Strangeflix@01' } });
          var mailOptions = { from: 'strangeflix01@gmail.com', to: Email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '\n' };
          transporter.sendMail(mailOptions, function (err) {
            if (err) {
               console.error(err) 
               res.status(200).render('register.ejs', {
                "error": "Check your Email-ID",
                "message": ""
              });
              }
            res.status(200).render('register.ejs', {
              "error": "",
              "message": "A verification email has been sent"
            });
          });
          


          //Saving Data
          var data = { post: req.body.post, fname: req.body.fname, lname: req.body.lname, email: req.body.email, password: req.body.password };
          var mydata = new userdata(data);
          mydata.save(function (err, ok) {
            if (err)
              return console.error(err)
          })
          
      }
    }
  })

})

var link='/confirmation\/' + Token;
router.get(link ,(req, res) => {
  res.status(200).render('register.ejs', {
      "error": "",
      "message": "Successfully Registered.Ready to login"
    });
})
loginRouter = require("./login");
router.get("/login", loginRouter);
router.post("/login", loginRouter);
module.exports = router;
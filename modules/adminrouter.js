const adminrouter = require('express').Router();

const pin = 2020;
adminrouter.get('/', (req, res) => {
    res.status(200).render('adminlogin.ejs', {
        "error": "",
        "message": ""
    });
})
adminrouter.post('/', (req, res) => {
    const Pin = req.body.pin;
    if (pin != Pin) {
        res.status(200).render('adminlogin.ejs', {
            "error": "Invalid Pin",
            "message": ""
        });
    }
    else {
        res.status(200).render('admincontrol.ejs',{"videoarray":"","series":""});
    }
})

module.exports = adminrouter;
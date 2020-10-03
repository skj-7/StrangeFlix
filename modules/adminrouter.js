const adminrouter = require('express').Router();

const pin = 2020;
adminrouter.get('/admin', (req, res) => {
    res.status(200).render('Adminmain.ejs', {
        "error": "",
        "message": ""
    });
})
adminrouter.post('/admin', (req, res) => {
    const Pin = req.body.pin;
    if (pin != Pin) {
        res.status(200).render('Adminmain.ejs', {
            "error": "Invalid Pin",
            "message": ""
        });
    }
    else {
        res.status(200).render('Adminpage.ejs',{"videoarray":"","series":""});
    }
})





module.exports = adminrouter;
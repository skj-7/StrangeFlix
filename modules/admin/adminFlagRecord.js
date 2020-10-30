const flagRecord = require('express').Router();
flagRecord .get('/', (req, res) => {
    res.render('flags-record.ejs',{"videoarray":'',"comments":""});
});




module.exports = flagRecord;
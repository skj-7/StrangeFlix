const admincontrol = require('express').Router();

admincontrol.get('/', (req, res) => {
	res.render('admincontrol.ejs', { "videoarray": "", "series": "" });
})

module.exports = admincontrol;
const admincontrol = require('express').Router();

admincontrol.get('/', (req, res) => {
	if (req.session.admin) {
		res.render('admincontrol.ejs', { "videoarray": "", "series": "" });
	}
	else {
		res.redirect('/admin/login');
	}
})

module.exports = admincontrol;
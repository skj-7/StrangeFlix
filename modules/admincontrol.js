const admincontrol = require('express').Router();
const videos = require('../schemas/videos');
const videoSeries = require('../schemas/videoSeries');

admincontrol.get('/', (req, res) => {
	if (req.session.admin) {
		videos.find({}, (err, vidarr) => {
			if(err) {
				return console.log(err);
			}
			console.log(vidarr);
			videoSeries.find({}, (err, seriesarr) => {
				res.render('admincontrol.ejs', { "videoarray": vidarr, "series": seriesarr });
			});
		});
	}
	else {
		res.redirect('/admin/login');
	}
})

module.exports = admincontrol;
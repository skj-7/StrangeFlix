const home = require('express').Router();
const videos = require('../schemas/videos');
const videoSeries = require('../schemas/videoSeries');

home.get('/',(req, res) => {
    if (req.session.user_id) {
        var msg = "";
        if(req.session.data.message)
            msg = req.session.data.message;
        
        videos.find({}, (err, vidarr) => {
			if(err) {
				return console.log(err);
			}
			
			videoSeries.find({}, (err, seriesarr) => {
				res.render('home.ejs', { "series": seriesarr, "video": vidarr, "message": msg, "error": "" });
			});
		});
    }
    else {
        res.redirect('/');
    }
});

module.exports = home;
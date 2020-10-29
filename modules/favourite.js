const fav = require('express').Router();

const bodyParser = require('body-parser');
const users = require('../schemas/userData');
const videos = require('../schemas/videos');
const videoSeries = require('../schemas/videoSeries');

fav.use(bodyParser.json());

fav.get('/', (req, res) => {
    const userID = req.session.user_id;

    var msg = "";
    if(req.session.data.message) {
        msg = req.session.data.message;
        req.session.data.message = null;
    }
	
	if (userID) {
		users.findById(userID).populate(["favourites.listSolo", "favourites.listSeries", "favourites.listSeries.videoList"])
        .exec( (error, userdata) => {
            if(error) {
                console.log(error);
                res.render('error.ejs', {
                    "error": "Unable to render page",
                    "message": "Check console at server.."
                });
            }

            res.render('fav.ejs', {
                "message": msg, "error": "",
                "series": userdata.favourites.listSeries,
                "video": userdata.favourites.listSolo
            });
        });
    }
    else {
		res.redirect('/');
	}
});

fav.get('/add/video/:vid_id', (req, res) => {
	const userID = req.session.user_id;
	var videoID = req.params.vid_id;
	
	if (userID) {
		users.findById(userID, (err, userdata) => {
            var isFavrt = userdata.favourites.listSolo.some(function (vidarrobj) {
				return vidarrobj.equals(videoID);
			});

			if(isFavrt == true) {
				req.session.data.message = "Already added to Favourites.";
				res.redirect('/home');
				return;
			}
            
            userdata.updateOne( {
                $push: { "favourites.listSolo": videoID }
            }, (err, userdata) => {
                req.session.data.message = "Video added to Favourites."
                res.redirect('/home');
            });
        });
    }
    else {
		res.redirect('/');
	}
})

fav.get('/add/series/:ser_id', (req, res) => {
	const userID = req.session.user_id;
	var seriesID = req.params.ser_id;
	
	if (userID) {
		users.findById(userID, (err, userdata) => {
            var isFavrt = userdata.favourites.listSeries.some(function (seriesarrobj) {
				return seriesarrobj.equals(seriesID);
			});

			if(isFavrt == true) {
				req.session.data.message = "Already added to Favourites.";
				res.redirect('/home');
				return;
			}
            
            userdata.updateOne( {
                $push: { "favourites.listSeries": seriesID }
            }, (err, userdata) => {
                req.session.data.message = "Series added to Favourites."
                res.redirect('/home');
            });
        });
    }
    else {
		res.redirect('/');
	}
})

fav.get('/remove/video/:vid_id', (req, res) => {
	const userID = req.session.user_id;
	var videoID = req.params.vid_id;
	
	if (userID) {
        users.findByIdAndUpdate(userID,
        { $pull: { "favourites.listSolo": videoID } }, 
        (err, userdata) => {
            if(err) {
                console.log(err);
                res.render('error.ejs', {
                    "error": "Unable to render page",
                    "message": "Check console at server.."
                });
            }

            req.session.data.message = "Video removed from Favourites."
            res.redirect('/fav');
        });
    }
    else {
		res.redirect('/');
	}
})

fav.get('/remove/series/:ser_id', (req, res) => {
	const userID = req.session.user_id;
	var seriesID = req.params.ser_id;
	
	if (userID) {
		users.findByIdAndUpdate(userID,
        { $pull: { "favourites.listSeries": seriesID } }, 
        (err, userdata) => {
            if(err) {
                console.log(err);
                res.render('error.ejs', {
                    "error": "Unable to render page",
                    "message": "Check console at server.."
                });
            }

            req.session.data.message = "Series removed from Favourites."
            res.redirect('/fav');
        });
    }
    else {
		res.redirect('/');
	}
})

module.exports = fav;
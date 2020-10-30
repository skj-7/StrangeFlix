const stream = require('express').Router();

const bodyParser = require('body-parser');
const flags = require('../schemas/flags');
const users = require('../schemas/userData');
const videos = require('../schemas/videos');
const videoSeries = require('../schemas/videoSeries');

stream.use(bodyParser.json());

stream.get('/:vid_id', (req, res) => {
	const userID = req.session.user_id;
	var videoID = req.params.vid_id;
	var msg = "";
	
	if (userID) {
		if(req.session.data.message) {
			msg = req.session.data.message;
			req.session.data.message = null;
		}

		users.findById(userID, (err, userdata) => {
			var subCode = userdata.subscriptionCode;

			let play = () => {
				videos.findById(videoID).populate([
					{path: "comments", populate: { path: "_userId"}}, 
					{path: "_seriesId", populate: { path: "videoList"}}])
				.exec( (error, videodata) => {
					if(error) {
						console.log(error);
						res.render('error.ejs', {
							"error": "Unable to find video.",
							"message": "Check console at server.."
						});
					}

					var selfcmnt = [];
					var othercmnt = [];
					var recommendations = [];

					videodata.comments.forEach(cmnt => {
						var commentuser = cmnt._userId._id;
						if(commentuser.equals(userID) == true)
							selfcmnt.push(cmnt);
						else
							othercmnt.push(cmnt);
					});

					console.log(videodata._seriesId);
					if(videodata._seriesId == null)
					{
						videos.find({}, (err, data) => {
							if(err) return console.log(err);
							recommendations = data;
						})
					}
					else {
						videodata._seriesId.videoList.forEach(vid => {
							if(vid._id != videoID) {
								recommendations.push(vid);
							}
						});
					}

					res.render('streaming.ejs', {
						"message": msg, "error": "", 
						"playedvideo": videodata, 
						"selfComments": selfcmnt, "otherComments": othercmnt, 
						"recom": recommendations
					});
				})    
			}

			if(subCode == 0) {
				req.session.data.message = "You have not purchased this video.";
				res.redirect('/home');
				return;
			}
			else if(subCode == 1) {
				var isPurchased = userdata.purchased.listSolo.some(function (vidarrobj) {
					return vidarrobj.equals(videoID);
				});

				if(isPurchased == true) {
					play();
				}
				else {
					req.session.data.message = "You have not purchased this video.";
					res.redirect('/home');
					return;
				}
			}
			else {
				play();
			}
		});
	}
	else {
		res.redirect('/login');
	}
})

stream.get('/report/:vid_id', (req, res) => {
	const userID = req.session.user_id;
	var videoID = req.params.vid_id;

	if(userID) {
		var data = new flags({ "flagtype": 1, "flagid": videoID });
		data.save( (err, flagdata) => {
			if (err) {
				return console.error(err);
			}

			req.session.data.message = "Video successfully reported to admin."
			res.redirect('/watch/' + videoID);
		})
    } else {
		res.redirect('/login');
	}
});

module.exports = stream;
const stream = require('express').Router();

const users = require('../schemas/userData');
const videos = require('../schemas/videos');
const videoSeries = require('../schemas/videoSeries');

stream.get('/', (req, res) => {
	const userID = req.session.user_id;
	var videoID = req.query.v;
	if (userID) {
		users.findById(userID, (err, userdata) => {
			var subCode = userdata.subscriptionCode;

			let play = () => {
				videos.findById(videoID).populate(["comments", "_seriesId", "_seriesId.videoList"])
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
						var commentuser = cmnt._userId;
						if(commentuser.equals(userID) == true)
							selfcmnt.push(cmnt);
						else
							othercmnt.push(cmnt);
					});

					if(videodata._seriesId == null)
					{
						videos.find({}, (err, data) => {
							if(err) return console.log(err);

							recommendations = data;
						})
					}
					else {
						videos._seriesId.videoList.forEach(vid => {
							if(vid._id != videoID)
								recommendations.push(vid);
						});
					}
					res.render('streaming.ejs', {
						"message": "", "error": "", 
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

module.exports = stream;
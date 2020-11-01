const flagRecord = require('express').Router();
const bodyParser = require('body-parser');

const videos = require('../../schemas/videos');
const flags = require('../../schemas/flags');
const comments = require('../../schemas/comment');
var userdata = require('../../schemas/userData');

flagRecord.use(bodyParser.json());

flagRecord.get('/', (req, res) => {

	if (req.session.admin) {
		var msg = "";
		if(req.session.data.message) {
			msg = req.session.data.message;
			req.session.data.message = null;
		}

		flags.find({ "flagtype": 0 }).populate({
			path: 'flagid',
			model: 'Comments',
			populate: {
				path: "_userId"
			}
		}).exec( (error, commentdata) => {
			if(error) {
				return console.log(error);
			}

			flags.find({ "flagtype": 1 }).populate({
				path: 'flagid',
				model: 'Videos'
			}).exec( (error, videodata) => {
				if(error) {
					return console.log(error);
				}

				res.render('adminFlagsRecord.ejs', { "videoarray": videodata, "commentarray": commentdata, "message": msg, "error": "" });
			})
		})
	}
	else
		res.redirect('/admin/login');
});

flagRecord.get('/deflag/video/:ID', (req, res) => {
	var flagID = req.params.ID;

	if (req.session.admin) {
		flags.findByIdAndDelete(flagID, (err, data) => {
			if(err) {
				return console.log(err);
			}

			req.session.data.message = "Video Flag is successfully removed";
			res.redirect('/admin/flags');
		});
	}
	else
		res.redirect('/admin/login');
});

flagRecord.get('/deflag/comment/:ID', (req, res) => {
	var flagID = req.params.ID;

	if (req.session.admin) {
		flags.findById(flagID, (error, data) => {
			if(error) {
				return console.log(error);
			}

			var commentID = data.flagid;
			comments.findByIdAndUpdate(commentID, { $set: { flagged: false }}, (err, commentdata) => {
				data.deleteOne( (err, flagdata) => {
					if(err) return console.log(err);

					req.session.data.message = "Comment Flag is successfully removed";
					res.redirect('/admin/flags');
				})
			})
		})
	}
	else
		res.redirect('/admin/login');
});

flagRecord.get('/remove/comment/:ID', (req, res) => {
	var flagID = req.params.ID;

	if(req.session.admin) {
		flags.findById(flagID, (error, data) => {
			if(error) {
				return console.log(error);
			}

			var commentID = data.flagid;
			comments.findById(commentID, (err, commentdata) => {
				if(err) return console.log(err);

				var userID = commentdata._userId;
				var videoID = commentdata._videoId;

				userdata.findByIdAndUpdate(userID, { $pull: { comments: commentID }}, (err, userdata) => {
					if(err) return console.log(err);
		
					videos.findByIdAndUpdate(videoID, { $pull: { comments: commentID }}, (error, videodata) => {
						if(error) return console.log(error);
		
						commentdata.deleteOne( (error, cmnt) => {
							if(error) return console.log(error);

							data.deleteOne( (error, cmnt) => {
								if(error) return console.log(error);
	
								req.session.data.message = "Flagged comment is successfully deleted";
								res.redirect('/admin/flags');
							})
						})
					})
				})
			})
		})
	} else {
		res.redirect('/admin/login');
	}
})

flagRecord.get('/blockUser/:ID', (req, res) => {
	if (req.session.admin) {
		userdata.findById(req.params.ID , (er, data) => {
			if(data.blocked == true) {

				req.session.data.message = "User is already blocked";
				res.redirect('/admin/flags');
			} else {
				userdata.findByIdAndUpdate(req.params.ID, { blocked: true }, (err) => {

					req.session.data.message = "User is temporarily blocked";
					res.redirect('/admin/flags');
				})
			}
		});
	}
	else
		res.redirect('/admin/login');
});


module.exports = flagRecord;
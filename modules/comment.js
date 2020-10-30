const comment = require('express').Router();
const bodyParser = require('body-parser');
const flags = require('../schemas/flags');
const users = require('../schemas/userData');
const videos = require('../schemas/videos');
const comments = require('../schemas/comment');

comment.use(bodyParser.json());

comment.post('/add', (req, res) => {
    const userID = req.session.user_id;
    var videoID = req.body.vidID;
    var content = req.body.content;

    if(userID) {
        let data = new comments({ 
            "_userId": userID,
            "_videoId": videoID,
            "content": content
        });

        data.save( (err, cmntdata) => {
            if(err) {
                return console.log(err);
            }
            users.findByIdAndUpdate(userID, { $push: { "comments": cmntdata._id } }, (error, userdata) => {
                if(error) {
                    return console.log(error);
                }

                videos.findByIdAndUpdate(videoID, { $push: { "comments": cmntdata._id } }, (error, videodata) => {
                    if(error) {
                        return console.log(error);
                    }

                    req.session.data.message = "Comment added successfully";
                    res.redirect('/watch/' + videoID);
                })
            })
        })
    } else {
		res.redirect('/login');
	}
})

comment.post('/update', (req, res) => {
    const userID = req.session.user_id;
    var commentID = req.body.commentID;
    var videoID = req.body.vidID;
    var content = req.body.content;

    if(userID) {
        comments.findByIdAndUpdate(commentID, { $set: { "content": content }}, (error, cmntdata) => {
            if(error) return console.log(error);

            req.session.data.message = "Comment updated successfully";
            res.redirect('/watch/' + videoID);
        })
    } else {
		res.redirect('/login');
	}
})

comment.post('/remove', (req, res) => {
    const userID = req.session.user_id;
    var commentID = req.body.commentID;
    var videoID = req.body.vidID;

    if(userID) {
        users.findByIdAndUpdate(userID, { $pull: { comments: commentID }}, (err, userdata) => {
            if(err) return console.log(err);

            videos.findByIdAndUpdate(videoID, { $pull: { comments: commentID }}, (error, videodata) => {
                if(error) return console.log(error);

                comments.findByIdAndRemove(commentID, (error, cmnt) => {
                    if(error) return console.log(error);

                    req.session.data.message = "Comment removed successfully";
                    res.redirect('/watch/' + videoID);
                })
            })
        })
    } else {
		res.redirect('/login');
	}
})

comment.post('/report', (req, res) => {
    const userID = req.session.user_id;
    var commentID = req.body.commentID;
    var videoID = req.body.vidID;

    if(userID) {
        comments.findByIdAndUpdate(commentID, { $set: { "flagged": true }}, (error, cmntdata) => {
            if(error) return console.log(error);

            var data = new flags({ "flagtype": 0, "flagid": commentID });
            data.save( (err, flagdata) => {
                if (err) {
                    return console.error(err);
                }
                req.session.data.message = "Comment successfully reported to admin."
                res.redirect('/watch/' + videoID);
            })
        })
    } else {
		res.redirect('/login');
	}
})

module.exports = comment;
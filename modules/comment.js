const comment = require('express').Router();
const bodyParser = require('body-parser');
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

                    res.redirect('/watch/' + videoID);
                })
            })
        })
    } else {
		res.redirect('/login');
	}
})

module.exports = comment;
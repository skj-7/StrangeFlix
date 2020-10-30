const likes = require('express').Router();

const bodyParser = require('body-parser');
const videos = require('../schemas/videos');

likes.use(bodyParser.json());

likes.get('/like/:vidID', (req, res) => {
    var videoID = req.params.vidID;
    if (req.session.user_id) {
        videos.findByIdAndUpdate(videoID, { $inc: { likes: 1 }}, (error, videodata) => {
            res.redirect('/watch/' + videoID);
        })
    } else {
        res.redirect('/');
    }
})

likes.get('/dislike/:vidID', (req, res) => {
    var videoID = req.params.vidID;
    if (req.session.user_id) {
        videos.findByIdAndUpdate(videoID, { $inc: { dislikes: 1 }}, (error, videodata) => {
            res.redirect('/watch/' + videoID);
        })
    } else {
        res.redirect('/');
    }
})

module.exports = likes;
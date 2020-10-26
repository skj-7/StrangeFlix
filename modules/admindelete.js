const admindelete = require('express').Router();
const bodyParser = require('body-parser');
const videos = require('../schemas/videos');
const videoSeries = require('../schemas/videoSeries');

admindelete.use(bodyParser.json());

admindelete.get('/video/:videoID', (req, res) => {
    if (req.session.admin) {
        videos.findOne({ _id: req.params.videoID }).populate('_seriesId')
        .exec( (err, video) => {
            if(err) {
				return console.log(err);
            }
            console.log(video);

            video._seriesId.episodeCount -= 1;
            video._seriesId.save( (err) => {
                res.send('werew' + video);
            })
            // res.render('adminvideoEdit.ejs', {"video": video});
        })
    }
    else
        res.redirect('/admin/login');
});

admindelete.get('/series/:seriesID', (req, res) => {
    if (req.session.admin) {
        videoSeries.findOne({ _id: req.params.seriesID }).populate('videoList')
        .exec( (err, series) => {
            if(err) {
				return console.log(err);
            }
            console.log(series);
            res.render('adminSeriesEdit.ejs', {"series": series});
        })
    }
    else
        res.redirect('/admin/login');
});

module.exports = admindelete;

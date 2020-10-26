const admindelete = require('express').Router();
const fs = require('fs');
const bodyParser = require('body-parser');
const videos = require('../schemas/videos');
const videoSeries = require('../schemas/videoSeries');

admindelete.use(bodyParser.json());

admindelete.get('/video/:videoID', (req, res) => {
    if (req.session.admin) {
        var video_id = req.params.videoID;

        videos.findOne({ _id: video_id }).populate('_seriesId')
        .exec( (err, video) => {
            if(err) {
				return console.log(err);
            }
            console.log("Deleting Video:"+video.title);

            fs.unlink(video.filepath, (err1) => {
                if (err1) throw err1;
                console.log('Video File deleted!');

                fs.unlink(video.thumbnail, (err2) => {
                    if (err2) throw err2;
                    console.log('Thumbnail File deleted!');
                    
                    video._seriesId.updateOne({ $pull: { videoList: video_id }, $set: { episodeCount: video._seriesId.episodeCount-1 } },
                    (error, success) => {
                        if(error)
                            return console.log(error);
        
                        video.deleteOne( (err) => {
                            if(err)
                                return console.log(err);
        
                            res.render('deletedmsg.ejs', {"type": "Video "+video.title});
                        });
                    })
                })
            })    
        })
    }
    else
        res.redirect('/admin/login');
});

admindelete.get('/series/:seriesID', (req, res) => {
    if (req.session.admin) {
        var series_id = req.params.seriesID;

        videoSeries.findOne({ _id: series_id }).populate('videoList')
        .exec( (err, series) => {
            if(err) {
				return console.log(err);
            }
            console.log(series);

            fs.unlink(series.seriesThumbnail, (err1) => {
                if (err1) throw err1;
                console.log('Thumbnail File deleted!');

                for (let i = 0; i < series.videoList.length; i++) {
                    const vid = series.videoList[i];
                    vid.updateOne({ $set: { _seriesId: null } },
                        (error, success) => {
                            if(error)
                                return console.log(error);
                        });
                }
                
                series.deleteOne( (err) => {
                    if(err)
                        return console.log(err);

                    res.render('deletedmsg.ejs', {"type": "Series "+series.seriesTitle});
                });
            });
        })
    }
    else
        res.redirect('/admin/login');
});

module.exports = admindelete;

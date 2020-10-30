const search = require('express').Router();
const videos = require('../schemas/videos');
const videoSeries = require('../schemas/videoSeries');

search.get('/', (req, res) => {
    if (req.session.user_id) {
        res.render('search.ejs', { "video": "", "series": "", "message": "", "error": "", "result": -1 });
    }
    else {
        res.redirect('/');
    }
});

search.post('/', (req, res) => {
    var searched = req.body.search;
    var Type = req.body.type;
    if(Type == "name")
    {
        videos.find({ title: { $regex: searched, $options: "i" } }, (err, vid) => {
            if (err)
                console.log(err);
            videoSeries.find({ seriesTitle: { $regex: searched, $options: "i" } }, (Err, ser) => {
            if (Err)
                console.log(Err);
            res.render('search.ejs', { "video": vid, "series": ser, "message": "", "error": "","result": 1 });
            });
        });
    }
    else if(Type == "category")
    {
        videos.find({ category: { $regex: searched, $options: "i" } }, (err, vid) => {
            if (err)
                console.log(err);
            videoSeries.find({ seriesCategory: { $regex: searched, $options: "i" } }, (Err, ser) => {
            if (Err)
                console.log(Err);
            res.render('search.ejs', { "video": vid, "series": ser, "message": "", "error": "","result": 1});
            });
        });
    }
    else if(Type == "tags")
    {
        videos.find({ tags: { $regex: searched, $options: "i" } }, (err, vid) => {
            if (err)
                console.log(err);
            videoSeries.find({ seriesTags: { $regex: searched, $options: "i" } }, (Err, ser) => {
            if (Err)
                console.log(Err);
            res.render('search.ejs', { "video": vid, "series": ser, "message": "", "error": "","result": 1 });
            });
        });
    }
    else
    {
        videos.find({ $or: [{ title: { $regex: searched, $options: "i" } }, { category: { $regex: searched, $options: "i" } }, { tags: { $regex: searched, $options: "i" } }] }, (err, vid) => {
            if (err)
                console.log(err);
            videoSeries.find({ $or: [{ seriesTitle: { $regex: searched, $options: "i" } }, { seriesCategory: { $regex: searched, $options: "i" } }, { seriesTags: { $regex: searched, $options: "i" } }] }, (Err, ser) => {
            if (Err)
                console.log(Err);
            res.render('search.ejs', { "video": vid, "series": ser, "message": "", "error": "","result": 1 });
            });
        });
    }
});


module.exports = search;
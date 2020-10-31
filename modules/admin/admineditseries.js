const admineditseries = require('express').Router();
const bodyParser = require('body-parser');
const videoSeries = require('../../schemas/videoSeries');

admineditseries.use(bodyParser.json());

admineditseries.get('/:seriesID', (req, res) => {
    if (req.session.admin) {
        videoSeries.findOne({ _id: req.params.seriesID }).populate('videoList')
            .exec((err, series) => {
                if (err) {
                    return console.log(err);
                }

                res.render('adminSeriesEdit.ejs', { "series": series });
            })
    }
    else
        res.redirect('/admin/login');
});


admineditseries.post('/:seriesID', (req, res) => {
    if (req.session.admin) {
        videoSeries.findOneAndUpdate({ _id: req.params.seriesID }, req.body, (err, data) => {
            if (err) {
                return console.log(err);
            }
            videoSeries.findOne({ _id: req.params.seriesID }).populate('videoList')
                .exec((err, series) => {
                    if (err) {
                        return console.log(err);
                    }
                    
                    res.render('adminSeriesEdit.ejs', { "series": series });
                })
        });
    }
});

module.exports = admineditseries;
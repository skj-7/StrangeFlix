const admineditseries = require('express').Router();
const bodyParser = require('body-parser');
const videoSeries = require('../schemas/videoSeries');

admineditseries.use(bodyParser.json());

admineditseries.get('/:seriesID', (req, res) => {
    if (req.session.admin) {
        videoSeries.findOne({ _id: req.params.seriesID }, (err, series) => {
            if(err) {
				return console.log(err);
            }
            
            res.render('adminSeriesEdit.ejs', {"series": series});
        })
    }
    else
        res.redirect('/admin/login');
});

module.exports = admineditseries;
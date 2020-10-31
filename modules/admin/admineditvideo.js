const admineditvideo = require('express').Router();
const bodyParser = require('body-parser');
const videos = require('../../schemas/videos');
require('../../schemas/comment');

admineditvideo.use(bodyParser.json());

admineditvideo.get('/:vidID', (req, res) => {
    if (req.session.admin) {
        videos.findOne({ _id: req.params.vidID }).populate(['comments', '_seriesId'])
            .exec((err, vid) => {
                if (err) {
                    return console.log(err);
                }

                res.render('adminVideoEdit.ejs', { "video": vid });
            })
    }
    else
        res.redirect('/admin/login');
});

admineditvideo.post('/:vidID', (req, res) => {
    if (req.session.admin) {
        videos.findOneAndUpdate({ _id: req.params.vidID }, req.body, (err, data) => {
            if (err) {
                return console.log(err);
            }
            videos.findOne({ _id: req.params.vidID }).populate('comments')
                .exec((err, vid) => {
                    if (err) {
                        return console.log(err);
                    }

                    res.render('adminVideoEdit.ejs', { "video": vid });
                })
        });
    }
});


module.exports = admineditvideo;
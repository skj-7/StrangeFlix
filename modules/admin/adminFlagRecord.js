const flagRecord = require('express').Router();
const videos = require('../../schemas/videos');
const flags = require('../../schemas/flags');
const comments = require('../../schemas/comment');

flagRecord.get('/', (req, res) => {
    if (req.session.admin) {
        var Flagged = [];
        var FlaggedVid = [];
        flags.find({ "flagtype": 0 }, (err, com) => {
            com.forEach(x => {
                Flagged.push({ "_id": x.flagid });
            });
            comments.find({ $or: Flagged }, (er, COMMENT) => {

                flags.find({ "flagtype": 1 }, (e, vid) => {
                    vid.forEach(x => {
                        FlaggedVid.push({ "_id": x.flagid });
                    });
                    videos.find({$or: FlaggedVid}, (Er, VIDEO) => {
                        res.render('flags-record.ejs', { "videoarray": VIDEO, "comments": COMMENT });
                    });
                }); 
            });
        });
    }
    else
        res.redirect('/admin/login');
});




module.exports = flagRecord;
const flagRecord = require('express').Router();
const bodyParser = require('body-parser');

const videos = require('../../schemas/videos');
const flags = require('../../schemas/flags');
const comments = require('../../schemas/comment');
var userdata = require('../../schemas/userData');

flagRecord.use(bodyParser.json());

function displayFun(msg, res) {
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
                videos.find({ $or: FlaggedVid }, (Er, VIDEO) => {
                    res.render('flags-record.ejs', { "videoarray": VIDEO, "comments": COMMENT, "message": msg, "error": "" });
                });
            });
        });
    });
}

flagRecord.get('/', (req, res) => {
    if (req.session.admin) {
        displayFun("", res);
    }
    else
        res.redirect('/admin/login');
});



flagRecord.get('/removeFlag/:ID', (req, res) => {
    if (req.session.admin) {
        flags.deleteOne({ flagid: req.params.ID }, (Err) => {
            displayFun("Flag is successfully removed", res);
        });
    }
    else
        res.redirect('/admin/login');
});

flagRecord.get('/removeComment/:ID', (req, res) => {
    if (req.session.admin) {
        comments.findByIdAndDelete(req.params.ID, (err) => {
            displayFun("Flagged comment is successfully removed", res);
        })
    }
    else
        res.redirect('/admin/login');
});

flagRecord.get('/blockUser/:ID', (req, res) => {
    if (req.session.admin) {
        userdata.findById(req.params.ID , (er, data) => {
            if(data.blocked == true)
            {
                displayFun("User is already blocked", res);
            }
            else
            {
                userdata.findByIdAndUpdate(req.params.ID,{blocked: true} ,(err) => {
                    displayFun("User is temporarily blocked", res);
                })
            }
        });
    }
    else
        res.redirect('/admin/login');
});


module.exports = flagRecord;
const adminrouter = require('express').Router();
const formidable = require("formidable");
const fs = require("fs");
const youtubedl = require('youtube-dl')
// const videos=require('../schemas/videos');
// const videoSeries=require('../schemas/videoSeries');

const pin = 2020;
adminrouter.get('/', (req, res) => {
    res.status(200).render('adminlogin.ejs', {
        "error": "",
        "message": ""
    });
})
adminrouter.post('/', (req, res) => {
    const Pin = req.body.pin;
    if (pin != Pin) {
        res.status(200).render('adminlogin.ejs', {
            "error": "Invalid Pin",
            "message": ""
        });
    }
    else {
        res.status(200).render('admincontrol.ejs', { "videoarray": "", "series": ""});
    }
})

adminrouter.get('/home', (req, res) => {
    res.status(200).render('admincontrol.ejs', { "videoarray": "", "series": "" });
})

adminrouter.get('/uploadvideo', (req, res) => {
    res.status(200).render('upload.ejs', { "message": "" });
})
adminrouter.get('/users', (req, res) => {
    res.status(200).render('user-record.ejs');
})
adminrouter.get('/flags', (req, res) => {
    res.status(200).render('flags-record.ejs');
})
adminrouter.get('/settings', (req, res) => {
    res.status(200).render('adminsettings.ejs', {
		"error": "",
		"message": ""
	});
})

adminrouter.get('/uploadvideo/download', (req, res) => {
    var url = req.query.ytlink;

    const video = youtubedl(url, ['--format=18'], { cwd: __dirname });
    video.on('info', function (info) {
        console.log('Download started')
        console.log('filename: ' + info._filename)
        console.log('size: ' + info.size)
        video.pipe(fs.createWriteStream(info._filename + '.mp4'));
    })

    video.on('end', async () => {
        await console.log('finished downloading!');
        await res.status(200).render('upload.ejs', { "message": "uploaded" });
    })
})

module.exports = adminrouter;
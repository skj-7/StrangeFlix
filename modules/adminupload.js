const adminupload = require('express').Router();

const formidable = require("formidable");
const fs = require("fs");
// const youtubedl = require('youtube-dl')
// const videos = require('../schemas/videos');
// const videoSeries = require('../schemas/videoSeries');

// adminrouter.get('/', (req, res) => {
// 	res.render('upload.ejs', { "message": "" });
// })

// adminrouter.get('/download', (req, res) => {
// 	var url = req.query.ytlink;

// 	const video = youtubedl(url, ['--format=18'], { cwd: __dirname });
// 	video.on('info', function (info) {
// 		console.log('Download started')
// 		console.log('filename: ' + info._filename)
// 		console.log('size: ' + info.size)
// 		video.pipe(fs.createWriteStream(info._filename + '.mp4'));
// 	})

// 	video.on('end', async () => {
// 		await console.log('finished downloading!');
// 		await res.status(200).render('upload.ejs', { "message": "uploaded" });
// 	})
// })

module.exports = adminupload;
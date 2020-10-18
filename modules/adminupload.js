const adminupload = require('express').Router();

const fs = require("fs");
const fse = require('fs-extra');
// const youtubedl = require('youtube-dl')
const multer = require('multer');
const path = require('path');
const videos = require('../schemas/videos');

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		if (file.fieldname === "video") {
			let path = `assets/videos`;
			fse.mkdirsSync(path);
			cb(null, path);
		} else {
			let path = `assets/thumbnails/singles`;
			fse.mkdirsSync(path);
			cb(null, path);
		}
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + path.extname(file.originalname));
	}
});

const upload = multer({ storage: storage }).fields(
	[
		{ name: 'video', maxCount: 1 },
		{ name: 'thumbnail', maxCount: 1 }
	]
);

adminupload.get('/', (req, res) => {
	res.render('adminUpload.ejs', { "message": "", "ID": "" });
})

adminupload.post('/', (req, res) => {
	upload(req, res, function (err) {
		if (err) {
			return console.log(err);
		}
		else {
			var Title = req.body.title;
			var Price = req.body.price;
			var Dhour = req.body.hours;
			var Dmin = req.body.minutes;
			var Dsec = req.body.seconds;
			var SeriesName = req.body.series;
			var Descr = req.body.description;
			var Tags = req.body.tags.split(',');
			var Category = req.body.category;

			if (typeof req.files.video == 'undefined') {
				console.log("No image selected!")
			}
			else {


			}
		}


	});
});

// userdata.findOne({ email: Email }, (err, data) => {

// 	// Now we can store the password hash in db.
// 	var data = { fName: fname, lName: lname, email: Email, password: hash };
// 	var mydata = new userdata(data);
// 	mydata.save(function (err) {
// 		if (err)
// 			return console.error(err);
// 	})

	



// 	adminupload.get('/download', (req, res) => {
// 		var url = req.query.ytlink;

// 		const video = youtubedl(url, ['--format=18'], { cwd: __dirname });
// 		video.on('info', function (info) {
// 			console.log('Download started')
// 			console.log('filename: ' + info._filename)
// 			console.log('size: ' + info.size)
// 			video.pipe(fs.createWriteStream(info._filename + '.mp4'));
// 		})

// 		video.on('end', async () => {
// 			await console.log('finished downloading!');
// 			await res.status(200).render('upload.ejs', { "message": "uploaded" });
// 		})
// 	})

// 	const output = 'myvideo.mp4'

// 	let downloaded = 0

// 	if (fs.existsSync(output)) {
// 		downloaded = fs.statSync(output).size
// 	}

// 	const video = youtubedl('https://www.youtube.com/watch?v=179MiZSibco',
// 		['--format=18'],
// 		{ start: downloaded, cwd: __dirname })

// 	// Will be called when the download starts.
// 	video.on('info', function (info) {
// 		console.log('Download started')
// 		console.log('filename: ' + info._filename)

// 		// info.size will be the amount to download, add
// 		let total = info.size + downloaded
// 		console.log('size: ' + total)

// 		if (downloaded > 0) {
// 			// size will be the amount already downloaded
// 			console.log('resuming from: ' + downloaded)

// 			// display the remaining bytes to download
// 			console.log('remaining bytes: ' + info.size)
// 		}
// 	})

// 	video.pipe(fs.createWriteStream(output, { flags: 'a' }))

// 	// Will be called if download was already completed and there is nothing more to download.
// 	video.on('complete', function complete(info) {
// 		'use strict'
// 		console.log('filename: ' + info._filename + ' already downloaded.')
// 	})

// 	video.on('end', function () {
// 		console.log('finished downloading!')
// 	})

	module.exports = adminupload;
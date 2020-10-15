const adminupload = require('express').Router();

// const fs = require("fs");
let fse = require('fs-extra');
// const youtubedl = require('youtube-dl')
const multer = require('multer');
const path = require('path');
const videos = require('../schemas/videos');
const videoSeries = require('../schemas/videoSeries');

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		if (file.fieldname === "video") {
			console.log("4");
			console.log(req.body);
			let path = `assets/videos`;
			fse.mkdirsSync(path);
			cb(null, path);
		} else {
			let path = `assets/thumbnails`;
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
		{name: 'video', maxCount: 1},
		{name: 'thumbnail', maxCount: 1}
	]
);

adminupload.get('/', (req, res) => {
	res.render('upload.ejs', { "message": "" ,"ID":"" });
})

adminupload.post('/file', (req, res) => {
	console.log("1");
	console.log(req.files);
	console.log("2");
	console.log(req.body);
	req.body.idn = "sgvfb";
	console.log("3");
	console.log(req.body);
	upload(req, res, function (err) {
		if (err) {
			console.log("here");
			return console.log(err);
		} else {
			if (req.file == "undefined") {
				console.log("No image selected!")
			} else {
				// let datecreated = new Date();
				// let fullnames = req.body.firstname + ' ' + req.body.lastname;
				// let formatedphone = '';
				// let phone = req.body.personalphone;
				// if (phone.charAt(0) == '0') {
				// 	formatedphone = '+254' + phone.substring(1);
				// } else if ((phone.charAt(0) == '+') && (phone.length > 12 || phone.length <= 15)) {
				// 	formatedphone = phone
				// }
				// let teachers = {
				// 	"teacherid": teacherid,
				// 	"schoolcode": req.body.schoolcode,
				// 	"fullnames": fullnames,
				// 	"email": req.body.email,
				// 	"dateofbirth": req.body.dateofbirth,
				// 	"nationalid": req.body.nationalid,
				// 	"personalphone": formatedphone,
				// 	"profile": req.files.profile[0].path,
				// 	"natid": req.files.natid[0].path,
				// 	"certificate": req.files.certificate[0].path
				// }
				// connection.query('INSERT INTO teachers SET ?', teachers, (error, results, fields) => {
				// 	`enter code here`
				// 	if (error) {
				// 		res.json({
				// 			status: false,
				// 			message: 'there are some error with query'
				// 		})
				// 		console.log(error);
				// 	} else {
						console.log("Saved successfully");
				
					// }
					res.send("Good");
			}
		}
	});			
});

// adminupload.get('/download', (req, res) => {
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
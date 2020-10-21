const adminupload = require('express').Router();

const fs = require("fs");
const fse = require('fs-extra');
const youtubedl = require('youtube-dl')
const multer = require('multer');
const path = require('path');
const videos = require('../schemas/videos');
const videoSeries = require('../schemas/videoSeries');

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
		cb(null, 'undefined' + path.extname(file.originalname));
	}
});

const upload = multer({ storage: storage }).fields(
	[
		{ name: 'video', maxCount: 1 },
		{ name: 'thumbnail', maxCount: 1 }
	]
);

adminupload.get('/', (req, res) => {
	if (req.session.admin) {
		res.render('adminUpload.ejs', { "message": "", "error": "" });
	}
	else {
		res.redirect('/admin/login');
	}
});

// adminupload.post('/checkseries', (req, res) => {
// 	var Name = req.body.SeriesName;

// 	videoSeries.findOne({ seriesTitle: Name }, (error, data) => {
// 		if (error)
// 			return console.log(error);
// 		else if (data == null) {
// 			res.json({ "isPresent": "false" });
// 		}
// 		else
// 			res.json({ "isPresent": "true" });
// 	});
// });

var saveData = (body, series_id) => {

}

adminupload.post('/', (req, res) => {
	if (req.session.admin) {
		upload(req, res, function (err) {
			if (err) {
				console.log(err);
				res.render('error.ejs', { "message": "", "error": "Unexpected error Occured!" });
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

				videoSeries.findOne({ seriesTitle: SeriesName }, (error, data) => {
					if (error) {
						console.log(error);
						res.render('error.ejs', { "message": "", "error": "Unexpected error Occured!" });
					}
					else if (data == null && SeriesName != "") {
						res.render('adminUpload.ejs', {
							"error": "Series Name: " + name + " does not exist. Register <a href=" + req.headers.host + "\/admin\/regseries> here </a>.",
							"message": ""
						});
					}
					else {
						var savedata = new videos({
							_seriesId: data ? data._id : null,
							title: Title,
							description: Descr,
							price: Price,
							thumbnail: "/test",
							category: Category,
							filepath: "/test",
							duration: {hours: Dhour, minutes: Dmin, seconds: Dsec},
							tags: Tags,
						});
						savedata.save( (err) => {
							if (err)
								return console.error(err);
							else {
								var video_id = savedata._id;
								if (typeof req.files.video == 'undefined') {
									console.log("No video selected!")
									var YTLink = req.body.ytlink;
									var AS3Link = req.body.AS3link;
									if(YTLink != "") {
										const videodown = youtubedl(YTLink, ['--format=18'], { cwd: __dirname });
										videodown.on('info', function (info) {
											console.log('Download started')
											console.log('filename: ' + info._filename)
											console.log('size: ' + info.size)
											// videodown.pipe(fs.createWriteStream(info._filename + '.mp4'));
										})

										// videodown.on('end', async () => {
										// 	await console.log('finished downloading!');
										// 	await res.render('adminUpload.ejs', { "message": "YT Video: " + Title + " successfully uploaded!", "error": "" });
										// })
									}
									else if(AS3Link != ""){
										res.send("Ruk abhi!");
									}
								}
								else {
									fs.renameSync(req.files.video[0].path, req.files.video[0].path.replace('undefined', video_id));
									fs.renameSync(req.files.thumbnail[0].path, req.files.thumbnail[0].path.replace('undefined', video_id));
									videos.findByIdAndUpdate(video_id, {
										"thumbnail": req.files.thumbnail[0].path.replace('undefined', video_id),
										"filepath": req.files.video[0].path.replace('undefined', video_id)
									}, (error, result) => {
										if(error) {
											console.log(error);
											res.render('error.ejs', { "message": "Unexpected error Occured!", "error": error })
										}
										else {
											res.render('adminUpload.ejs', { "message": "File: " + Title + " successfully uploaded!", "error": "" });
										}
									});
								}
							}
						});
					}
				});
			}
		});
	}
	else {
		res.redirect('/admin/login');
	}
});

module.exports = adminupload;

	adminupload.get('/download', (req, res) => {
		var url = req.query.ytlink;

		
	})
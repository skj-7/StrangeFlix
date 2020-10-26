const adminupload = require('express').Router();

const fs = require("fs");
const fse = require('fs-extra');
const http = require('http');
const https = require('https');
https.globalAgent.options.ca = require('ssl-root-cas/latest').create();
const url = require('url');
const ytdl = require('ytdl-core');
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
// 	var Name = req.body.seriesName;

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
							"error": "Series Name: " + SeriesName + " does not exist. Register on Reg-Series tab.",
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

								data.update({ $push: { videoList: video_id }, $set: { episodeCount: data.episodeCount+1 } },
									(error, success) => {
									if(error)
										return console.log(error);

									//Upload with links
									if (typeof req.files.video == 'undefined') {
										console.log("Upload with links...")
										var YTurl = req.body.ytlink;
										var NMurl = req.body.NMlink;
										if(NMurl == "")
											var NMurl = req.body.AS3link;

										//Youtube Upload
										if(YTurl != "") {
											var videoVID = url.parse(YTurl, true).query.v;

											let redirectYTComp = () => {
												videos.findByIdAndUpdate(video_id, {
													"thumbnail": `assets/thumbnails/singles/${video_id}.jpg`,
													"filepath": 'assets/videos/'+ video_id + '.mp4'
												}, (error, result) => {
													if(error) {
														console.log(error);
														res.render('error.ejs', { "message": "Unexpected error Occured!", "error": error })
													}
													console.log('Youtube video uploaded.')
													res.render('adminUpload.ejs', { "message": "YT Video: " + Title + " successfully uploaded!", "error": "" })
												});
											}

											let uploadTN = () => {
												https.get(`https://img.youtube.com/vi/${videoVID}/maxresdefault.jpg`, (res) => {

													var stream = res.pipe(fs.createWriteStream(`./assets/thumbnails/singles/${video_id}.jpg`));
													stream.on('finish', () => {
														redirectYTComp();
													});
												}).on('error', (e) => {
													console.error(e);
												});
											}
											
											let uploadYT = async () => {
												var videoReadableStream = ytdl(YTurl, {quality: 'highest'});
												let info = await ytdl.getInfo(YTurl);
												
												var videoName = info.videoDetails.title.replace('|','').toString('ascii');
												var videoWritableStream = fs.createWriteStream('./assets/videos/'+ video_id + '.mp4');
												var stream = videoReadableStream.pipe(videoWritableStream);

												stream.on('finish', () => {
													uploadTN();
												});
											}
											uploadYT();      
										}

										//Normal Link Upload
										else if(NMurl != ""){
											let redirectNMComp = () => {
												fs.renameSync(req.files.thumbnail[0].path, req.files.thumbnail[0].path.replace('undefined', video_id));

												videos.findByIdAndUpdate(video_id, {
													"thumbnail": req.files.thumbnail[0].path.replace('undefined', video_id),
													"filepath": 'assets/videos/'+ video_id + '.mp4'
												}, (error, result) => {
													if(error) {
														console.log(error);
														res.render('error.ejs', { "message": "Unexpected error Occured!", "error": error })
													}
													console.log('Link video uploaded.')
													res.render('adminUpload.ejs', { "message": "Normal Link Video: " + Title + " successfully uploaded!", "error": "" })
												});
											}

											let uploadNM = () => {
												// var proto = !NMurl.charAt(4).localeCompare('s') ? https : http;

												https.get(NMurl, (res) => {
													var stream = res.pipe(fs.createWriteStream('./assets/videos/'+ video_id + '.mp4'));
													stream.on('finish', () => {
														redirectNMComp();
													});
												}).on('error', (e) => {
													console.error(e);
												});
											}
											uploadNM();
										}
									}
									// Upload with local files
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
								});
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
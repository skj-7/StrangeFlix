const adminregseries = require('express').Router();

const fs = require("fs");
const fse = require('fs-extra');
const multer = require('multer');
const path = require('path');
const videoSeries = require('../schemas/videoSeries');

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
			let path = `assets/thumbnails/series`;
			fse.mkdirsSync(path);
			cb(null, path);
	},
	filename: (req, file, cb) => {
		cb(null, "undefined" + path.extname(file.originalname));
	}
});

const upload = multer({ storage: storage }).single('thumbnail');

adminregseries.get('/', (req, res) => {
	if (req.session.admin) {
		res.render('adminRegSeries.ejs', { "message": "", "error": "" });
	}
	else {
		res.redirect('/admin/login');
	}
});

adminregseries.post('/', (req, res) => {
	if (req.session.admin) {
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
				var Descr = req.body.description;
				var Tags = req.body.tags.split(',');
				var Category = req.body.category;

				var data = new videoSeries({
					seriesTitle: Title,
					seriesDescription: Descr,
					seriesPrice: Price,
					seriesThumbnail: "/test",
					seriesCategory: Category,
					seriesDuration: {hours: Dhour, minutes: Dmin, seconds: Dsec},
					seriesTags: Tags,
				});
				data.save( (err) => {
					if (err)
						return console.error(err);
					else {
						var series_id = data._id;
						fs.renameSync(req.file.path, req.file.path.replace('undefined', series_id));
						videoSeries.findByIdAndUpdate(series_id, { "seriesThumbnail": req.file.path.replace('undefined', series_id) }, (error, result) => {
							if (error) {
								console.log(error);
								res.render('error.ejs', { "message": "", "error": error });
							}
							else {
								res.render('adminRegSeries.ejs', { "message": "Series Info Successfully added!", "error": "" });
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

module.exports = adminregseries;
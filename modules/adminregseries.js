const adminregseries = require('express').Router();

const fs = require("fs");
const fse = require('fs-extra');
const multer = require('multer');
const videoSeries = require('../schemas/videoSeries');

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
			let path = `assets/thumbnails/series`;
			fse.mkdirsSync(path);
			cb(null, path);
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + path.extname(file.originalname));
	}
});

const upload = multer({ storage: storage }).single('seriesimg');

adminregseries.get('/', (req, res) => {
	res.render('adminRegSeries.ejs', { "message": "", "ID": "" });
});

adminregseries.post('/', (req, res) => {
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
				seriesThumbnail: ,
				seriesCategory: Category,
				seriesDuration: {hours: Dhour, minutes: Dmin, seconds: Dsec},
				seriesTags: Tags,

			});
			data.save( (err) => {
				if (err)
					return console.error(err);
				else {
					
				}
			});
		}
	});
});

module.exports = adminregseries;
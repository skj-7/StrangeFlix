var mongoose = require('mongoose');

const video = require('../schemas/videos');

const seriesSchema = new mongoose.Schema({
	seriesTitle: {
		type: String,
		required: true
	},
	seriesDescription: {
		type: String,
		required: true
	},
	seriesPrice: {
		type: Currency,
		required: true,
		min: 0,
		max: 5000000
	},
	seriesThumbnail: {
		type: String,
		required: true
	},
	seriesCategory: {
		type: String,
		required: true
	},
	seriesDuration: durationSchema,
	seriesTags: [String],
	videoList: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Videos'
	}]
}, {
	timestamps: true
});

var series = mongoose.model('Series', seriesSchema);

module.exports = series;
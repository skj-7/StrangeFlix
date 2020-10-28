var mongoose = require('mongoose');

// require('mongoose-currency').loadType(mongoose);
// var Currency = mongoose.Types.Currency;

const durationSchema = new mongoose.Schema({
	_id: false,
	hours: {
		type: Number,
		min: 0,
		default: 0
	},
	minutes: {
		type: Number,
		min: 0,
		max: 59,
		required: true
	},
	seconds: {
		type: Number,
		min: 0,
		max: 59,
		required: true
	}
});

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
		type: Number,
		required: true,
		min: 0
	},
	seriesThumbnail: {
		type: String,
		required: true
	},
	seriesCategory: {
		type: String,
		required: true
	},
	episodeCount: {
		type: Number,
		min: 0,
		required: true,
		default: 0
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
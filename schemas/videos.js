var mongoose = require('mongoose');

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

const durationSchema = new mongoose.Schema({
	_id: false,
	hours: {
		type: Number,
		min: 0,
		max: 10,
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

const videoSchema = new mongoose.Schema({
	_seriesId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Series',
		default: null
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	price: {
		type: Currency,
		required: true,
		min: 0,
		max: 5000000
	},
	thumbnail: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	filepath: {
		type: String,
		required: true
	},
	duration: durationSchema,
	tags: [String],
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Comments'
    }]
}, {
	timestamps: true
});

var video = mongoose.model('Videos', videoSchema);

module.exports = video;
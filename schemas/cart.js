var mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
	_id: false,
	totalCount: {
		type: Number,
		default: 0,
		min: 0,
		required: true
	},
	totalPrice: {
		type: Number,
		default: 0,
		min: 0,
		required: true
	},
	itemsVideo: [{
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Videos'
	}],
	itemsSeries: [{
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Series'
	}]
});

module.exports = cartSchema;
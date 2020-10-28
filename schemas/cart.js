var mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    totalCount: {
        type: Number,
        default: 0,
        min: 0,
		required: true
    },
    totalPrice: {
        type: Number,
		required: true,
		min: 0
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
    }],
});

module.exports = cart;
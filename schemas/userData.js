const mongoose = require('mongoose');

const cartSchema = require('./cart');

var mySchema = new mongoose.Schema({
	fName: {
		type: String,
		required: true
	},
	lName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	age: {
		type: Number,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	isVerified: {
		type: Boolean,
		default: false
	},
	subscriptionCode: {
		type: Number,
		default: 0,
		required: true
	},
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Comments'
	}],
	cart: cartSchema
}, {
	timestamps: true
});

var userdata = mongoose.model('Users', mySchema);

module.exports = userdata;
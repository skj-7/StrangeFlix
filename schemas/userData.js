const mongoose = require('mongoose');

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
	password: {
		type: String,
		required: true
	},
	isVerified: {
		type: Boolean,
		default: false
	}
}, {
	timestamps: true
});

var userdata = mongoose.model('Users', mySchema);

module.exports = userdata;
var mongoose = require('mongoose');

var mySchema = new mongoose.Schema({
	lname: String,
	fname: String,
	email: String,
	password: String
}, {
	timestamps: true
});

var userdata = mongoose.model('registration', mySchema);

module.exports = userdata;
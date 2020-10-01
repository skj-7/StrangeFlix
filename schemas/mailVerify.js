var mongoose = require('mongoose');

var emailVef = new mongoose.Schema({
	email: String,
	token: String,
});

var usertoken = mongoose.model('mailvef', emailVef);

module.exports = usertoken;
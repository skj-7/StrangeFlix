var mongoose = require('mongoose');

const resetPassTokenSchema = new mongoose.Schema({
	_userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Users'
	},
	token: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
		expires: 300
	}
});

var rePassToken = mongoose.model('ResetPassTokens', resetPassTokenSchema);

module.exports = rePassToken;
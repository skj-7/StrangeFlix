var mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    _userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Users'
    },
    _videoId: {
        type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Videos'
    },
	content: {
		type: String,
		required: true
    },
    flagged: {
        type: Boolean,
        required: true,
        default: false
    },
	createdAt: {
		type: Date,
		required: true,
		default: Date.now
	}
});

var comment = mongoose.model('Comments', commentSchema);

module.exports = comment;
var mongoose = require('mongoose');

const flagSchema = new mongoose.Schema({
    flagtype: {
        type: Number,
		required: true,
        min: 0,
        max: 1
    },
    flagid: {
        type: mongoose.Schema.Types.ObjectId,
		required: true
    }
});

var flags = mongoose.model('Flags', flagSchema);

module.exports = flags;
var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var broadcastSchema = new Schema({
	userId : ObjectId,
	broadcastDate : { type: Date, default: Date.now },
	broadcastContent: String,
}, {
    versionKey: false
});

module.exports = mongoose.model('Broadcast', broadcastSchema);

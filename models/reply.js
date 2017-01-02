var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var replySchema = new Schema({
	userId : ObjectId,
	userName: String,
	userIdentity: Number,
	questionId : ObjectId,
	replyDate : { type: Date, default: Date.now },
	replyContent : String
}, {
    versionKey: false
});
module.exports = mongoose.model('Reply', replySchema);

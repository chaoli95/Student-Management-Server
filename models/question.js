var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var questionSchema = new Schema({
	studentId : ObjectId,
	questionDate : { type: Date, default: Date.now },
	questionContent: String,
       	classId : ObjectId,
	questionStatus: Number//0 未解决 1 已解决
}, {
    versionKey: false
});

module.exports = mongoose.model('Question', questionSchema);

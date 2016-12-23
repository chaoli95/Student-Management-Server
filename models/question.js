var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var questionSchema = new Schema({
	studentId : ObjectId,
	questionDate : { type: Date, default: Date.now },
	questionContent: String,
	questionStatus: { type :Boolean, default: false},
    classId : ObjectId
}, {
    versionKey: false
});

module.exports = mongoose.model('Question', questionSchema);

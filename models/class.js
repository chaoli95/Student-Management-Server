var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var classSchema = new Schema({
	studentId :[ObjectId],
	studentLoginName: [String],
	teacherId :ObjectId,
	className :String,
	fileName :[String],
	post: [{
		postContent:String,
		postDate:{type:Date, default: Date.now}
	}]
}, {
    versionKey: false
});

module.exports = mongoose.model('Class', classSchema);

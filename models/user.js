var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var userSchema = new Schema({
	name: String,
	loginname: String,
	password: String,
      	identity: Number, // 0 = ADMIN, 1= STUDENT, 2=TEACHER
	email: String,
	questionOne: String,
	answerOne: String,
	questionTwo: String,
	answerTwo: String,
	questionThree: String,
	answerThree: String,
	message:[{
		senderId: ObjectId,
		message: String,
		date: {type:Date, default:Date.now}
	}]
}, {
    versionKey: false
});

module.exports = mongoose.model('User', userSchema);

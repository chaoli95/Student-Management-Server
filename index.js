var express = require('express');
var bodyParser = require('body-parser');
var site = require('./site');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var sign = require('./userController');
var Class = require('./classController');
var MongoStore = require('connect-mongo/es5')(session);
var mongoose = require('mongoose');
var User = require('./models/user');
var Reply = require('./replyController');
var Question = require('./questionController');
var Admin = require('./adminController');

var app = express();
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection fail:'));
db.once('open',function(){
//  var user = new User({
//    name:'lichao',
//    loginname:'lichao',
//    password:'123456',
//    identity:2
//  });

  //user.save(function(err, user) {
   // if(err)  {
//	    console.log(err);
//	    throw err;
 //   } else {
 //   console.dir(usr);
  //  }
// });

});

mongoose.connect('mongodb://localhost/test');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(session({
  secret: 'this is a test',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db,     
    touchAfter: 24*3600,
    ttl:14*24*3600
  })
}));

app.get('/', site.index);
app.post('/',site.test);
//app.post('/loginWithLoginName', sign.loginWithLoginName);
//app.post('/loginWithEmail', sign.loginWithEmail);
app.post('/login', sign.login);
app.get('/signout', sign.signout);
app.post('/findPassword', sign.findPwd);
app.post('/changePassword', sign.changePwd);
app.post('/getVerifyQuestion', sign.getVerifyQuestion);
//app.get('/login', sign.showLogin);
app.post('/signup', sign.signup);
app.post('/addClass', Class.addClass);
app.get('/selectClass',Class.selectClass);
//app.get('/selectPostByClassId',Class.selectPost);
//app.get('/selectStudent', Class.selectStudent);
app.post('/addStudent',Class.addStudent);
app.post('/removeStudent',Class.removeStudent);
app.post('/addPost', Class.addPost);
app.get('/selectReplyByUserId',Reply.selectReplyByUserId);
app.get('/selectReply',Reply.selectReply);
app.get('/selectReplyByQuestionId',Reply.selectReplyByQuestionId);
app.post('/addReply',Reply.addReply);
app.post('/addQuestion',Question.addQuestion);
app.get('/selectQuestionByClassId',Question.selectQuestionByClassId);
app.get('/selectQuestionByStudentId', Question.selectQuestionByStudentId);
app.post('/markQuestionSolved', Question.markQuestionSolved);
app.get('/selectUnsolvedQuestion', Question.selectUnsolvedQuestionByClassId);
app.get('/getMessage', sign.getMessage);
app.post('/sendMessage', sign.sendMessage);
app.get('/selectUserInfo', sign.selectUserInfo);
app.get('/selectSolvedQuestion', Question.selectSolvedQuestionByClassId);
app.get('/searchClasses', Class.searchclasses);
app.post('/deleteUser',Admin.deleteUser);
app.post('/resetUser',Admin.resetUser);
app.post('/displayData',Admin.displayData);
app.post('/remindTeacher',Admin.remindTeacher);
app.post('/broadcast',Admin.broadcast);
app.post('/groupMessage',Admin.groupMessage);
app.get('/getBroadcast',sign.getBroadcast);
app.listen(3000);

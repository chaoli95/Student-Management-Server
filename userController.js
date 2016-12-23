var User = require('./models/user');
var question = require('./models/question');
var reply = require('./models/question');

exports.login = function (req, res) {
  var loginname = req.body.loginname;
  var password = req.body.password;
  console.log(loginname+' '+password);
  User.findOne({loginname: loginname}, function (err, user) {
    if (!user) {
      console.log('false:no user');
  //    res.redirect('/');
      res.end(JSON.stringify({code:1004, message:"未注册" }));
    } else {
   //   console.log(user);
  	if(password == user.password) {
       		req.session.user = user._id;
  		req.session.identity = user.identity;
    		console.log('session.user = '+req.session.user);
	    //   	res.send(JSON.stringify({ status:"success" }));//给客户端返回一个json格式的数据
	    	res.end(JSON.stringify({code:200, message: "登录成功"}));

	} else {
		res.end(JSON.stringify({code: 1005, message:"密码错误"}));
	}
    }
  });
};

exports.signout = function (req, res) {
  req.session.destroy(function(){
//  res.redirect('/');
  res.end(JSON.stringify({code:200, message:"注销成功"}));
  });
};

//exports.showLogin = function (req, res) {
//  res.redirect('/');
//};

exports.signup = function (req, res) {
  var user = new User({
    loginname:req.body.loginname,
    name:req.body.name,
    password:req.body.password,
    identity:req.body.identity,
    questionOne: req.body.questionOne,
    answerOne: req.body.answerOne,
    questionTwo: req.body.questionTwo,
    answerTwo: req.body.answerTwo,
    questionThree: req.body.questionThree,
    answerThree: req.body.answerThree
  });
  console.log(user);
  User.findOne({loginname: user.loginname}, function(err, savedUser) {
	  if(!savedUser) {
		  user.save(function (err) {
		       	   if(err) {
			   	   res.end(JSON.stringify({code:1002, message:"注册失败"}));
			   	   throw err;
			   } else {
			   	   res.end(JSON.stringify({code:200, message:"注册成功"}));
	       		   }
		  });

	  } else {
	  	res.end(JSON.stringify({code:1003, message:"用户名已存在"}));
	  }
  });
 };

 exports.getVerifyQuestion = function (req, res) {
 	var loginname = req.body.loginname;
	User.findOne({"loginname": loginname}, function (err, user) {
		if(!user) {
			res.end(JSON.stringify({code:1004, message:"未注册",verifyQuestion:[]}));
		} else {
			res.end(JSON.stringify({code:200, message:"成功",verifyQuestion:[user.questionOne,user.questionTwo,user.questionThree]}));
		}
	});	       	
};

 exports.changePwd = function (req, res) {
	var oldPwd = req.body.oldPassword;
	var newPwd = req.body.newPassword;
	if (!req.session.user) {
		res.end(JSON.stringify({code:1000, message:"未登录"}));
	} else {
		var conditions = {_id: req.session.user, password: oldPwd};
		User.findOne(conditions, function (err, user) {
			if(!user) {
				res.end(JSON.stringify({code:1005, message:"密码错误"}));
			} else {
				var update = {$set: {password:newPwd}};
				User.update({_id:user._id},update,function(err) {
					if (err) {
						res.end(JSON.stringify({code: 1002, message:"修改失败"}));

					} else {
						res.end(JSON.stringify({code: 200, message:"成功"}));

					}
				});
			}
		});
	}
 };

exports.findPwd = function (req, res) {
	var answerOne = req.body.answerOne;
	var answerTwo = req.body.answerTwo;
	var answerThree = req.body.answerThree;
	var newPassword = req.body.password;
	var loginname = req.body.loginname;
	var conditions = {loginname: loginname, answerOne: answerOne, answerTwo: answerTwo, answerThree: answerThree};
	User.findOne(conditions, function (err, user) {
		if(!user) {
			res.end(JSON.stringify({code:1006, message:"答案错误"}));
		} else {
			var update = {$set : {password: newPassword}};
			User.update({_id:user._id},update,function(err) {
				if (err) {
					res.end(JSON.stringify({code: 1002, message:"修改失败"}));

				} else {
					res.end(JSON.stringify({code: 200, message:"成功"}));

				}
			});
		}
	});
};

var Class = require('./models/class');
var User = require('./models/user');
var mongoose = require('mongoose');


//exports.selectPost = function (req, res) {
	
//};

exports.addClass = function (req, res) {
	console.log(req.session.user);
	if(!req.session.user) {
		res.send(JSON.stringify({code:1000,message:"请先登录"}));
		res.end();
	} else {
//		User.findById(req.session.user, function(err, user) {
//			console.log(user);
			if(req.session.identity==1) {
				res.send(JSON.stringify({code:1001,message:"用户权限不够"}));
				res.end();
			} else {
				var newClass = new Class({
					teacherId:req.session.user,
					className:req.body.className
				});
				console.log(newClass);
				newClass.save(function (err) {
					if(err) {
						res.send(JSON.stringify({code:1002,message:"添加失败"}));
						res.end();
						throw err;
					} else {
						res.send(JSON.stringify({code:200,message:"添加成功"}));
						res.end();
					}
				});
			}
//		});
	}
}

exports.selectClass = function (req, res) {
	console.log(req.session.user);
	console.log(req.session.identity);
	if(!req.session.user) {
		res.send(JSON.stringify({code:1000,message:"请先登录"}));
		res.end();
	} else {
//		User.findById(req.session.user, function(err, user) {
		//	console.log(user);
			if(req.session.identity == 1) {
				Class.find({"studentId":req.session.user}, { __v:0}, function(err, classes) {
					console.log(classes);
					if(err) {
						res.end("[]");
						throw err;
					} else {
						res.send(JSON.stringify(classes));
						res.end();
					}
				});
			} else if (req.session.identity == 2) {
				Class.find({"teacherId": req.session.user}, { __v:0}, function(err, classes) {
					console.log("hello");
					if(err) {
						res.end("[]");
//						res.end();
						throw err;
					} else {
						console.log(JSON.stringify(classes));
						res.send(JSON.stringify(classes));
						res.end();
					}
				});
			}
	}
}

exports.addStudent = function (req, res) {
	var loginname = req.body.studentName;
	var classId = req.body.classId;
	if(!req.session.user) {
		res.end(JSON.stringify({code:1000,message:"请先登录"}));
	} else {
		if(req.session.identity != 2) {
		       res.end(JSON.stringify({code:1001, message:"用户权限不够"}));
		} else {
			User.findOne({"loginname":loginname}, function (err, user){
				if(!user) {
					res.end(JSON.stringify({code:1004, message:"未找到用户"}));
				} else {
					console.log(user);
					Class.update({_id: classId},{$addToSet:{studentId:user._id}}, function(err) {
						if(err) {
							res.end(JSON.stringify({code:1002, message:"添加失败"}));
						} else {
							res.end(JSON.stringify({code:200, message:"添加成功"}));
						}	
					});
				}
			});
		}		
	}	
}

exports.removeStudent = function (req, res) {
	var loginname = req.body.studentName;
	var classId = req.body.classId;
	if(!req.session.user) {
		res.end(JSON.stringify({code:1000,message:"请先登录"}));
	} else {
		if(req.session.identity != 2) {
			res.end(JSON.stringify({code:1001, message:"用户权限不够"}));
		} else {
			User.findOne({"loginname":loginname}, function (err, user){
				if(!user) {
					res.end(JSON.stringify({code:1004, message:"未找到用户"}));
				} else {
					Class.update({_id: classId},{$pull:{studentId:user._id}}, function(err) {
						if(err) {
							res.end(JSON.stringify({code:1002, message:"删除失败"}));
						} else {
							res.end(JSON.stringify({code:200, message:"删除成功"}));
						}
					});
				}
			});
		}
	}
}

exports.addPost = function (req, res) {
	if(req.session.identity == 2) {
		var postContent = req.body.post; 
		var classId = req.body.classId;
		Class.findById(mongoose.Types.ObjectId(classId), function (err, cla) {
			if(!cla) {
				res.end(JSON.stringify({code:1004,message:"未找到班级"}));
			} else {
				Class.update({_id:cla._id},{$addToSet:{post:{postContent:postContent}}}, function(err) {
					if(err) {
						res.end(JSON.stringify({code:1002, message:"发送失败"}));
					} else {
						res.end(JSON.stringify({code:1002, message:"发送成功"}));
					}
				});
			}
		});
	} else {
		res.end(JSON.stringify({code:1001, message:"用户权限不够"}));
	}
}

exports.searchclasses = function(req,res){
	    Class.find({"className":{"$regex":req.query.name, "$options":"i"}},function(err,results){
		    if(err) {
			    res.end(JSON.stringify({code:1013, message:"获取失败"}));
		    } else {
			    console.log(req.query.name);
			    res.end(JSON.stringify(results));

		    } 
	    });
}

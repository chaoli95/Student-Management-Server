var User = require('./models/user');
var Question = require('./models/question');
var Broadcast = require('./models/broadcast');
var Class = require('./models/class');


exports.deleteUser = function (req,res){
	if (!req.session.user){
		res.end(JSON.stringify({code:1000,message:"请先登录"}));
	}else{
		if (req.session.identity!=0){
			res.end(JSON.stringify({code:1001,message:"权限不足"}));
		}else{
			User.findOne({"loginname":req.body.loginname}, function(err, user){
				if(!user){
					res.end(JSON.stringify({code:1004, message:"未找到用户"}));
				}else{
					User.remove({"loginname":user.loginname},function(err){
						if(err){
							res.end(JSON.stringify({code:1007,message:"删除失败"}));
							throw err;
						}else{
							res.end(JSON.stringify({code:200,message:"删除成功"}));
						}
					});
				}
			});
		}
	}
}

exports.resetUser = function(req,res){
	if(!req.session.user){
		res.end(ISON.stringify({code:1000,message:"请先登录"}));
	}else{
		if (req.session.identity!=0){
			res.end(JSON.stringify({code:1001,message:"权限不足"}));
		}else{
			User.findOne({"loginname":req.body.loginname},function(err,user){
				if(!user){
					res.end(JSON.stringify({code:1004,message:"未找到用户"}));
				}else{
					User.update({"loginname":user.loginname},{$set:{"password":"000000"}},function(err){
					if(err){
						res.end(JSON.stringify({code:1008,message:"重置失败"}));
					}else{
						res.end(JSON.stringify({code:200,message:"重置成功"}));
					}	
				    });
				}
			});
		}
	}
} 

exports.displayData = function(req,res){
	if(!req.session.user){
		res.end(JSON.stringify({code:1000,message:"请先登录"}));
	}else{
		if (req.session.identity!=0){
			res.end(JSON.stringify({code:1001,message:"权限不足"}));
		}else{
			var  str   =    req.body.questionDate;  
            var  day   =    new   Date(str.replace(/-/g,   "/"));
            var  dayafter = new Date(str.replace(/-/g, "/"));
		   dayafter.setDate(dayafter.getDate()+1);
			   console.log(day);
		    console.log(dayafter)
		Question.count({"questionDate":{"$gte": day, "$lt": dayafter},"classId":req.body.classId},function(err,countquestion){
			if(err){
				res.end(JSON.stringify({code:1009,message:"查询失败"}));
			}else{
				console.log(countquestion);
				Question.count({"questionDate":{"$gte":day, "$lt": dayafter},"classId":req.body.classId,questionStatus:true},function(err,countmarkedquestion){	            							if(err){
            					res.end(JSON.stringify({code:1009,message:"查询失败"}));
            				}else{
						if (countquestion==0){
       						     	res.end(JSON.stringify({message:"此日无问题"}));
          					} else{
            						var ratio=countquestion/countmarkedquestion;
            						res.end(JSON.stringify({numofquestion:countquestion,numofmarkedquestion:countmarkedquestion,rate:ratio}));
           					 }
            				}
            			});
			}
		});
            
            
		}
	}
}

exports.remindTeacher = function(req,res){
	if(!req.session.user){
		res.end(JSON.stringify({code:1000,message:"请先登录"}));
	}else{
		if (req.session.identity!=0){
			res.end(JSON.stringify({code:1001,message:"权限不足"}));
		}else{
		  User.findOne({"loginname":req.body.loginname},function(err,user){
		  	if(!user)
		  		res.end(JSON.stringify({code:1004,message:"未找到用户"}));
		  	else if(user.identity!=2)
		  		res.end(JSON.stringify({code:1010,message:"此用户不是老师"}));
		  	else{
                User.update({"loginname":user.loginname},{$addToSet:{message:{senderId:req.session.user,message:"请您及时关注班级同学的问题！"}}},function(err){
					if(err){
						res.end(JSON.stringify({code:1011,message:"提醒失败"}));
					}else{
						res.end(JSON.stringify({code:200,message:"提醒成功"}));
					}	
				    });   
		  	}
		  });
		}
	}
}

exports.broadcast = function(req,res){
	if (!req.session.user){
		res.end(JSON.stringify({code:1000,message:"请先登录"}));
	}else{
		if (req.session.identity!=0){
			res.end(JSON.stringify({code:1001,message:"权限不足"}));
		}else{
			var newBroadcast = new Broadcast({
					userId:req.session.user,
					broadcastContent:req.body.content
				});
				newBroadcast.save(function (err) {
					if(err) {
						res.end(JSON.stringify({code:1002,message:"添加失败"}));
						throw err;
					} else {
						res.end(JSON.stringify({code:200,message:"添加成功"}));
					}
				});
		} 
	}
}

exports.groupMessage = function(req,res){
	if (!req.session.user){
		res.end(JSON.stringify({code:1000,message:"请先登录"}));
	}else{
		if (req.session.identity!=0){
			res.end(JSON.stringify({code:1001,message:"权限不足"}));
		}else{
			Class.findById(mongoose.Types.ObjectId(classId),function(err,cla){
            if (!cla){
            	res.end(JSON.stringify({code:1004,message:"未找到用户"}));
            }else{
            	Class.update({_id:cla.id},{$addToSet:{post:{postContent:req.body.content}}},function(err){
            		if(err) {
						res.end(JSON.stringify({code:1002, message:"发送失败"}));
					} else {
						res.end(JSON.stringify({code:1002, message:"发送成功"}));
					}
            	});
            }
			});
		} 
	}
}


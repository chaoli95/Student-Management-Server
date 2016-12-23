var Question = require('./models/question');
var User = require('./models/user');
var mongoose = require('mongoose');

exports.addQuestion = function (req,res) {
     	 console.log(req.session.user);
       	 if(!req.session.user){
               res.send(JSON.stringify({code:1000,message:"请先登录"}));
               res.end();
       }else {
               if (req.session.identity==1){
               var newQuestion = new Question({
               studentId:req.session.user,
               classId:req.body.classId,
               questionContent:req.body.questionContent      
               });
               console.log(newQuestion);
               newQuestion.save(function (err) {
                       if(err){
                       res.send(JSON.stringify({code:1002,message:"添加失败"}));
                       res.end();
                       throw err;
                       }else {
                           res.send(JSON.stringify({code:200,message:"添加成功"}));
                           res.end();  	
                       }
               });
               } else{
                      res.send(JSON.stringify({code:1003,message:"操作失败"}));
               }
        }
};

exports.selectQuestionByClassId = function(req,res){
       console.log(req.session.user);
       console.log(req.session.identity);
       if(!req.session.user) {
		res.send(JSON.stringify({code:1000,message:"请先登录"}));
		res.end();
	} else {
               Question.find({"classId":req.query.classId},function(err,question){
		       console.log(question);
		       if(err){
			       res.end("[]");
	 		       throw err;
		       }else{
	  		       res.send(JSON.stringify(question));
	  		       res.end();
		       }             
       	       });
	}
};

exports.selectQuestionByStudentId = function(req,res){
       console.log(req.session.user);
       console.log(req.session.identity);
       if(!req.session.user) {
		res.send(JSON.stringify({code:1000,message:"请先登录"}));
		res.end();
	} else {
                if(req.session.identity==1){
        		Question.find({"studentId":req.session.user},function(err,question){
	   		console.log(question);
				if(err){
				res.end("[]");
				throw err;
				}else{
					console.log(JSON.stringify(question));
					res.send(JSON.stringify(question));
					res.end();
				}
			});
		}else{
			res.send(JSON.stringify({code:1003,message:"操作错误"}));
			res.end();
		} 
	}    
};

exports.markQuestionSolved = function(req,res){
       console.log(req.session.user);
       console.log(req.session.identity);
       if(!req.session.user) {
		res.send(JSON.stringify({code:1000,message:"请先登录"}));
		res.end();
	} else {
		Question.findById(req.body.questionId, function (err, question){
			if(err) {
				res.end(JSON.stringify({code:1002,message:"查找失败"}));
				throw err;
			} else {
				if(question.studentId == req.session.user) {
					question.questionStatus = true;
					question.save(function(err) {
						if(err) {
							res.end(JSON.stringify({code:1002, message:"失败"}));
						} else {
							res.end(JSON.stringify({code:200, message:"成功"}));
						}
					});
				} else {
					res.end(JSON.stringify({code:1001, message:"用户权限错误"}));
				}
			}
		});
//                if(req.session.identity==1){
//			Question.find({"studentId":req.session.user},function(err,question){
//	   		console.log(question);
//				if(err){
//				res.end("[]");
//				throw err;
//				}else{
//				question.questionStatus = true;
//				question.save(function(err){});				
//				}
//			});
		
//		}else{
//			res.send(JSON.stringify({code:1003,message:"操作错误"}));
//			res.end();
//		}
	}

};

exports.selectUnsolvedQuestionByClassId = function(req,res){
       console.log(req.session.user);
       console.log(req.session.identity);
       if(!req.session.user) {
		res.send(JSON.stringify({code:1000,message:"请先登录"}));
		res.end();
	} else {
	 	 Question.find({"classId":req.query.classId,"questionStatus":false},function(err,question){
			 console.log(question);
			 if(err){
	 			 res.end("[]");
	 			 throw err;
			 }else{
				res.send(JSON.stringify(question));
	 			res.end();
	 					 

			 }
		 });
	}
};

exports.selectSolvedQuestionByClassId = function(req,res){
       console.log(req.session.user);
       console.log(req.session.identity);
       if(!req.session.user) {
		res.send(JSON.stringify({code:1000,message:"请先登录"}));
		res.end();
	} else {
	 	 Question.find({"classId":req.query.classId,"questionStatus":true},function(err,question){
			 console.log(question);
			 if(err){
	 			 res.end("[]");
	 			 throw err;
			 }else{
				res.send(JSON.stringify(question));
	 			res.end();
	 					 

			 }
		 });
	}
};

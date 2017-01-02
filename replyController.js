var mongoose = require('mongoose');
var User = require('./models/user');
var Reply = require('./models/reply');
var Question = require('./models/question');

exports.selectReply = function(req,res){
    if(!req.session.user) {
		res.end(JSON.stringify({code:1000,message:"请先登录"}));
		//res.end();
	}else {

				Reply.find({"userId":req.session.user}, function(err,replies ) {
					
					if(err) {
						res.end("[]");
						throw err;
					} else {
						res.send(JSON.stringify(replies));
						res.end();
					}
				});
			} 
			}
	

exports.selectReplyByQuestionId = function(req,res){
   if (!req.session.user){
   	 //res.send();
   	 res.end(JSON.stringify({code:1000,message:"请先登录"}));
   }else{
   	Reply.find({"questionId":req.query.questionId},function(err,replies){
   		if(err){
   			res.end("[]");
   			throw err;
   		}else {
   			res.send(JSON.stringify(replies));
   			res.end();
   		}
   	});
   	}
   }

exports.addReply = function(req,res){
	if (!req.session.user){
		res.end(JSON.stringify({code:1000,message:"请先登录"}));
	}else {
	    var newReply = new Reply({
	    	userId : req.session.user,
		userName: req.session.name,
		userIdentity: req.session.identity,
	     	questionId : req.body.questionId,
			replyContent : req.body.replycontent
	    });
	    newReply.save(function (err) {
					if(err) {
						res.send(JSON.stringify({code:1002,message:"添加失败"}));
						res.end();
						throw err;
					} else {
						res.send(JSON.stringify({code:200,message:"添加成功"}));
						res.end();
					}
				});
}}

exports.selectReplyByUserId = function(req,res){
    if(!req.session.user) {
		res.end(JSON.stringify({code:1000,message:"请先登录"}));
		//res.end();
	}else {

				Reply.find({"userId":req.query.userId}, function(err,replies ) {
					
					if(err) {
						res.end("[]");
						throw err;
					} else {
						res.send(JSON.stringify(replies));
						res.end();
					}
				});
			} 
			}


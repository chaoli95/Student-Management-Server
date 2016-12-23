var express = require('express')
var path = require('path')

function index(req, res) {
  console.log(req.session.user);
  if(req.session.user) {
    res.send('log in success<p><a href="/signout">signout</a>');
  } else {
  res.sendFile(path.resolve('views/index.html'));
  }
}

function test(req, res) {
 console.log(req.session.user);
 if(req.session.user) {
  res.send(JSON.stringify({ status:"success" }));
 } else {
	 res.send(JSON.stringify({ status:"fail" }));
			 }
			 }

exports.index = index;
exports.test = test;

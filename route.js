'use strict'
const fs = require('fs');
const express = require('express');
const underscore = require('underscore');
const path = require('path');
const async = require('async');
const request = require("request");
const {server} = require("./configs.json");
const {emitEvent,getDataFromSTPService} = require("./API.js");

module.exports = function(app) {
	'use strict';
	//main router
	var router = express.Router();
	router.use(function(req, res, next) {
		for (let key in req.query) {
			if (req.query[key] == 'true') {
				req.query[key] = true;
			}
			if (req.query[key] == 'false') {
				req.query[key] = false;
			}
		}
		next();
	});
	app.use('/api', router);
  //get ent-token
  router.route('/:database/token').get(function(req,res,next){
    let database = req.params.database;
		let username = req.headers['username']||req.query.username;
		let password = req.headers['password']||req.query.password;

		let authorization = req.headers.authorization;
    if (!authorization || !username || !password) {
      return res.status(400).send({message:"Authorization is required"});
    }
		if(authorization){
			authorization = new Buffer(authorization.replace("Basic ", ""), 'base64').toString().split(":");
			if(authorization.length>1){
				username = authorization[0];
				password = authorization[1];
			}
		}
		if(!database || !username || !password){
			return res.status(400).send({message:"Authorization is required"});
		}
		let url =  server + database + "/gettoken/nodejs?username=" + username + "&password=" + password;
		request(url,function(error,response,body){
			if(error) return res.status(400).send({message:error.message||error});
			if(body.indexOf("ERROR")>=0){
				return res.status(400).send({message:body});
			}
			body = eval("(" + body + ")");
			return res.send(body);
		});
  });
  //logout
  router.route('/:database/logout').get(function(req,res,next){
    let database = req.params.database;
		var token = req.headers['access-token']||req.query.access_token;
		let url =  server + database + "/logout?token=" + token;
		request(url,function(error,response,body){
			if(error) return res.status(400).send({message:error.message||error});
			if(body.indexOf("ERROR")>=0){
				return res.status(400).send({message:body});
			}
			return res.send(body);
		});
  });
	//userinfo
  router.route('/:database/userinfo').get(function(req,res,next){
    let database = req.params.database;
		var token = req.headers['access-token']||req.query.access_token;
		let url =  server + database + "/userinfo?token=" + token;
		request(url,function(error,response,body){
			if(error) return res.status(400).send({message:error.message||error});
			if(body.indexOf("ERROR")>=0){
				return res.status(400).send({message:body});
			}
			try{
				body = JSON.parse(body);
			} catch(e){
			   return res.status(400).send({message:e.message||e});
			}
			return res.send(body);
		});
  });
	//get data
  router.route('/:database/getdata').get(function(req,res,next){
    let database = req.params.database;
		let token = req.headers['access-token']||req.query.access_token;
		let store = req.query.store;
		let url =  server + database + "/getdata?token=" + token + "&store=" + store;
		request(url,function(error,response,body){
			if(error) return res.status(400).send({message:error.message||error});
			if(body.indexOf("ERROR")>=0){
				return res.status(400).send({message:body});
			}
			try{
				body = JSON.parse(body);
			} catch(e){
			  return res.status(400).send({message:e.message||e});
			}
			return res.send(body);
		});
  });
  //ent list
  router.route('/:database/list/:id_list').get(function(req,res,next){
		var database = req.params.database;
    var id_list = req.params.id_list;
		var token = req.headers['access-token']||req.query.access_token;

		var url = server + database + "/list/" + id_list + "?token=" + token;
		var v_q;
		for(let q in req.query){
			if(q!=="access_token"){
				v_q = req.query[q];
				if(v_q==true || v_q=="true"){
					v_q ="1"
				}
				if(v_q==false || v_q=="false"){
					v_q=="0"
				}
				url = url + "&" + q + "=" + encodeURI(v_q);
			}
		}
		request(url,function(error,response,body){
			if(error) return res.status(400).send({message:error.message||error});
			if(body.indexOf("ERROR")>=0){
				return res.status(400).send({message:body});
			}
			try{
				body = JSON.parse(body);
			} catch(e){
			  return res.status(400).send({message:e.message||e});
			}
			res.send(body);
		});
  });
  //ent report
  router.route('/:database/report/:id_rpt/:stt').get(function(req,res,next){
		var database = req.params.database;
	  var id_rpt = req.params.id_rpt;
	  var stt = req.params.stt;
		var token = req.headers['access-token']||req.query.access_token;

		var url = server + database + "/report/" + id_rpt + "/" + stt +  "?token=" + token;
		var v_q;
		for(let q in req.query){
			if(q!=="access_token"){
				v_q = req.query[q];
				if(v_q==true || v_q=="true"){
					v_q ="1"
				}
				if(v_q==false || v_q=="false"){
					v_q=="0"
				}
				url = url + "&" + q + "=" + encodeURI(v_q);
			}

		}
		request(url,function(error,response,body){
			if(error) return res.status(400).send({message:error.message||error});
			if(body.indexOf("ERROR")>=0){
				return res.status(400).send({message:body});
			}
			try{
				body = JSON.parse(body);
			} catch(e){
			  return res.status(400).send({message:e.message||e});
			}
			res.send(body);
		});
  });
  //ent voucher
  router.route('/:database/voucher/:voucherid').get(function(req,res,next){
    var database = req.params.database;
    var voucherid = req.params.voucherid;
		var token = req.headers['access-token']||req.query.access_token;
    var url = server + database + "/voucher/" + voucherid +"?token=" + token;
		var v_q;
		for(var q in req.query){
			if(q!=="access_token"){
				v_q = req.query[q];
				if(v_q==true || v_q=="true"){
					v_q ="1"
				}
				if(v_q==false || v_q=="false"){
					v_q=="0"
				}
				url = url + "&" + q + "=" + encodeURI(v_q);
			}
		}
		request(url,function(error,response,body){
			if(error) return res.status(400).send({message:error.message||error});
			if(body.indexOf("ERROR")>=0){
				return res.status(400).send({message:body});
			}
			try{
				body = JSON.parse(body);
			} catch(e){
			  return res.status(400).send({message:e.message||e});
			}
			res.send(body);
		});
  });
  router.route('/:database/voucher/:voucherid/update/:stt_rec').get(function(req,res,next){
    var database = req.params.database;
    var voucherid = req.params.voucherid;
		var token = req.headers['access-token']||req.query.access_token;
    var stt_rec = req.params.stt_rec;
    let url = server + database + "/voucher/" + voucherid +"/update/" + stt_rec + "?token=" + token;
		let v_q;
		for(let q in req.query){
			if(q!=="access_token"){
				v_q = req.query[q];
				url = url + "&" + q + "=" + encodeURI(v_q);
			}
		}
		request(url,function(error,response,body){
			if(error) return res.status(400).send({message:error.message||error});
			if(body.indexOf("ERROR")>=0){
				return res.status(400).send({message:body});
			}
			try{
				body = JSON.parse(body);
			} catch(e){
			  return res.status(400).send({message:e.message||e});
			}
			res.send(body);
		});
  });
	router.route('/:database/send-notification/:user/:event').get(async (req,res,next)=>{
    let user = req.params.user;
		let event = req.params.event;
		let token = req.headers['access-token']||req.query.access_token;
		let title = req.query.title;
		let _data ={
			title:title
		}
		try{
			await emitEvent(user, event, _data, true, token);
			res.send("OK");
		}catch(e){
			return res.status(400).send({message:e.message||e});
		}

  });
};

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
	const router = express.Router();
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
    const database = req.params.database;
		let username = req.headers['username']||req.query.username;
		let password = req.headers['password']||req.query.password;
		let authorization = req.headers.authorization;
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
    const database = req.params.database;
		const token = req.headers['access-token']||req.query.access_token;
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
  router.route('/:database/gridinfo/:gridid').get(function(req,res,next){
    const database = req.params.database;
		const gridid = req.params.gridid;
		const token = req.headers['access-token']||req.query.access_token;
		let url =  server + database + "/gridinfo/" + gridid + "?token=" + token;
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
	router.route('/:database/list/:id_list/info').get(function(req,res,next){
		const database = req.params.database;
    const id_list = req.params.id_list;
		const token = req.headers['access-token']||req.query.access_token;
		let url =  server + database + "/list/" + id_list + "/info?token=" + token;
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
		const database = req.params.database;
    const id_list = req.params.id_list;
		const token = req.headers['access-token']||req.query.access_token;

		let url = server + database + "/list/" + id_list + "?token=" + token;
		let v_q;
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
	router.route('/:database/report/:id_rpt/:stt/info').get(function(req,res,next){
		const database = req.params.database;
    const id_rpt = req.params.id_rpt;
		const stt = req.params.stt;
		const token = req.headers['access-token']||req.query.access_token;
		let url =  server + database + "/report/" + id_rpt + "/" + stt + "/info?token=" + token;
		request(url,function(error,response,body){
			if(error){
				console.error(error);
				console.error(url);
				return res.status(400).send({message:error.message||error});
			}
			if(body.indexOf("ERROR")>=0){
				console.error(body);
				console.error(url);
				return res.status(400).send({message:body});
			}
			try{
				body = JSON.parse(body);
			} catch(e){
				console.error(body);
				console.error(url);
			  return res.status(400).send({message:e.message||e});
			}
			return res.send(body);
		});
  });
  router.route('/:database/report/:id_rpt/:stt').get(function(req,res,next){
		const database = req.params.database;
	  const id_rpt = req.params.id_rpt;
	  const stt = req.params.stt;
		const token = req.headers['access-token']||req.query.access_token;
		let url = server + database + "/report/" + id_rpt + "/" + stt +  "?token=" + token;
		let v_q;
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
			if(error){
				console.error(error);
				console.error(url);
				return res.status(400).send({message:error.message||error});
			}
			if(body.indexOf("ERROR")>=0){
				console.error(body);
				console.error(url);
				return res.status(400).send({message:body});
			}
			try{
				body = JSON.parse(body);
			} catch(e){
				console.error(body);
				console.error(url);
			  return res.status(400).send({message:e.message||e});
			}
			res.send(body);
		});
  });
  //ent voucher
	router.route('/:database/voucher/:voucherid/info').get(function(req,res,next){
		const database = req.params.database;
    const voucherid = req.params.voucherid;
		const token = req.headers['access-token']||req.query.access_token;
		let url =  server + database + "/voucher/" + voucherid + "/info?token=" + token;
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

  router.route('/:database/voucher/:voucherid').get(function(req,res,next){
    const database = req.params.database;
    const voucherid = req.params.voucherid;
		const token = req.headers['access-token']||req.query.access_token;
    let url = server + database + "/voucher/" + voucherid +"?token=" + token +"&ma_ct=" + voucherid;
		let v_q;
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
    const database = req.params.database;
    const voucherid = req.params.voucherid;
		const token = req.headers['access-token']||req.query.access_token;
    const stt_rec = req.params.stt_rec;
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
	router.route('/:database/optgroupby').get(function(req,res,next){
		const database = req.params.database;
		const token = req.headers['access-token']||req.query.access_token;
		const where = req.query.where ||"1=0";
		const store = "select codeid,headerV as txt,headerE as txt2 from optgroupby where " + where;
		let url =  server + database + "/getdata?token=" + token + "&store=" + store;
		request(url,function(error,response,body){
			if(error) return res.status(400).send({message:error.message||error});
			if(body.indexOf("ERROR")>=0){
				return res.status(400).send({message:body});
			}
			try{
				body = JSON.parse(body);
				body = JSON.parse(body);
				return res.send(body.Table);
			} catch(e){
			  return res.status(400).send({message:e.message||e});
			}
		});
  });
	router.route('/:database/dmitemofcbb/:form/:name').get(function(req,res,next){
		const database = req.params.database;
		const token = req.headers['access-token']||req.query.access_token;
		const form = req.params.form;
		const name = req.params.name;
		const store = `select * from dmitemofcbb where form='${form}' and name='${name}'`;
		let url =  server + database + "/getdata?token=" + token + "&store=" + store;
		request(url,function(error,response,body){
			if(error) return res.status(400).send({message:error.message||error});
			if(body.indexOf("ERROR")>=0){
				return res.status(400).send({message:body});
			}
			try{
				body = JSON.parse(body);
				body = JSON.parse(body);
				return res.send(body.Table);
			} catch(e){
			  return res.status(400).send({message:e.message||e});
			}
		});
  });
	router.route('/:database/send-notification/:user/:event').get(async (req,res,next)=>{
		const database = req.params.database;
    const user = req.params.user;
		const event = req.params.event;
		const token = req.headers['access-token']||req.query.access_token;
		const endpoint = req.query.endpoint;
		const _data =Object.assign({},req.query);
		if(_data.title) _data.title = unescape(_data.title);
		delete _data.access_token;
		try{
			await emitEvent(user, event, _data, true,database,token,endpoint);
			res.send("OK");
		}catch(e){
			return res.status(400).send({message:e.message||e});
		}

  });
};

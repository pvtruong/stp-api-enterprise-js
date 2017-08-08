/*Copyright (C) 2015  Sao Tien Phong (http://saotienphong.com.vn)


This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
'use strict'
var fs = require('fs');
var express = require('express');
var underscore = require('underscore');

var path = require('path');

var async = require('async');
var server = "http://localhost:1985/";
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
    var request = require("request");
    router.route('/:database/token').get(function(req,res,next){
        let database = req.params.database;
		
		let username = req.headers['username']||req.query.username;
		let password = req.headers['password']||req.query.password;
		
		if(!database || !username || !password){
			return res.status(400).send("Chức năng này yêu cầu tham số 'username','password'");
		}
		let url =  server + database + "/gettoken/nodejs?username=" + username + "&password=" + password;
		request(url,function(error,response,body){
			if(error) return res.status(400).send(error);
			if(body.indexOf("ERROR")>=0){
				return res.status(400).send(body);
			}
			body = eval("(" + body + ")");
			return res.send(body);
		});
    });
    //logout
    var request = require("request");
    router.route('/:database/logout').get(function(req,res,next){
        let database = req.params.database;
		var token = req.headers['access-token']||req.query.access_token;
		let url =  server + database + "/logout?token=" + token;
        
		request(url,function(error,response,body){
			if(error) return res.status(400).send(error);
			if(body.indexOf("ERROR")>=0){
				return res.status(400).send(body);
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
			if(error) return res.status(400).send(error);
			if(body.indexOf("ERROR")>=0){
				return res.status(400).send(body);
			}
			try{
				body = JSON.parse(body);

			} catch(e){
			   return res.status(400).send(e + "\n" + url);
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
			if(error) return res.status(400).send(error);
			if(body.indexOf("ERROR")>=0){
				return res.status(400).send(body);
			}
			try{
				body = JSON.parse(body);

			} catch(e){
			   return res.status(400).send(e + "\n" + url);
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
			if(error) return res.status(400).send(error);
			if(body.indexOf("ERROR")>=0){
				return res.status(400).send(body);
			}
			try{
				body = JSON.parse(body);

			} catch(e){
			   return res.status(400).send(e + "\n" + url);
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
			if(error) return res.status(400).send(error);
			if(body.indexOf("ERROR")>=0){
				return res.status(400).send(body);
			}
			try{
				body = JSON.parse(body);

			} catch(e){
			   return res.status(400).send(e + "\n" + url);
			}


			res.send(body);
		});
    });
 
};

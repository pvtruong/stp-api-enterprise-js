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
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

var underscore = require('underscore');
var https = require("https");
var http = require('http');
var fs = require("fs");
var async = require('async');

var app = express();
var compress = require('compression');
app.use(compress());


//
app.options('/*', function(req, res) {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with,X-Access-Token,Authorization');
    res.sendStatus(200);
});
app.use(function(req, res, next) {
	//allow cross domain
	res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with,X-Access-Token,Authorization');
    next();

});
var path = require("path");
app.use('/', express.static(__dirname + '/public'));
//app.use('/admin', express.static(__dirname + '/public'));
app.use('/templates', express.static(__dirname + '/templates'));
app.use('/images', express.static(__dirname + '/images'));
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
//
var server = http.createServer(app);
//route
var route = require('./route');
route(app);
//start server
var port = "1986";
server.listen(port, function() {
	console.log('server start at ' + port + ' port');
});



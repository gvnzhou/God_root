'use strict';
var router = require('koa-router')();
var koaBody = require('koa-body')();
var config = require('../config');
var mysql = require('../core/mysql_test');
var $ = require('../models/meeko');
var laytpl = require('../models/laytpl');
var cofs = require('co-fs');
var __ = require('lodash');
var server = require('../core');
var querystring = require('querystring');

router
  // 系统安装界面
  .get('/setup', function *(next) {
    let _f = yield cofs.readFile(`${__dirname}/../setup/setup.html`, 'utf-8');
  	let data = config.root.mysql;
  	this.set('Content-Type', 'text/html; charset=utf-8;');
	this.body = laytpl(_f).render(data);
  })
  // 初始化系统
  .post('/sys/init',koaBody, function *(next) {
  	try {
  		config.root.mysql = __.extend(config.root.mysql,this.request.body);
  		yield server();

  		

	  	this.body = {
	  		msg:'System is initing'
	  	};
  	} catch(e) {
  		console.log(e.toString());
  	}
  })
  // 后台用户登陆
  .post('/admin/login', koaBody, function*(next) {
  		try {
  			console.log(this.request.body);
  			let user = this.request.body.name;
  			let pwd = this.request.body.pwd;

  			let res = yield mysql.query(`
				SELECT name FROM root_users WHERE name = '${user}';
  			`);
  			//console.log(res[0]);
  			if (res[0]) {
  				//console.log("存在");
  				let res = yield mysql.query(`
					SELECT name FROM root_users WHERE pwd = '${pwd}' AND name = '${user}';
	  			`);
	  			//console.log(res[0]);
	  			if (res[0]) {
	  				this.body = {
	  					code:200,
	  					msg:"登陆成功"
  					}
	  			} else {
	  				this.body = {
	  					code:405,
	  					msg:"密码错误"
  					}
	  			}
  			} else {
  				this.body = {
  					code:404,
  					msg:"用户不存在"
  				}
  			}
	    	// => POST body
	    	//this.body = JSON.stringify(this.request.body);
  		} catch(e) {
  			console.log(e.toString());
  		}
	  }
	)
  	// 获取后台导航菜单API
  	.get('/admin/menu/get', function*(next) {
		try {
			let res = yield mysql.query(`
				SELECT name FROM root_main_tree WHERE pid = 2; 
			`);
			this.body = res;
		} catch (e) {
			console.log(e.toString());
		}
	})
  	// 根据id获取的第一层子节点
	.get('/tree/get_son' ,function*(next){
		try {
			var params = querystring.parse(this.req._parsedUrl.query); 
			let res = yield mysql.query(`
				SELECT * FROM root_main_tree WHERE pid = ${params.id};                    
			`);
			if (res[0]) {
				this.body = {
					msg:200,
					data:res
				}
			} else {
				this.body = {
					msg:404
				}
			}
		} catch (e) {
			console.log(e.toString());
		}
	})
	// 创建项目
	.post('/project/add', function*(next) { 
		// 判断是项目还是子节点


		var data = {
			// pid
			// 名称
			// 

		}
	}); 


module.exports = router;


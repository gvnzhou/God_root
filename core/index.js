'use strict';
var mysql = require('./mysql_test');
var config = require('../config');
var sqlInit = require('./sqlinit');


// 初始化file



// 初始化数据表数据
function* initDBTableData() {
	try {
		let res = yield mysql.query(sqlInit.initDBTableData);
		console.log("Migrations: Initing Origin Data...");
		// console.log(res);
		if (res[0]) {
			console.log("Migrations: Init Success!");
		}
	} catch (e) {
		console.log(e.toString());
	}
}

// 创建并初始化表结构
function* initDBTable() {
	try {
		let res = yield mysql.query(sqlInit.initDBTable);
		console.log(`Migrations: Creating table!`);
		console.log(`Migrations: Completed!`);
		yield initDBTableData();
	} catch (e) {
		console.log(e.toString());
	}
}

// 初始化
function* init() {
	try {
		let res = yield mysql.query(sqlInit.isExistTable);
		//console.log(res[0]);
		if (!res[0]) {
			yield initDBTable();
		}
	} catch (e) {
		console.log(e.toString());
	}
}

module.exports = init;
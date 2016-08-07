'use strict';
var mysql = require('./mysql_test');
var config = require('../config');
var sqlInit = require('./sqlinit');
var cofs = require('co-fs');
var path = require('path');

// 存放文件夹名字
var arrFolder = [`../root/css`,`../root/js`,`../root/imgs`,`../root/fonts`,`../root`];

// 生成root文件夹和文件
function* genFolderAndFile() {
    console.log("Migrations: Generating folders and files...");
    arrFolder.forEach(function (item, idx) {
       cofs.mkdir(path.join(__dirname, item));
    })
    console.log("Migrations: Generated success!");
}

// 初始化文件数据


// 初始化数据表数据
function* initDBTableData() {
	try {
		let res = yield mysql.query(sqlInit.initDBTableData);
		console.log("Migrations: Initing Origin Data...");
		// console.log(res);
		if (res[0]) {
			console.log("Migrations: Init Success!");
            yield genFolderAndFile();
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
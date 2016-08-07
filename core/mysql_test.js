var wrapper = require('co-mysql');
var Mysql = require('mysql');
var config = require('../config');

var pool = Mysql.createPool(config.root.mysql); 
var mysql = wrapper(pool);

console.log("Migrations: " + config.root.mysql.database + " pool connect!");

module.exports = mysql;
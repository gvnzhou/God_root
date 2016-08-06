'use strict';
var koa = require('koa');
var app = koa();
var staticServer = require('koa-static');
var path = require('path');
var route = require('./routes');

app.use(route.routes());

app.use(staticServer(path.join(__dirname, '')));

app.listen(3000, function(){
	console.log('the god is running.');
});


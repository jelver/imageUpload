
/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , http = require('http');

var formidable = require("formidable");

var app = express();
var fs=require('fs');

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});


app.get('/', routes.index);//主页面
app.get('/upload',routes.upload);//上传图片页面
app.get('/show/:imaNames',routes.show);//传送图片接口
app.get('/getImageNameJson',routes.getImageNameJson);//传送服务器图片存储json
app.post('/upload/image',routes.postFile);//上传图片接口
app.get("/delete/:id",routes.delete);//删除图片接口
app.get("/javaScriptCss/:file",routes.javaScriptCss)
http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
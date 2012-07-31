/*
 * GET home page.
 */
var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");

exports.index = function (req, res) {
    fs.readdir("./public/images/", function (err, files) {//读取文件夹下文件
        var count = files.length,
            results = new Array();
        if(count==0){
            res.render('index',{imageNameJson: results});
            res.end();
        }
        else{
        files.forEach(function (filename) {
            fs.readFile(filename, function (data) {
                var tmpResult = {};
                tmpResult["imageName"] = filename;
                tmpResult["imagePath"] = "./public/images/" + filename;
                results[count-1] = tmpResult;
                count--;
                if (count <= 0) {
                    console.log(results);
                   var resultsString= JSON.stringify(results);
                    res.render('index',{imageNameJson: results});
                    res.end();
                }
            });
        });
        }
    });
};

exports.javaScriptCss = function (req, res) {
    switch (req.params.file) {
        case 'function.js':
            fs.readFile('./public/javascripts/function.js', function (err, data) {
                if (err) throw err;
//              res.contentType("text/javaScript");
                res.send(data);
                res.end();
            });
            break;
        case 'jquery-1.7.2.js':
            fs.readFile('./public/javascripts/jquery-1.7.2.js', function (err, data) {
                if (err) throw err;
//                res.contentType("text/javaScript");
                res.send(data);
                res.end();
            });
            break;
        case 'style.css':
            fs.readFile('./public/stylesheets/style.css', function (err, data) {
                if (err) throw err;
                res.contentType("css");
                res.send(data);
                res.end();
            });
            break;
        case 'uploadStyle.css':
            fs.readFile('./public/stylesheets/uploadStyle.css', function (err, data) {
                if (err) throw err;
                res.contentType("css");
                res.send(data);
                res.end();
            });
    }
};

exports.upload = function (req, res) {
    res.render('file-upload');
    res.end();
};


exports.postFile = function (req, res, next) {//用户上传图片
    fs.readdir("./public/images/", function (err, files) {
        var count = files.length + 1;
        if (req.files.addImage.size == 0)//判断用户上传的内容是否为空
        {
            res.redirect('http://localhost:3000/upload');
//            res.send("<br>"+"<br>"+"<br>"+"请选择需要上传的文件！！！");
        }
        else {
            var tmp_path = req.files.addImage.path; // 获得文件的临时路径
            var target_path = './public/images/' + req.files.addImage.name;// 指定文件上传后的目录
            fs.rename(tmp_path, target_path, function (err) { // 移动文件
                if (err) throw err;
                fs.unlink(tmp_path, function () {// 删除临时文件夹文件,
                    if (err) throw err;
                    res.redirect('http://localhost:3000');
                    res.end();
                });
            });
        }
    });
};

exports.show = function (req, res) {
    var ima = req.params.imaNames;
    fs.readFile("./public/images/" + ima, "binary", function (error, file) {
        if (error) {
            res.writeHead(500, {"Content-Type":"text/plain"});
            res.write(error + "\n");
            res.end();
        }
        else {
            res.writeHead(200, {"Content-Type":"image/png"});
            res.write(file, "binary");
            res.end();
        }
    });
};
exports.delete = function (req, res) {//删除图片
    var fileName = req.params.id;
    fs.unlink("./public/images/" + fileName);
    res.redirect('http://localhost:3000');
};
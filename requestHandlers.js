var exec = require("child_process").exec;
var formidable = require("formidable");
var fs = require("fs");
function start(response, postData) {
    console.log("Request handler 'start' was classed.");
    var body = '<html>' + 
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html;" ' +
        'charset=UTF-8" />' +
        '</head>' +
        '<body>'+
        '<form action="/upload" enctype="multipart/form-data" '+
        'method="post">'+
        '<input type="file" name="upload">'+
        '<input type="submit" value="Upload file" />'+
        '</form>'+
        '</body>'+
        '</html>';
    response.writeHead(200, {
        "Content-Type" : "text/html"
    });
    response.write(body);
    response.end();
}

function upload(response, request) {
    console.log("Request handler 'upload' was called.");
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files){
        
    console.log("parsing done");
    fs.renameSync(files.upload.path, "/tmp/test.png");
    response.writeHead(200, {"Content-Type" : "text/html"});
    response.write("received image:<br/>");
    response.write("<img src='/show' />");
    response.end();
    })
}
function show(response, postData) {
    console.log("Request handler 'show' was clled.");
    fs.readFile("/tmp/test.png", "binary", function(error, file) {
        if (error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(err + "\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
}
/*
 * 用于了解非阻塞，阻塞
 * 阻塞：访问/startBlk 再/uploadBlk，/uploadBlk要等/startBlk完成
 * 非阻塞： 基于事件轮询的非阻塞，/uploadBlk不需要等/startBlk就完成
 * */
function startBlk(response) {
    console.log("Request handler 'start' was called.");
    var content = "empty";
    
    exec("sleep 5 && find /",
        {
            timeout : 10000,
            maxBuffer : 20000*102,
        },
        function (error, stdout, stderr){
        response.writeHead(200, {
            "Content-Type" : "text/plain"
        });
        response.write(stdout);
        response.end();
    });
}


function uploadBlk(response) {
    console.log("Request handler 'upload' was called.");
    response.writeHead(200, {
        "Content-Type" : "text/plain"
    });
    response.write("Hello Upload");
    response.end();
}

exports.start = start;
exports.upload = upload;
exports.startBlk = startBlk;
exports.uploadBlk = uploadBlk;
exports.show = show;

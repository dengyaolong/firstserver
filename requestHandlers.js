var exec = require("child_process").exec;
function start(response, postData) {
    console.log("Request handler 'start' was classed.");
    var body = '<html>' + 
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html;" ' +
        'charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="upload" method="post">' +
        '<textarea name="text" rows="20" cols="60"></textarea>' +
        '<input type="submit" value="Submit text" />' +
        '</form>' +
        '</html>';
    response.writeHead(200, {
        "Content-Type" : "text/html"
    });
    response.write(body);
    response.end();
}

function upload(response, postData) {
    console.log("Request handler 'upload' was called.");
    response.writeHead(200, {
        "Content-Type" : "text/plain"
    });
    console.log("You've sent ", postData);
    response.write('hello'+postData);
    response.end();
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

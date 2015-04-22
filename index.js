var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/startBlk"] = requestHandlers.startBlk;
handle["/uploadBlk"] = requestHandlers.uploadBlk;

server.start(router.route, handle);


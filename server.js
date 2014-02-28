var http = require("http"),
    url = require("url");

function start(route, handle){
  var onRequest = function(req, res){
    var pathname = url.parse(req.url).pathname;
    console.log("Request " +pathname+ " received");
    
    route(handle, pathname, res, req);
  }; 

  http.createServer(onRequest).listen(8000);
  console.log("Server is working!");
}

exports.start = start;
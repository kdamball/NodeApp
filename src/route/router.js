function route(handle, path, response, request){
  console.log("About to route request for " +path);
  if (typeof handle[path] === "function"){
    return handle[path](response, request);
  }else{
    console.log("No request handler found for " +path);
    response.writeHead(404, {"Content Type": "text/plain"});
    response.write("404 Not Found")
    response.end();
  }
}

exports.route = route;
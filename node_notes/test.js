/* //Reading a file buffer
var fs = require('fs');
  fs.open('./NodeJS.txt', 'r', function opened(err, fd) {
      if (err) { throw err }
      var readBuffer = new Buffer(1024),
        bufferOffset = 0,
        bufferLength = readBuffer.length,
        filePosition = 100;
      fs.read(fd,
              readBuffer,
              bufferOffset,
              bufferLength,
              filePosition,
              function read(err, readBytes) {
                if (err) { throw err; }
                console.log('just read ' + readBytes + ' bytes');
                if (readBytes > 0) {
                  console.log(readBuffer.slice(0, readBytes));
                }
              });
}); 
*/


/* //Write to file
    var fs = require('fs');
    fs.open('./test.txt', 'a', function opened(err, fd) {
      if (err) { throw err; }
      var writeBuffer = new Buffer('writing this string'),
        bufferPosition = 0,
        bufferLength = writeBuffer.length, 
        filePosition = null;
      fs.write( fd,
                writeBuffer,
                bufferPosition,
                bufferLength,
                filePosition, 
                function wrote(err, written) {
                  if (err) { throw err; }
                  console.log('wrote ' + written + ' bytes');
                });
    }); 
*/


/* //Child Process
  var child = require("child_process"),
    exec = child.exec,
    cmd = "type *";

  exec(cmd, function(err, stdout, stderr){
    console.log(stdout);
  }) 
*/


/* //Passing Environment vars to a child process
  var env = process.env,
   varName,
   envCopy = {},
   exec = require('child_process').exec;
  // Copy process.env into envCopy
  for (varName in env) {
   envCopy[varName] = env[varName];
  }
  // Assign some custom variables
  envCopy['CUSTOM ENV VAR'] = 'some value';
  envCopy['CUSTOM ENV VAR 2'] = 'some other value';
  // Execute some command with process.env and my custom variables
  exec('dir', { env: envCopy }, function(err, stdout, stderr) {
   if (err) { throw err; }
   console.log('stdout:', stdout);
   console.log('stderr:', stderr);
  }); 
*/


/* //Running another JS file with child process
  var exec = (require("child_process")).exec;
  // have to include "" below because '' doesn't work with cmd
  exec('"' + process.execPath + '" child.js', {env: {number: 123}}, function(err, stdout, stderr){
    if (err) {throw err};
    console.log("stdout: \n", stdout);
    console.log("stderr: \n", stderr);
  });
*/

 
/*  //CMD inputs: unpause the stdin stream
  var number=0;
  process.stdin.resume();
  process.stdin.on('data', function(data) {
    Number(data)!== NaN? number+= Number(data) : number = data;
   try {
    ++number;
   process.stdout.write(number + "\n");
   } catch(err) {
   process.stderr.write(err.message + "\n");
   }
  });
*/

 
/*  //CHILD PROCESS SPAWN
  var spawn = require('child_process').spawn;
  //Spawn the child with a node process executing the plus_one app
  //SPAWN IGNORES PATHEXT, no need to use process.execPath!!!!!
  var child = spawn('node', ['plus_one.js']); 
  //Call this function every 1 second (1000 milliseconds):
  setInterval(function() {
   
   // Create a random number smaller than 10,000
   var number = Math.floor(Math.random() * 10000);
   
   // Send that number to the child process:
   child.stdin.write(number + "\n");
   
   // Get the response from the child process and print it:
   child.stdout.once('data', function(data) {
   console.log('child replied to ' + number + ' with: ' + data);
   });
  }, 2000);
  child.stderr.on('data', function(data) {
   process.stdout.write(data);
  });
*/

 
/* Timeout a connection/socket (NOT A SERVER!!)
  var server = require('net').createServer(function(socket) {
    var timeout = 1000; // 1 minute
    socket.setTimeout(timeout);
    socket.on('timeout', function() {
      socket.write('idle timeout, disconnecting, bye!');
      socket.end();
    });
  }).listen(4001); 
*/


/* TCP Server
  var server = require('net').createServer(function(socket) {
    console.log('new connection');
    socket.setEncoding('utf8');
    socket.write("Hello! You can start typing. Type 'quit' to exit.\n");
    socket.on('data', function(data) {
      console.log('got:', data.toString())
      if (data.trim().toLowerCase() === 'quit') {
        socket.write('Bye bye!');
        return socket.end();
      }
      // socket.write(data);
    });
    socket.on('end', function() {
      console.log('Client connection ended');
    });
  }).listen(4001); 
*/


/* Pipe Stream from Socket
  var ws = require('fs').createWriteStream('mysocketdump.txt');
  require('net').createServer(function(socket) {
   socket.pipe(ws);
  }).listen(4001); 
*/


/* // Chat App 
  var net = require('net');
  var server = net.createServer();
  var sockets = [];
  server.on('connection', function(socket) {
    console.log('got a new connection ');
    sockets.push(socket);
    socket.write("Welcome! " +(sockets.length-1)+ " other connections");
    sockets.forEach(function(otherSocket){
      if(otherSocket !== socket){
        otherSocket.write("We have a new connection, total of " +sockets.length+ " are connected")
      }
    });
    socket.on('data', function(data) {
      console.log('got data:', data.toString());
      sockets.forEach(function(otherSocket) {
        if (otherSocket !== socket) {
          otherSocket.write(data.toString());
        }
      });
    });

  });
  server.on('error', function(err) {
    console.log('Server error:', err.message);
  });
  server.on('close', function() {
    console.log('Server closed');
  });
  server.listen(4001, "169.254.206.193");
 */


/* //HTTP Server
  var util = require("util");
  require("http").createServer(function(req, res){
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end(util.inspect(req.headers));
  }).listen(8000)
*/

 
/* //HTTP File piping
  var fs = require("fs");
  require("http").createServer(function(req, res){
    res.writeHead(200, {"Content-Type": "video/mp4"});
    rs = fs.createReadStream("sample.mp4");
    rs.pipe(res);
  }).listen(8000);
*/

 
/* //TCP Client that reconnects
  var net = require('net');
  var port = 4001;
  var quitting = false;
  var conn;
  var retryTimeout = 3000; // 3 seconds
  var retriedTimes = 0;
  var maxRetries = 10;

  process.stdin.resume();
  process.stdin.on('data', function(data) {
    if (data.toString().trim().toLowerCase() === 'quit') {
      quitting = true;
      console.log('quitting...');
      conn.end();
      process.stdin.pause();
    } else {
      conn.write(data);
    }
  });
  (function connect() {
    function reconnect() {
      if (retriedTimes >= maxRetries) {
        throw new Error('Max retries have been exceeded, I give up.');
      }
      retriedTimes += 1;
      setTimeout(connect, retryTimeout);
    }
    conn = net.createConnection(port);
    conn.on('connect', function() {
      retriedTimes = 0;
      console.log('connected to server');
    });
    conn.on('error', function(err) {
      console.log('Error in connection:', err);
    });
    conn.on('close', function() {
      if (! quitting) {
        console.log('connection got closed, will try to reconnect');
        reconnect();
      }
    });
    conn.pipe(process.stdout, {end: false});
  }());
    //if you're connecting to localhost, omit the host argument - net.createConnection(port, connectionListener)
*/


/* //Get request (and bonus local writing of the request)
  var http = require("http"),
    fs = require("fs");

  var options = {
    host: "www.kdamball.com",
    port: 80,
    path: "/resume"
  };
  var localFile = fs.createWriteStream("resume.pdf");
  
  http.get(options, function(res){
    console.log("getting it");
    res.pipe(localFile);
  });
 */
 
 
 /*  //Request Server
  require('http').createServer(function(req, res) {
    function printBack() {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(JSON.stringify({
        name: "Kado Damball",
        url: req.url,
        method: req.method,
        headers: req.headers
      }));
    }
    switch (req.url) {
      case'/redirect':
        res.writeHead(301, {"Location": '/'});
        res.end();
        break;
      case'/print/body':
        req.setEncoding('utf8');
        var body = '';
        req.on('data', function(d) {
          body += d;
        });
        req.on('end', function() {
          res.end(JSON.stringify(body));
        });
        break;
      default:
        printBack();
        break;
    }
  }).listen(4001);
*/


/* //Preventing Callback hell with generic ﬂow control mechanism.
  var fs = require('fs');
  
  function cascade(callbacks, callback) {
  // clone the array
    var functions = callbacks.slice(0);
    function processNext(err) {
      if (err) {
        return callback(err);
      }
      var args = Array.prototype.slice.call(arguments);
      var func = functions.shift();
      if (func) {
      // remove first argument containing the error
        args.shift();
      } else {
        func = callback;
      }
      args.push(processNext);
      func.apply(this, args);
    }
    processNext.call(this);
  }
  function append_some_a_to_b(callback) {
    var aFd, bFd,
    buffer = new Buffer(10);
    cascade([
      function open_a(next) {
        fs.open(__dirname + '/a.txt', 'r', next);
      },
      function read_from_a(fd, next) {
        aFd = fd;
        fs.read(aFd, buffer, 0, buffer.length, 0, next);
      },
      function close_a(bytesRead, buf, next) {
        fs.close(aFd, next);
      },
      function open_b(next) {
        fs.open(__dirname + '/b.txt', 'a', next);
      },
      function stat_b(fd, next) {
        bFd = fd;
        fs.fstat(bFd, next);
      },
      function write_b(bStats, next) {
        fs.write(bFd, buffer, 0, buffer.length, bStats.size, next);
      },
      function close_b(bytesWritten, buf, next) {
        fs.close(bFd, next);
      }
    ], callback);
  }
  console.log('starting...');
  append_some_a_to_b(function done(err) {
    if (err) {
    throw err;
    }
    console.log('done');
  });
*/


/* //Async example. Uses server that responds with a square of a POST request
  var async = require('async'),
      request = require('request');
  function done(err, results) {
    if (err) {
      throw err;
    }
    console.log('results: %j', results);
  }
  async.series([
    function(next) {
      request.post({uri: 'http://localhost:8080', body: '4'},
        function(err, res, body) {
          next(err, body && JSON.parse(body));
        }
      );
    },
    function(next) {
      request.post({uri: 'http://localhost:8080', body: '5'},
        function(err, res, body) {
          next(err, body && JSON.parse(body));
        }
      );
    }
  ], done);
*/

/* //Cascading: async waterfall
var async = require('async'),
    request = require('request');
function done(err, res, body) {
  if (err) {
    throw err;
  }
  console.log("3^4 = %d", body);
}
async.waterfall([
  function(next) {
    request.post({uri: 'http://localhost:8080', body: "3"}, next)
  },
  function(res, body, next) {
    request.post({uri: 'http://localhost:8080', body: body}, next);
  }
], done);
*/

/* //Async Queue
  var async = require('async'),
      request = require('request');
  function done(err, results) {
    if (err) {
      throw err;
    }
    console.log('results: %j', results);
  }
  var maximumConcurrency = 5;
  function worker(task, callback) {
    request.post({
      uri: 'http://localhost:8080',
      body: JSON.stringify(task)},
      function(err, res, body) {
        callback(err, body && JSON.parse(body));
      }
    );
  }
  var queue = async.queue(worker, maximumConcurreny);
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(function(i) {
    queue.push(i, function(err, result) {
      if (err) {
        throw err;
      }
      console.log(i + '^2 = %d', result);
    });
  });

 */


/* //Middlewares
  var connect = require('connect');
  var writeHeader = require('./write_header');
  var replyText = require('./reply_text');
  var app = connect.createServer(
    writeHeader('X-Powered-By', 'Node'),
    replyText('Hello World!')
  );
  app.listen(8080);
 */
 
 
/* //Static file server
  var connect = require("connect");
  var app = connect();
  app.use(connect.static(__dirname+"/public"));
  app.use(function(req, res){
    res.end("Hello, World!");
  });
  app.listen(8080)
 */

/*  //Sessions with Connect
  var connect = require('connect');
  var format = require('util').format;
  var app = connect();
  // setup middleware
  app.use(connect.query());
  app.use(connect.cookieParser('this is my secret string'));
  app.use(connect.session({
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
  }));
  // actually respond
  app.use(function(req, res) {
    for (var name in req.query) {
      req.session[name] = req.query[name];
    }
    res.end(format(req.session) + '\n');
  });
  app.listen(8080);
*/


/*  // HTTPS

  // OPENSSL commands to generate certificates
  // $ openssl genrsa -out priv_key.pem 1024
  // $ openssl req -new -key priv_key.pem -out csr.pem -config 'C:\Program Files (x86)\Git\ssl\openssl.cnf'
  // $ openssl x509 -req -in csr.pem -signkey priv_key.pem -out cert.pem

  var https = require('https'),
      fs = require('fs');

  var serverOptions = {
    key: fs.readFileSync('./priv_key.pem'),
    cert: fs.readFileSync('./cert.pem')
  };

  var server = https.createServer(serverOptions, function(req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Hello World!");
  });

  server.listen(1337);
*/






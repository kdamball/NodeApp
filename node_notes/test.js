/* Reading a file buffer

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


/* Write to file

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

/* Child Process
  var child = require("child_process"),
    exec = child.exec,
    cmd = "type *";

  exec(cmd, function(err, stdout, stderr){
    console.log(stdout);
  }) 
*/


/* Passing Environment vars to a child process
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

/* Running another JS file with child process
  var exec = (require("child_process")).exec;
  // have to include "" below because '' doesn't work with cmd
  exec('"' + process.execPath + '" child.js', {env: {number: 123}}, function(err, stdout, stderr){
    if (err) {throw err};
    console.log("stdout: \n", stdout);
    console.log("stderr: \n", stderr);
  });
 */

 
 /* CMD inputs
  // unpause the stdin stream
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


/*  CHILD PROCESS SPAWN
  var spawn = require('child_process').spawn;
  // Spawn the child with a node process executing the plus_one app
  //SPAWN IGNORES PATHEXT, no need to use process.execPath!!!!!
  var child = spawn('node', ['plus_one.js']); 
  // Call this function every 1 second (1000 milliseconds):
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




















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









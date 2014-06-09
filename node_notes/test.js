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



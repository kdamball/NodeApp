var exec = require('child_process').exec;
var child;

var dns = require('dns');
setInterval(function(){
    dns.lookup('www.google.com', function(err) {
      if (err){
        child = exec("rasdial Zantel @zantel.com", function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
      }

    });
}, 10000);

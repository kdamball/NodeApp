//Screenshot of the page from localhost

var connect = require("connect"),
  pageres = require("pageres");

connect().use(connect.static(__dirname)).listen(8000);

pageres(['127.0.0.1'], ['1024x768', '800x600', '320x480'], function () {
  console.log('done'); 
});
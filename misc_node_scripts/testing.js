var fs = require("fs"),
    request = require("request");
    
file = fs.createWriteStream("resume.html");

request("http://google.com/search?q="+"all+my+troubles+my+shoulders+turn+to+black+heart+lyrics", function(err, res, body){
}).pipe(file)
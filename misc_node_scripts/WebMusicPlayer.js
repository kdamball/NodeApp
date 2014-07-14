//HTTP File piping
  var fs = require("fs"),
      http = require("http"),
      exec = require('child_process').exec;
      
  var rs, songsArray;
  
  exec('dir /b *.mp3', { env: songsArray }, function(err, stdout, stderr) {
   if (err) { throw err; }
   songsArray = stdout.split("\r\n");
  });
  
  var body = '<p>Hello!</p> <audio onended="random()" controls autoplay src="/take"></audio> <br><br> <button onclick="random()">Change Song</button> <script>audio = document.getElementsByTagName("audio")[0]; function random(){ audio.src = "/take";}</script>'
  
  http.createServer(function(req, res){
   
    if(req.url == "/take"){
      res.writeHead(200,{"Content-Type": "audio/mp3"});
      var song = songsArray[Math.floor(Math.random()*(songsArray.length -1))];
      console.log("Broadcasting- " +songsArray.indexOf(song)+": "+ song);
      rs = fs.createReadStream(song);
      rs.pipe(res);
    }else if(req.url == "/testing"){
      res.writeHead(200, {"Content-Type": "text/plain"});
      res.end("Hello World");
    }else{
      res.writeHead(200, {"Content-Type": "text/html"});
      res.end(body);
    }
    
  }).listen(8000, "192.168.37.1");


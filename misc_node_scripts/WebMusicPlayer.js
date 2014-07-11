//HTTP File piping
  var fs = require("fs"),
      http = require("http"),
      exec = require('child_process').exec;
      
  var rs, songsArray;
  
  exec('dir /b *.mp3', { env: songsArray }, function(err, stdout, stderr) {
   if (err) { throw err; }
   songsArray = stdout.split("\r\n");
  });
  
  var body = '<audio controls autoplay src="/take"></audio> <p>Hello!</p> <button onclick="random()">Change Song</button> <script>var audio = document.getElementsByTagName("audio")[0]; function random(){audio.src = "/take"}; var timer;if(audio.duration>=10 && audio.duration < 600){timer=audio.duration*1000;}else{timer=300*1000;}setTimeout(random,timer);</script>'
  
  http.createServer(function(req, res){
   
    console.log(req.url)
    if(req.url == "/take"){
      res.writeHead(200,{"Content-Type": "audio/mp3"});
      rs = fs.createReadStream(songsArray[Math.floor(Math.random()*songsArray.length)]);
      rs.pipe(res);
    }else{
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write(body);
    }
    
  }).listen(8000, "169.254.206.193");


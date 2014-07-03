/* // unpause the stdin stream
var number;
process.stdin.resume();
process.stdin.on('data', function(data) {
  Number(data)!== NaN? number = Number(data) : number = data;
 try {
  ++number;
 process.stdout.write(number + "\n");
 } catch(err) {
 process.stderr.write(err.message + "\n");
 }
}); */

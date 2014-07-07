/* //Child Process example
  var number = process.env.number;
  console.log(typeof number);
  console.log(typeof (Number(number)));
 */
 
 
/* //Request Example
  var request = require('request');
  var inspect = require('util').inspect;
  request(
    'http://localhost:4001/redirect',
    function(err, res, body) {
      if (err) { throw err; }
      console.log(inspect({
        err: err,
        res: {
          statusCode: res.statusCode
        },
        body: JSON.parse(body)
      }))
    }
  );
 */
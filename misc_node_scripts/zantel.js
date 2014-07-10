var request = require("request");

var recharge = function(){ 
  request.post("http://www.zantel.com/ezyrecharge/func.php", function(err, res, body){
    // console.log(res.statusCode);
    console.log(body);
  }).form({
    "msisdn": "0775061241",
    "voucherID": "1096602636699",
    "custName": "",
    "custEmail": "",
    "func": "RechargeGSM"
  });
}

var enrollBundle = function(e){
  request.post("http://www.zantel.com/ezyrecharge/func.php", function(err, res, body){
    // console.log(res.statusCode);
    console.log(body);
  }).form({
    "msisdn": "0775061241",
    "gsm": "775061241",
    "bundle": "Month 12GB",
    "func": "EnrollBundleCDMA"
  });
}

var checkBalance = function(e){
  request.post("http://www.zantel.com/ezyrecharge/func.php", function(err, res, body){
    // console.log(res.statusCode);
    console.log(body);
  }).form({
    "msisdn": "0775061241",
    "msType": "2",
    "func": "CheckBalance"
  });
}

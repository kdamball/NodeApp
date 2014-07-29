var request = require("request"),
    number = "0775061241",
    monthly = "Month 12GB";

var recharge = function(){ 
  request.post("http://www.zantel.com/ezyrecharge/func.php", function(err, res, body){
    console.log(body);
  }).form({
    "msisdn": number,
    "voucherID": "1096602636699",
    "custName": "",
    "custEmail": "",
    "func": "RechargeGSM"
  });
}

var enrollBundle = function(){
  request.post("http://www.zantel.com/ezyrecharge/func.php", function(err, res, body){
    console.log(body);
  }).form({
    "msisdn": number,
    "gsm": "775061241",
    "bundle": monthly,
    "func": "EnrollBundleCDMA"
  });
}

var checkBalance = function(){
  request.post("http://www.zantel.com/ezyrecharge/func.php", function(err, res, body){
    console.log(body);
  }).form({
    "msisdn": number,
    "msType": "2",
    "func": "CheckBalance"
  });
}
var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var IAPVerifier = require('iap_verifier');
var client = new IAPVerifier();

app.use(bodyParser.json())

app.get('/', function(req, res) {
	res.send('Use POST only')
})

app.post('/', function(req, res) {
	console.log(req.body);
	var receipt = req.body['receipt'];
	client.verifyAutoRenewReceipt(receipt, true, function(valid, msg, data) {
		if (valid) {
			console.log("Valid receipt");
			console.log(msg);
			console.log(data);
			res.json({'res':'ok'});
		} else {
			console.log("Invalid receipt");
			console.log(msg);
			console.log(data);
			res.status(400).end();
		}
	});

})

var server = app.listen(3000, function() {

	var host = server.address().address
	var port = server.address().port

	console.log('Example app listening at http://%s:%s', host, port)

})
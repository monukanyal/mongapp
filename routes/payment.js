const express = require('express');
const router = express.Router();
var request = require('request'),
    consumer_key = "jKti1AG6g1uM1Wv416FrDyaLcjhYPwAX",
    consumer_secret = "tWjGkyYzJaZKr50y";

//for api
router.get('/', function (req, res) {

    var url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
    var auth = "Basic " + new Buffer(consumer_key + ":" + consumer_secret).toString("base64");

    request(
        {
            url: url,
            headers: {
                "Authorization": auth
            }
        },
        function (error, response, body) {
            if (response.statusCode == 200) {
                var result = JSON.parse(body);
                console.log('auth error:', error); // Print the error if one occurred
                console.log('auth statusCode:', response && response.statusCode); // Print the response status code if a response was received
                console.log('auth body:', result); // Print the HTML for the Google homepage

                //res.json({error:false,result:[],token:result.access_token});
                var oauth_token = result.access_token;
                request(
                    {
                        method: 'POST',
                        url: "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl",
                        headers: {
                            "Authorization": "Bearer " + oauth_token
                        },
                        json: {
                            "ShortCode": "602980",
                            "ResponseType": "Cancelled",
                            "ConfirmationURL": "http://localhost:8080/api/mpesa/confirmation?token=esferaagoodcompany@",
                            "ValidationURL": "http://localhost:8080/api/mpesa/validation_url?token=esferaagoodcompany@"
                        }
                    },
                    function (error, response, body) {
                        console.log('register error:', error); // Print the error if one occurred
                        console.log('register statusCode:', response && response.statusCode); // Print the response status code if a response was received
                        console.log('register body:', body); // Print the HTML for the Google homepage
                        if(response.statusCode==200)
                        {
                            res.json({error:false,result:body});
                        }
                        else
                        {
                            res.json({error:true,result:body});
                        }
                    }
                )
            }
        }
    );


});
router.get('/validation_url', function (req, res) {
    console.log(req.query);
    if(req.query.token)
    {
     res.json({"ResultCode":0, "ResultDesc":"Success", "ThirdPartyTransID": 0});
    }
    else
    {
        res.json({"ResultCode":1, "ResultDesc":"Failed", "ThirdPartyTransID": 0});
    }   
});

router.get('/confirmation', function (req, res) {
    res.json({info:req.query});
});
module.exports = router;

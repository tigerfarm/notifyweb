console.log("+++ Send an FCM notification.");
var request = require('request');
var serverKeyToken = process.env.FCM_SERVER_KEY_TOKEN;
console.log('+ serverKeyToken: ' + serverKeyToken);
var deviceToken = process.env.FCM_DEVICE_TOKEN;
console.log('+ deviceToken: ' + deviceToken);
var theRequestUrl = "https://fcm.googleapis.com/fcm/send";
console.log('+ theRequestUrl: ' + theRequestUrl);
var theMessage = "Hello there 1";
console.log('+ theMessage: ' + theMessage);
request({
    method: "POST",
    url: theRequestUrl,
    headers: {
        "Content-type": "application/json",
        "Authorization": "key=" + serverKeyToken
    },
    json: {
        "to": deviceToken,
        "notification": {"title":"Sent using a command line program.","body":theMessage}
    }
}, function (error, response, body) {
    console.log("+ body: " + JSON.stringify(body));
    // Sample success: + body: {"multicast_id":70031060372181420,"success":1,"failure":0,"canonical_ids":0,"results":[{"message_id":"ef9a795a-1105-415e-8c16-0eabe9e0ec2f"}]}
    // console.log("- Error: " + error.code + " - " + error.message);
    console.log("+++ Exit.");
});

// eof
// -----------------------------------------------------------------------------
console.log("+++ Create an FCM Binding.");
const client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
const notifyServiceSid = process.env.MAIN_NOTIFY_SID;
console.log("+ Notify service SID: " + notifyServiceSid);
//
// Firebase token value from: firebase.messaging().getToken()
var theAddress = "eQZbCbVf4tQ:APA91bHac8cXIKDPfJNsM6Ffb7py52PMA2H5ERlRF0alq_haXlToLq9p1SbafmHu0olREyPIfsU2xfCjZP8RIbt6qjuQT2Oub21rE05-yPY06b_pQd4BQ4-jVS0ciBQW-j-22XezSftK"; 
//
var theIdentity = "dave";
console.log("+ Create FCM binding, Identity: " + theIdentity + ", address:" + theAddress + ":");
client.notify.services(notifyServiceSid).bindings
        .create({
            bindingType: 'fcm',
            identity: theIdentity,
            address: theAddress
        })
        .then(
        binding => console.log("+ Created : " + binding.sid)
        ).catch(function (err) {
            if (err) {
                console.error("- Error: ", err.message);
                exit();
        }});

// -----------------------------------------------------------------------------

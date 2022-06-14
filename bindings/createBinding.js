// -----------------------------------------------------------------------------
console.log("+++ Create an FCM Binding.");
const client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);
const notifyServiceSid = process.env.MASTER_NOTIFY_SID;
console.log("+ Notify service SID: " + notifyServiceSid);
//
// Firebase token value from: firebase.messaging().getToken()
var theAddress = "cwQhDssdwkg:APA91bE-AdXdSt7IacpFwj5giTjrShp4ni0rZ1BqcerB8wYRDYI-dpOCUqMtUxsPfIVFDCwxtO_zHNLAcGeQe04o1Qjf474t_fP_71D87YxjVfumQOarHU0uLFWKRnn-BiS-MkwkdBYX"; 
//
var theIdentity = "davec";
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

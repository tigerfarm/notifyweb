// -----------------------------------------------------------------------------
console.log("+++ Send a notifications to an FCM token address or device address.");
const client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);
const notifyServiceSid = process.env.MASTER_NOTIFY_SID;
console.log("+ Twilio Notify service SID: " + notifyServiceSid);
// For this web application, the "address" is the FCM token value from: index.html.
client.notify.services(notifyServiceSid).notifications.create({
    body: 'Hello there 1',
    toBinding: [
        JSON.stringify({"binding_type": "fcm", "address": "cwQhDssdwkg:APA91bE-AdXdSt7IacpFwj5giTjrShp4ni0rZ1BqcerB8wYRDYI-dpOCUqMtUxsPfIVFDCwxtO_zHNLAcGeQe04o1Qjf474t_fP_71D87YxjVfumQOarHU0uLFWKRnn-BiS-MkwkdBYX"})
    ]
}).then(notification => console.log("+ Sent, Twilio Notify log id: " + notification.sid))
        .catch(error => console.log("- Error: " + error));

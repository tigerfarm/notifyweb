// -----------------------------------------------------------------------------
console.log("+++ Send a notifications to an FCM token address which is a device address.");
const client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);
const notifyServiceSid = process.env.MASTER_NOTIFY_SID;
console.log("+ Twilio Notify service SID: " + notifyServiceSid);
// For this web application, the "address" is the FCM token value from: index.html.
client.notify.services(notifyServiceSid).notifications.create({
    body: 'Hello there 5',
    toBinding: [
        JSON.stringify({"binding_type": "fcm", "address": "ewS_m63oS5A:APA91bGhWj6gAerckij2bGuSmsSYuy81ktkKPJ0KNci92u69ak6uwmpLCUPGRTyrjAPIcSa3VYLSNTpG9ztU5cF8t50dJMC_0zAcICe8kbVF-2WzFWIRVLR8c5oENtTSDPZ_cOkPZ6E7"})
    ]
}).then(notification => console.log("+ Sent, Twilio Notify log id: " + notification.sid))
        .catch(error => console.log("- Error: " + error));

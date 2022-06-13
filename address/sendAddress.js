// -----------------------------------------------------------------------------
console.log("+++ Send a notifications to an FCM token address or device address.");
const client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);
// const notifyServiceSid = process.env.MASTER_NOTIFY_SID;
const notifyServiceSid = "ISa904cf367667fdba0e507d50dbc60aa0";
console.log("+ Twilio Notify service SID: " + notifyServiceSid);
// For this web application, the "address" is the FCM token value from: index.html.
client.notify.services(notifyServiceSid).notifications.create({
    body: 'Hello there 1',
    toBinding: [
        JSON.stringify({"binding_type": "fcm", "address": "dRNov8YDvU8:APA91bFeimTw3Q6cdYc_L4-fNKm2Xg6bk9oZBoGZyA01PtwgtGY5METQIetjGL8rBrpf1IWZ-5XPDu_91FODs-720shpkM7J3jcGfEQRQE2K0TzzDfvav2kLaIFCbITk1BukZbfiyhZs"})
    ]
}).then(notification => console.log("+ Sent, Twilio Notify log id: " + notification.sid))
        .catch(error => console.log("- Error: " + error));

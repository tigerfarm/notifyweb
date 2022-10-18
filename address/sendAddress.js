// -----------------------------------------------------------------------------
console.log("+++ Send a notifications to an FCM token address which is a device address.");
const client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);
const notifyServiceSid = process.env.MASTER_NOTIFY_SID;
console.log("+ Twilio Notify service SID: " + notifyServiceSid);
// For this web application, the "address" is the FCM token value from: index.html.
client.notify.services(notifyServiceSid).notifications.create({
    body: 'Hello there 1',
    toBinding: [
        JSON.stringify({"binding_type": "fcm", "address": "dS-7xNu0ihE:APA91bEVpWpQwbZGnEA10rIRSfT5ox72PJqH0y_sETyfObo9LLd3bAqtnHHSZ_o2V4yTzD8b8AMUgUbmzoDkVvRCGHHAxT0xXanxxdcs3Xe-nN0JNWFknMr-Pvj7W7q03q_y2PY4YO6L"})
    ]
}).then(notification => console.log("+ Sent, Twilio Notify log id: " + notification.sid))
        .catch(error => console.log("- Error: " + error));

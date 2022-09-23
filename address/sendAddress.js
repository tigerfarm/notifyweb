// -----------------------------------------------------------------------------
console.log("+++ Send a notifications to an FCM token address which is a device address.");
const client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);
const notifyServiceSid = process.env.MASTER_NOTIFY_SID;
console.log("+ Twilio Notify service SID: " + notifyServiceSid);
// For this web application, the "address" is the FCM token value from: index.html.
client.notify.services(notifyServiceSid).notifications.create({
    body: 'Hello there 1',
    toBinding: [
        JSON.stringify({"binding_type": "fcm", "address": "e1sSJhiVQHk:APA91bHc4lXUg0RQfvSPIrJysRN-Sin1uuk99ftgML20UvEQPFiBDt7hwvyM6bMO_YS8cm_Sntx4FQJEjdBEOoCe0Wj0SYkpq3dyOZUdm2DuIEWcVU46rH24kTjRxyYr6l8B-R2lSsM2"})
    ]
}).then(notification => console.log("+ Sent, Twilio Notify log id: " + notification.sid))
        .catch(error => console.log("- Error: " + error));

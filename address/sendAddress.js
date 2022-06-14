// -----------------------------------------------------------------------------
console.log("+++ Send a notifications to an FCM token address or device address.");
const client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);
const notifyServiceSid = process.env.MASTER_NOTIFY_SID;
console.log("+ Twilio Notify service SID: " + notifyServiceSid);
// For this web application, the "address" is the FCM token value from: index.html.
client.notify.services(notifyServiceSid).notifications.create({
    body: 'Hello there 1',
    toBinding: [
        JSON.stringify({"binding_type": "fcm", "address": "faReuVhz_gk:APA91bHsNzVpwfrRp_1zIfSr-qCdgM44FhMjFsYfAw6u91uEW0NsQ8ZC_ESnfsf1pU3cb2zpxfOZmfEXe-P_dGd9NuIcMbt3JI4JPW_dhVgk7H5Dka5DbjQ9yrHAFZAA7UKCqdZwws7V"})
    ]
}).then(notification => console.log("+ Sent, Twilio Notify log id: " + notification.sid))
        .catch(error => console.log("- Error: " + error));

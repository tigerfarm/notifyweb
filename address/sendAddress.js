// -----------------------------------------------------------------------------
console.log("+++ Send a notifications to an FCM token address or device address.");
const client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);
// const notifyServiceSid = process.env.MASTER_NOTIFY_SID;
const notifyServiceSid = "ISa904cf367667fdba0e507d50dbc60aa0";
console.log("+ Twilio Notify service SID: " + notifyServiceSid);
// For this web application, the "address" is the FCM token value from: index.html.
client.notify.services(notifyServiceSid).notifications.create({
    body: 'Hello there 4',
    toBinding: [
        JSON.stringify({"binding_type": "fcm", "address": "fYx59nSFih4:APA91bEUpSzPEkFpnzzues23vrJGRisBrxIBjUur6a3Ybk8qVeYwfdPdIYryHDl8OE30ML33S1B0MIkGcvZdfILGSfoEU1WxuxNH8p76rKKdvkLCzhIGjuRds6bwKZC1moNg5Ba0CIku"})
    ]
}).then(notification => console.log("+ Sent, Twilio Notify log id: " + notification.sid))
        .catch(error => console.log("- Error: " + error));

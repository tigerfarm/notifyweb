// -----------------------------------------------------------------------------
console.log("+++ Start sending notifications to an identity.");
const client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);
const notifyServiceSid = process.env.MASTER_NOTIFY_SID;
console.log("+ Notify service SID: " + notifyServiceSid);
client.notify.services(notifyServiceSid).notifications.create({
    // DeliveryCallbackUrl: 'https://example.com/notify',
    identity: 'davec',      // davec davew stacyw 
    body: 'Hello there 1c'
}).then(notification => console.log("+ Sent: " + notification.sid))
        .catch(error => console.log(error));

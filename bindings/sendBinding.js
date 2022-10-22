// -----------------------------------------------------------------------------
console.log("+++ Sending a notification to an identity.");
const client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
const notifyServiceSid = process.env.MAIN_NOTIFY_SID;
const theIdentity = 'davew';      // davec davew stacyw 
console.log("+ Notify service SID: " + notifyServiceSid, ', To identity: ' + theIdentity);
client.notify.services(notifyServiceSid).notifications.create({
    // DeliveryCallbackUrl: 'https://example.com/notify',
    identity: theIdentity,
    body: 'Hello there ' + theIdentity
}).then(notification => console.log("+ Sent: " + notification.sid))
        .catch(error => console.log(error));

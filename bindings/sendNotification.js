// -----------------------------------------------------------------------------
console.log("+++ Start sending notifications to an identity.");
const client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);
const notifyServiceSid = process.env.MASTER_NOTIFY_SID;
const theIdentity = 'davec';      // davec davew stacyw 
console.log("+ Notify service SID: " + notifyServiceSid, ', To identity: ' + theIdentity);
client.notify.services(notifyServiceSid).notifications.create({
    // DeliveryCallbackUrl: 'https://example.com/notify',
    identity: theIdentity,
    body: 'Hello there ' + theIdentity
}).then(notification => console.log("+ Sent: " + notification.sid))
        .catch(error => console.log(error));

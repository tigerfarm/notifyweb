// -----------------------------------------------------------------------------
console.log("+++ Sending a notification to an identity using custom payload overrides.");
// https://www.twilio.com/docs/notify/api/notification-resource#send-custom-notifications-by-channel
const client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
const notifyServiceSid = process.env.MAIN_NOTIFY_SID;
const theIdentity = 'batman';      // Use listBindings.js to get identities.
console.log("+ Notify service SID: " + notifyServiceSid + ', To identity: ' + theIdentity);
client.notify.services(notifyServiceSid).notifications.create({
    identity: theIdentity,
    body: 'Hello ' + theIdentity + " #1co",
    data: {
        custom_key1: 'custom value 1',
        custom_key2: 'custom value 2'
    },
    fcm: {
        message: {              // This is the new part for the new Google credentials: FCM HTTP v1 API.
            notification: {
                title: 'Custom Payload Override',
                body: 'Hello Dave 3.'
            }
        }
    }
}).then(notification => console.log("+ Sent: " + notification.sid))
        .catch(error => console.log(error));

// -----------------------------------------------------------------------------
console.log("+++ Send a notifications to an FCM token address or device address.");
const client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);
const notifyServiceSid = process.env.MASTER_NOTIFY_SID;
console.log("+ Twilio Notify service SID: " + notifyServiceSid);
// For this web application, the "address" is the FCM token value from: index.html.
client.notify.services(notifyServiceSid).notifications.create({
    body: 'Hello there 1',
    toBinding: [
        JSON.stringify({"binding_type": "fcm", "address": "cnOdL7XsY4E:APA91bHJsF1ICmQKlQAV6Gh9TZsI81yggGU0hoAZl_mLluex-_k6rdBAQg1wS8t1EyxRo1jYWqXayrNLKMRmfGKu4Eq95QSNdpkpH0cLyejNwyz9L66q6kXSGGZ3us-PaudShvQXaMwL"})
    ]
}).then(notification => console.log("+ Sent, Twilio Notify log id: " + notification.sid))
        .catch(error => console.log("- Error: " + error));

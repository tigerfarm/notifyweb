// -----------------------------------------------------------------------------
console.log("+++ Create a Binding.");
const client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);
const notifyServiceSid = process.env.MASTER_NOTIFY_SID;
console.log("+ Notify service SID: " + notifyServiceSid);
var theIdentity = "davec";
var theAddress = "e2fFu...dXV";
console.log("+ Create FCM binding, Identity: " + theIdentity + ", address:" + theAddress + ":");
client.notify.services(notifyServiceSid).bindings
        .create({
            bindingType: 'fcm',
            identity: theIdentity,
            address: theAddress
        })
        .then(
        binding => console.log("+ Created : " + binding.sid)
        ).catch(function (err) {
            if (err) {
                console.error("- Error: ", err.message);
                exit();
        }});

// -----------------------------------------------------------------------------

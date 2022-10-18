// -----------------------------------------------------------------------------
console.log("+++ List bindings for a Notify service.");
const client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);
const notifyServiceSid = process.env.MASTER_NOTIFY_SID;
console.log("+ Notify service SID: " + notifyServiceSid);
// Example:
// ++ BS117d136bdf6f6ce8e7cc22b72c763274 fcm:davea<fa...7V>
console.log("+ The listing:");
console.log("++ Binding-SID bindingType(fcm,apn):identity<address>)");
client.notify.services(notifyServiceSid).bindings
        .list({limit: 20})
        .then(bindings => bindings.forEach(
                    binding => console.log("++ " + binding.sid 
                    + " " + binding.bindingType 
                    + ":" + binding.identity 
                    + " credentialSid:" + binding.credentialSid 
                    // + "<" + binding.address + ">"
                    )
            ));
// 
// -----------------------------------------------------------------------------

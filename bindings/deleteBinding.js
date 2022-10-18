// -----------------------------------------------------------------------------
console.log("+++ Delete a binding.");
const client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
const notifyServiceSid = process.env.MAIN_NOTIFY_SID;
console.log("+ Notify service SID: " + notifyServiceSid);
const bindingSid = "BS257aefff73b459d5d8692119a2064a1f";
console.log("+ Delete Binding SID: " + bindingSid);
client.notify.services(notifyServiceSid).bindings(bindingSid).remove();
// 
// -----------------------------------------------------------------------------

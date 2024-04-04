// -----------------------------------------------------------------------------
console.log("+++ Delete a binding.");
const client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
const notifyServiceSid = process.env.MAIN_NOTIFY_SID;
console.log("+ Notify service SID: " + notifyServiceSid);
const bindingSid = "BSd4e315515f92aca8e86800eff3061f8f";
console.log("+ Delete Binding SID: " + bindingSid);
client.notify.services(notifyServiceSid).bindings(bindingSid).remove();
// 
// -----------------------------------------------------------------------------

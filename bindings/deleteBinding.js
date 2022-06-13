// -----------------------------------------------------------------------------
console.log("+++ Delete a binding.");
const client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);
const notifyServiceSid = process.env.MASTER_NOTIFY_SID;
console.log("+ Notify service SID: " + notifyServiceSid);
const bindingSid = "BS8d437c3ac7b1a98a584bdaba2fc559db";
console.log("+ Delete Binding SID: " + bindingSid);
client.notify.services(notifyServiceSid).bindings(bindingSid).remove();
// 
// -----------------------------------------------------------------------------

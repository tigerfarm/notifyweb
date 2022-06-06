// -----------------------------------------------------------------------------
console.log("+++ Delete a binding.");
const client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);
const notifyServiceSid = process.env.MASTER_NOTIFY_SID;
console.log("+ Notify service SID: " + notifyServiceSid);
const bindingSid = "BS9124d585a4392977e1b359760e7a9b14";
console.log("+ Delete Binding SID: " + bindingSid);
client.notify.services(notifyServiceSid).bindings(bindingSid).remove();
// 
// -----------------------------------------------------------------------------

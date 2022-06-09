// -----------------------------------------------------------------------------
console.log("+++ Delete a binding.");
const client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);
const notifyServiceSid = process.env.MASTER_NOTIFY_SID;
console.log("+ Notify service SID: " + notifyServiceSid);
const bindingSid = "BS6d939d5c2e0a18b2297443406de4f77e";
console.log("+ Delete Binding SID: " + bindingSid);
client.notify.services(notifyServiceSid).bindings(bindingSid).remove();
// 
// -----------------------------------------------------------------------------

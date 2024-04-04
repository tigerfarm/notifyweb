console.log("++ Create a chat participant into a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);
serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
conversationSid = process.env.CONVERSATION_SID;
console.log("+ Conversations service SID: " + serviceSid);
console.log("+ Conversation SID: " + conversationSid);
//
participantSid = 'MB5184b0a13bb54136a0c3a7d2906f29db';
console.log("+ Participant SID: " + participantSid);
client.conversations.services(serviceSid).conversations(conversationSid)
        .participants(participantSid)
        .remove().then(message => console.log(
            "++ Removed."
            ))
        .catch(function (err) {
            console.error("- " + err);
            exit();
        });

// https://www.twilio.com/docs/conversations/api/conversation-participant-resource

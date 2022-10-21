console.log("++ Fetch a conversation's data.");
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
conversationSid = process.env.CONVERSATION_SID;
console.log("+ Fetch using the conversation sid: " + conversationSid);
client.conversations.services(serviceSid).conversations(conversationSid)
        .fetch()
        .then(conversation => {
            console.log(
                    "++ Conversation SID: " + conversation.sid
                    + "\n++ friendlyName:    " + conversation.friendlyName
                    + "\n++ uniqueName:      " + conversation.uniqueName
                    + "\n++ state:           " + conversation.state
                    );
        });

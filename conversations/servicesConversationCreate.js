console.log("++ Create a conversation.");
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
conversationFriendlyName = 'Test notifications';
console.log("+ Messaging Service SID: " + serviceSid
        + ", Friendly and unique Name: " + conversationFriendlyName
        );
client.conversations.services(serviceSid).conversations
        .create({
            messagingServiceSid: process.env.MESSAGING_SERVICE_SID,
            friendlyName: conversationFriendlyName,
            uniqueName: conversationFriendlyName
        })
        .then(conversation => {
            console.log(
                    "+ Conversation SID: " + conversation.sid
                    + " " + conversation.friendlyName
                    );
        });
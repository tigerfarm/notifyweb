console.log("+++ List and delete all messages for a services's conversation.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);
serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
conversationSid = process.env.CONVERSATION_SID;
console.log("+ Conversations service SID: " + serviceSid);
console.log("+ Conversation SID: " + conversationSid);
client.conversations.services(serviceSid).conversations(conversationSid)
        .fetch()
        .then(conversation => {
            console.log(
                    "+ Conversations SID/uniqueName/friendlyName: " + conversation.sid
                    + "/" + conversation.uniqueName
                    + "/" + conversation.friendlyName
                    );
            console.log("+ Delete all messages in the conversation.");
            console.log("          SID                                 Author, Message");
            client.conversations.services(serviceSid).conversations(conversationSid)
                    .messages
                    .list({limit: 200})
                    .then(messages => messages.forEach(message => {
                            console.log(
                                    "+ Remove: " + message.sid
                                    // + "  " + message.index
                                    + "  " + message.author
                                    );
                            client.conversations.services(serviceSid).conversations(conversationSid)
                                    .messages(message.sid).remove();
                        }));
        });


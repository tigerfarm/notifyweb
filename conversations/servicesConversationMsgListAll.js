console.log("+++ List all messages for a services's conversation.");
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
            //
            console.log("  SID                                 Index, Author, Message");
            client.conversations.services(serviceSid).conversations(conversationSid)
                    .messages
                    .list({limit: 200})
                    .then(messages => messages.forEach(message => {
                            console.log(
                                    "+ " + message.sid
                                    + "  " + message.index
                                    + "  " + message.author
                                    // + ", \"" + message.body.substring(0, 25) + "...\""
                                    + ", \"" + message.body + "\""
                                    );
                            if (message.media !== null) {
                                // [{"category":"media","filename":"0graphic1w.jpg","size":92724,"content_type":"image/jpeg","sid":"MEd373156040049ffa58a23a40ba2679e5"},{...}...]
                                // console.log(JSON.stringify(message.media));
                                message.media.forEach(media => {
                                    console.log("++ SID: " + media.sid + " " + media.filename);
                                });
                            }
                        }));
        });


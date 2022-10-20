// -----------------------------------------------------------------------------
// 

// For Conversations.
let userIdentity = "davew";
let thisConversationClient = "";
let thisToken;

// -----------------------------------------------------------------------------
// Initialize Firebase
// Get a Firebase token to identify this client: device application address token.
//
var firebaseFcmToken = "";
//
function GetMessagingToken() {
    if (firebase && firebase.messaging()) {
        // requesting permission to use push notifications
        firebase.messaging().requestPermission().then(() => {
            // getting FCM token
            firebase.messaging().getToken().then((fcmToken) => {
                firebaseFcmToken = fcmToken;
                document.getElementById("fcmToken").innerText = fcmToken;
                console.log('+ Device web application address, Firebase FCM token ', firebaseFcmToken);
            }).catch((err) => {
                logger("- Error: Can't get token: " + err);
            });
        }).catch((err) => {
            logger("- Error: user has not granted permission.");
            logger(err);
        });
    } else {
        logger("- Error: Firebase library not initialized.");
    }
}

// -------------------------------
function setConversation() {
    if (userIdentity === "") {
        logger("Required: Conversation identity.");
        return;
    }
    if (userIdentity === "") {
        logger("Required: Firebase FCM message token.");
        return;
    }
    document.getElementById("notificationsConversations").innerText = "Not enabled";
    logger("+ Use a server side routine to refresh the token using client id: " + userIdentity);
    var jqxhr = $.get("generateToken?identity=" + userIdentity, function (token) {
        if (token === "0") {
            logger("- Error refreshing the token.");
            return;
        }
        thisToken = token;
        logger("Token refreshed: " + thisToken);
        // https://www.twilio.com/docs/conversations/initializing-conversations-sdk-clients
        Twilio.Conversations.Client.create(thisToken).then(conversationClient => {
            logger("Conversations client created: thisConversationClient.");
            thisConversationClient = conversationClient;
            logger("+ Conversation client created for the user, identity: " + userIdentity);
            //
            logger("+ Pass FCM token to the conversationClientInstance to register for push notifications.");
            thisConversationClient.setPushRegistrationId('fcm', firebaseFcmToken);
            logger('+ This web app is registered to receive Conversations push notifications.');
            document.getElementById("notificationsConversations").innerText = "Enabled";
        });
    }).fail(function () {
        logger("- Error refreshing the token and creating the chat client object.");
    });
}

// -----------------------------------------------------------------------------
function logger(message) {
    var aTextarea = document.getElementById('log');
    aTextarea.value += "\n> " + message;
    aTextarea.scrollTop = aTextarea.scrollHeight;
}
function clearTextAreas() {
    log.value = "+ Ready";
}
// 
// -----------------------------------------------------------------------------
// eof
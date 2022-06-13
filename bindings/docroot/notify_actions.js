// -----------------------------------------------------------------
// Initialize Firebase
// 
// -----------------------------------------------------------------
// Get a Firebase token to identify this client.
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

// -----------------------------------------------------------------
// Use the Firebase token as the Twilio Notify address.
function createBinding() {
    var identity = document.forms["binding_form"]["identity_field"].value;
    if (identity === "") {
        logger('- Error: Identity must be specified');
        return false;
    }
    if (firebaseFcmToken === "") {
        logger('- Error: Firebase FCM token must be specified');
        return false;
    }
    // register(identity, address);
    registerBinding(identity, firebaseFcmToken);
}

// -----------------------------------------------------------------
// Register the binding with Twilio Notify
function registerBinding(identity, address) {
    var jqxhr = $.get("registerBinding?bindingType=fcm" + "&identity=" + identity + "&address=" + address, function (theResponse) {
        // Sample: "+ Binding SID:BScacdf587aa405e7a2ddfea2de29abee7:"
        if (!theResponse.startsWith("+ Binding SID:")) {
            logger("- Error register the binding.");
            return;
        }
        logger("Binding created.");
        document.getElementById("bindingSid").innerText = theResponse;
        console.log("+ Binding created, theResponse: " + theResponse);
    });
}

// -----------------------------------------------------------------
function logger(message) {
    var aTextarea = document.getElementById('log');
    aTextarea.value += "\n> " + message;
    aTextarea.scrollTop = aTextarea.scrollHeight;
}
function clearTextAreas() {
    log.value = "+ Ready";
}
// 
// -----------------------------------------------------------------
// eof
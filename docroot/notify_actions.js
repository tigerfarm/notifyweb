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
                alert("Error: Can't get token: " + err);
            });
        }).catch((err) => {
            alert("Error: Can't request permission or permission hasn't been granted to the web app by the user." + err);
        });
    } else {
        alert("Error: Firebase library not initialized.");
    }
}

// -----------------------------------------------------------------
// Use the Firebase token as the Twilio Notify address.
function createBinding() {
    var identity = document.forms["binding_form"]["identity_field"].value;
    if (identity === "") {
        alert('Identity must be specified');
        return false;
    }
    if (firebaseFcmToken === "") {
        alert('Firebase FCM token must be specified');
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
            console.log("- Error register the binding.");
            return;
        }
        document.getElementById("bindingSid").innerText = theResponse;
        console.log(theResponse);
    });
}

// -----------------------------------------------------------------
// eof
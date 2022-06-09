// firebase sample code snippets from https://firebase.google.com/docs/cloud-messaging/js/client
// [START initialize_firebase_in_sw]
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/4.8.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the messagingSenderId.
firebase.initializeApp({
    'messagingSenderId': "572828197431"     // Matches the value in index.html.
});

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();

console.log('+ Running: firebase-messaging-sw.js');

messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Notification Web Application';   // Background Message Title.
    const notificationOptions = {
        body: payload.data.twi_body                             // Background Message body.
    };
    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});

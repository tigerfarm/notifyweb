# Twilio Notify Web Application Implementation

These are the steps to set up, configure, and run
a simple sample web application to receive Twilio Notify notifications.
Using the web application, you will retrieve a Firebase Cloud Messaging(FCM) token in the browser.
You can use the included Twilio Notify command line program to send a notification
that will be received by the browser application, or in the background.

Notification received and displayed in the browser application:

<img src="notifyw1.jpg" width="600"/>

Once this application is run in the browser and an FCM token is retrieved,
notifications can be sent to the device using the FCM token.
````
if the web application is running in the browser, 
    notifications will be handled by the application (see above).
if the web application tab is closed, or the browser is closed,
    notifications will be handled by the device's OS (see below).
````

## Impliment the Web Application

You will download the [GitHub project](https://github.com/tigerfarm/notifyweb).
To run it, you will need to Node installed and available. I'm using Node version 17.9.0.
````
$ node -v
v17.9.0
````

### Download the Web Application that can Receive Twilio Notify Notifications

If you have the GitHub tools installed, you can clone this repository to your disk.
````
cd /Users/<user>/Projects/
$ git clone https://github.com/tigerfarm/notifyw
...
$ cd notifyw/
````

Or, download the ZIP into a working directory, and unzip it.
````
cd /Users/<user>/Projects/
$ mkdir notifyw
$ cd notifyw/
````

#### Files

- [webserver.js](webserver.js) : a NodeJS Express HTTP Server that serves the client files.
- [docroot/index.html](docroot/indexShow.html) : Client HTML, includes Client JavaScript functions
- [docroot/firebase-messaging-sw.js](docroot/firebase-messaging-sw.js) : JavaScript used by the Firebase JavaScript libraries
- [sendAddress.js](sendAddress.js) : a NodeJS command line program to send a Twilio Notify notification.

#### Use the Google Firebase Project Information in the Web Application

In the file: firebase-messaging-sw.js,
set the messagingSenderId value, to the Firebase "Project number"(example: "5...1").
Its listed under the Firebase project settings: "General".
````
firebase.initializeApp({
    'messagingSenderId': "5...1"
});
````
In the index.html file,
set the messagingSenderId value, to the Firebase "Project number"(example: "5...1").
Set the value for apiKey, to the "Web API Key"(example: "AI...Q").
Both are listed under the Firebase project settings: "General".
````
            var config = {
                apiKey: "AI...Q",
                messagingSenderId: "5...1"
            };
````

Install the Node Express modules.
````
$ npm install --save express
````

Run the web server. Default port is hardcoded to 8000.
````
$ node webserver.js 
+++ Minimum Notification Web Application server is starting up.
+ Listening on port: 8000
````

## Get a Google Firebase Token

In a web browser, goto the [link](http://localhost:8000/)(http://localhost:8000/).
````
Click "Get Firebase FCM message token".
    The token is displayed, for example: "cw...YX".
````
## Send a notification:

Use the send notification program: [sendNotification.js](sendNotification.js), to send a notification to the device.

In the file, sendNotification.js, set "address" to the above retrieved FCM token value(example: "cw...YX").

For example:
````
client.notify.services(notifyServiceSid).notifications.create({
    body: 'Hello there ',
    toBinding: [
        JSON.stringify({"binding_type": "fcm", "address": "cw...YX"})
    ]
})
````

Install the Node Twilio module.
````
$ npm install --save twilio
````
Set environment variables. Or, hardcode them into the program: sendAddress.js.
````
$ export MASTER_NOTIFY_SID=IS0e9b3863450252891f81f312a6e3a7d7
$ export MASTER_ACCOUNT_SID=AC...
$ export MASTER_AUTH_TOKEN=...
````

Sample program run:
````
$ node sendAddress.js 
+++ Send a notifications to an FCM token address or device address.
+ Twilio Notify service SID: IS0e9b3863450252891f81f312a6e3a7d7
+ Sent, Twilio Notify log id: NTea47fb9ca9bc391f923dd2c999153a06
````
Or, use a curl command.
````
curl -X POST https://notify.twilio.com/v1/Services/IS0e9b3863450252891f81f312a6e3a7d7/Notifications \
    -d 'Body=Hello there 1' \
    --data-urlencode 'ToBinding={"binding_type":"fcm", "address":"cw...YX"}' \
    -u $MASTER_ACCOUNT_SID:$MASTER_AUTH_TOKEN
{
"account_sid": "ACa...3",
"sid": "NTea47fb9ca9bc391f923dd2c999153a06", 
"service_sid": "IS0e9b3863450252891f81f312a6e3a7d7", 
"identities": ["davew"],
"body": "Hello there 1", 
"sms": null, "gcm": null, "fcm": null, "apn": null, "alexa": null, "facebook_messenger": null, 
"ttl": 2419200,
"priority": "high", 
"data": null, 
"action": null, "date_created": "2022-06-09T20:23:10Z", 
"sound": null, "tags": [], "title": null, "segments": [], 
}
/Users/dave/conversations
````
The notification will be received on the device where the FCM token was received.
Either handled in the application, or handled by the OS in the background.

Note, if the logs show a message with state: SENT,
and, however, it was not received, the "address" maybe incorrect.

### About the Send

Notification flow:
+ From your sending program
+ To Twilio
+ To Google(FCM) network
+ To the destination device.

The sending program includes:
+ Message: the notification message('Hello there 1') to send.
+ Destination: The app user's Firebase token(cw...YX) that was retrieved in the browser(firebase.messaging().getToken()).
+ Google FCM credentials: the Notify service SID(IS0e9b3863450252891f81f312a6e3a7d7), 
      which has the FCM CREDENTIAL SID, type: FCM, and FCM SECRET(Google Firebase Server key Token).

--------------------------------------------------------------------------------
### Documentation Links

[Documentation](https://www.twilio.com/docs/notify/quickstart/firebase-web)
to create the Twilio Notification credentials.

[Push Credential entry](https://www.twilio.com/console/notify/credentials/create).

Configuring Android Push Notifications
[documentation](https://www.twilio.com/docs/notify/configure-android-push-notifications).

General set up [documentation](https://www.twilio.com/docs/conversations/javascript/push-notifications-web)
steps I followed.

My application sample was initial based on:
[TwilioDevEd sample](https://github.com/TwilioDevEd/notify-quickstart-webpush).

[Tutorial docs](https://www.twilio.com/docs/notify/quickstart/firebase-web).

[Sending Notifications](https://www.twilio.com/docs/notify/api/notification-resource),
[using an FCM token address](https://www.twilio.com/docs/notify/api/notification-resource?code-sample=code-send-a-notification-to-bindings-in-the-request&code-language=curl&code-sdk-version=json)

[Sending and Receiving Notifications](https://www.twilio.com/docs/notify/send-notifications)

--------------------------------------------------------------------------------

Cheers...

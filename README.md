# Twilio Notify Web Application Implementation

These are the steps to set up, configure, and run 
a sample Twilio Notify notification web application.
Once running, you can use a command line program to send notifications to the
browser that is running the web notification application.

<img src="notifyWebNotification.jpg" width="600"/>

Once this application is run in the browser and Twilio Notify binding is created,
notifications can be sent to the device using the identity or identities registered.
````
if the web application is running in the browser, 
    notifications will be handled by the application (see above).
if the web application tab is closed, or the browser is closed,
    notifications will be handled by the device (see below).
````

### Background Notifications

Once you run this application in a browser (on a device) and get a Firebase token,
the token can be used to send notification to the device whether the browser is still running or not.
If application is not running in the browser, 
the notification would be handled in the background.

<img src="notifyWebBackgroundNotification.jpg" width="400"/>

Note, when using a Mac with screen mirroring (which I'm using, laptop closed, external monitor),
to receive background notifications, 
````
Go to the option: Apple/System Preferences.../Notifications & Focus.
Select the browser, for example: Firefox.
Enable: Allow notifications: When mirroring or sharing the display.
````

## First, Create a Google Firebase Project

Create a [Google Firebase project](https://console.firebase.google.com/)
to handle the communications between the Google network (FCM) and the device (computer or phone)
you will running the web application client.

I used my personal Google account.
````
Click Add project.
Project Name: tignotify
Disable:  Enable Google Analytics for this project.
Click Create Project, Your new project is ready. Click Continue.
Get started by adding Firebase to your app ... Click Android icon.
Use an Android package name such as: "com.twilio.notify.quickstart".
Click register app.
````

### Add the Firebase Server Key into a New Twilio Notify Push Credential Entry

Get the [Google project](https://console.firebase.google.com/)
tignotify's Project Settings/Cloud messaging, Server key Token.

Add the Server key Token value into a newly created/added
[Push Credential entry](https://www.twilio.com/console/notify/credentials/create).

For example:
````
Friendly Name: tignotifyweb
Type: FCM
FCM Secret: AAAA...Tx (Firebase Server key Token)
````
Click Save.

## Create a Notify Service

Create a Notify Service Instance: [Twilio Console link](https://www.twilio.com/console/notify/services). 

For example:
````
FRIENDLY NAME: tignotifyweb
FCM CREDENTIAL SID: tignotifyweb (the above newly created credential entry)
Logging: enabled
````
Click Save.

Example Notify Service SID:
````
IS0e9b3863450252891f81f312a6e3a7d7
````

Side note, I used the same Firebase Server key Token 
as when I implemented the Android Notify app to receive notifications.

## Impliment the Web Application

### Download the Web Application that can Receive Twilio Notify Notifications

If you have the GitHub tools installed, you can clone this repository to your disk.
````
cd /Users/<user>/Projects/
$ git clone https://github.com/tigerfarm/notifyweb
...
$ cd notifyweb/
````

Or, download the ZIP into a working directory, and unzip it.
````
cd /Users/<user>/Projects/
$ mkdir notifyweb
$ cd notifyweb/
````

After downloading, rename "docroot/indexShow.html" to "docroot/index.html"

#### Files

- [docroot/index.html](docroot/indexShow.html) : Client HTML
- [docroot/notify_actions.js](docroot/notify_actions.js) : Client JavaScript functions
- [docroot/firebase-messaging-sw.js](docroot/firebase-messaging-sw.js) : JavaScript used by the Firebase JavaScript libraries
- [webserver.js](webserver.js) : a NodeJS Express HTTP Server that serves the client files.

#### Use the Google Firebase Project Information in the Web Application

In the file: firebase-messaging-sw.js,
set the value for messagingSenderId, to the Firebase "Project number".
Its listed under the Firebase project settings: "General".
````
firebase.initializeApp({
    'messagingSenderId': "5...1"
});
````
In the index.html file,
set the value for messagingSenderId, to the "Project number".
Set the value for apiKey, to the "Web API Key".
Both are listed under the Firebase project settings: "General".
Setting the projectId is optional. I use it to echo the Firebase project I was using.
````
            var config = {
                apiKey: "AI...Q",
                projectId: "tignotify",
                messagingSenderId: "5...1"
            };
````

Install the Express and Twilio modules.
````
$ npm install --save express
$ npm install --save twilio
````
Set environment variables. Or, hardcode them into the program: websever.js.
````
$ export MASTER_NOTIFY_SID=IS0e9b3863450252891f81f312a6e3a7d7
$ export MASTER_ACCOUNT_SID=AC...
$ export MASTER_AUTH_TOKEN=...
````
Run the web server. Default port is hardcoded to 8000.
````
$ node websever.js
+++ Notify web application server is starting up.
+ Notify service SID: IS0e9b3863450252891f81f312a6e3a7d7
+ Twilio client object created for Twilio account: ACa...3
+ Listening on port: 8000
````

## Register/Create a Twilio Notify Binding

In a web browser, goto the [link](http://localhost:8000/)(http://localhost:8000/).
````
Click "Get Firebase FCM message token".
    The token is displayed.
Enter an Identity such as "davew".
Click "Create Twilio Notify binding".
    The Twilio Notify Binding id is displayed.
````
The binding is created using the identity and the FCM message token.
The binding could also be created using the program: createBinding.js,
by copying the address into the theAddress value.

Sample run:

<img src="notifyWebNotification.jpg" width="400"/>

Use a command line program to list the newly created binding.
Note the above environment variables are required.

Sample run:
````
$ node listBindings.js 
+++ List bindings for a Notify service.
+ Notify service SID: IS0e9b3863450252891f81f312a6e3a7d7
+ The listing:
++ Binding-SID bindingType(fcm,apn):identity<address>)
++ BS6d939d5c2e0a18b2297443406de4f77e fcm:davew<e2fFuMEwN78:APA9...dXV>
````

## Send a notification:

Use the send notification program(sendNotification.js) to send a notification to the app user.

In the file, sendNotification.js, set identity to the Twilio Notify registered identity.

For example:
````
client.notify.services("IS0e9b3863450252891f81f312a6e3a7d7").notifications.create({
    identity: 'davew',
    body: 'Hello there 1'
})
````

Sample program run:
````
$ node sendNotification.js 
+++ Start sending notifications to an identity.
+ Sent: NTea47fb9ca9bc391f923dd2c999153a06
````
Or, use a curl command.
````
curl -X POST https://notify.twilio.com/v1/Services/IS0e9b3863450252891f81f312a6e3a7d7/Notifications \
    -d 'Identity=davew' \
    -d 'Body=Hello there 1' \
    -u $MASTER_ACCOUNT_SID:$MASTER_AUTH_TOKEN
$ curl -X POST https://notify.twilio.com/v1/Services/IS0e9b3863450252891f81f312a6e3a7d7/Notifications     -d 'Identity=davew'     -d 'Body=Hello there 1'     -u $MASTER_ACCOUNT_SID:$MASTER_AUTH_TOKEN
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
The notification will be received on the device where the Twilio Notify binding was registered.
Either handled in the application, or handled by the OS in the background.

Sample send where the NOtify request was successful, but nothing was sent.
````
$ node sendNotification.js 
+++ Start sending notifications to an identity.
+ Notify service SID: IS0e9b3863450252891f81f312a6e3a7d7
+ Sent: NT10483e690f1df0fc20dca87447b59ede
````
If the logs do not show any thing for a Notify log id (Twilio Console: No rows to display), then the binding may not exist.

### About the Send

Notification flow:
+ From your sending program
+ To Twilio
+ To Google(FCM) network
+ To the destination device.

The sending program includes:
+ The Notify service SID(IS0e9b3863450252891f81f312a6e3a7d7), 
      which has the FCM CREDENTIAL SID (type: FCM, and FCM SECRET)
+ The app user's identity(davew), which matches to the binding(BS6d939d5c2e0a18b2297443406de4f77e), 
      which has the Firebase token(e2fFuMEwN78:APA9...dXV) that was retrieved in the browser(firebase.messaging().getToken()).
+ The notification message('Hello there 1') to send.

--------------------------------------------------------------------------------
### Documentation Links

Configuring Android Push Notifications
[documentation](https://www.twilio.com/docs/notify/configure-android-push-notifications).

General set up [documentation](https://www.twilio.com/docs/conversations/javascript/push-notifications-web)
steps I followed.

[Documentation](https://www.twilio.com/docs/notify/quickstart/firebase-web)
to create the Twilio Notification credentials.

My application sample is a modified:
[TwilioDevEd sample](https://github.com/TwilioDevEd/notify-quickstart-webpush).

[Tutorial docs](https://www.twilio.com/docs/notify/quickstart/firebase-web).

[Push Credential entry](https://www.twilio.com/console/notify/credentials/create).

[Sending and Receiving Notifications](https://www.twilio.com/docs/notify/send-notifications)

--------------------------------------------------------------------------------

Cheers...

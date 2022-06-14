# Twilio Notify Web Application Implementation

This repository has 2 sample web applications to receive Twilio Notify notifications.
+ Directory [address](address) has a basic minimum sample web application.
+ Directory [bindings](bindings) has a web application sample that 
includes the "address" application funcationality, and uses Twilio Notify Bindings.

### Background Notifications

If application is not running in the browser when a notification is received,
the notification is handled in the background.

<img src="address/notifyw2.jpg" width="400"/>

Note, when using a Mac with screen mirroring (which I'm using, laptop closed, external monitor),
to receive background notifications, 
````
Go to the option: Apple/System Preferences.../Notifications & Focus.
Select the browser, for example: Firefox.
Enable: Allow notifications: When mirroring or sharing the display.
````

### Setup 

Do the following before working with samples applications.
Create and configure a Google Project and the matching Twilio configurations.

+ Create and configure a Google Firebase Project.
+ Create a Twilio Notify service and credentials.
The credentials use the Google Firebase project Server key Token.

After completing the following steps in this readme file, implement one of the web applicaions.

--------------------------------------------------------------------------------
## Create a Google Firebase Project

Create a [Google Firebase project](https://console.firebase.google.com/)
to handle the communications between the Google network (FCM) and the device (computer or phone)
you will running the web application client.

I used my personal Google account and went through the following steps.
````
+ Click Add project.
+ Enter your project name, for example: twilionotify. 
A unique identifier is created, for example: twilionotify-2ab35.
Click Continue.
+ Disable Google Analytics for this project.
Click Create Project.
Your project will be created: "Your new project is ready".
Click Continue.
+ On the left, under Firebase, beside Project Overview, click the settings icon.
````
You are now in the project General settings.
````
+ Under Project settings, click Cloud Messaging.
+ Beside "Cloud Messaging API (Legacy) Disabled", click the right 3 dots.
A new tab will open on a new page.
+ Under Cloud Messaging, click Enable.
You will be forward to another page: API APIs & Services.
Close this tab.
+ Back to the Project settings/Cloud Messaging and refresh the page.
The Server key Token is now displayed.
+ Farther down the page, under Web configuration/Web Push certificates, click Generate key pair.
````
You now have generated all the Google FCM codes required for notifications.
+ Firebase Server key Token
+ Sender ID
+ Web Push certificates: key pair.

<img src="notifyFirebase.jpg" width="600"/>

## Add the Firebase Server Key into a New Twilio Notify Push Credential Entry

Get the [Google project](https://console.firebase.google.com/)
twilionotify's Project Settings/Cloud messaging, Server key Token.

Add the Server key Token value into a newly created/added
[Push Credential entry](https://www.twilio.com/console/notify/credentials/create).

For example:
````
Friendly Name: twilionotify
Type: FCM
FCM Secret: AAAA...Tx (Firebase Server key Token)
````
Click Save.

## Create a Notify Service

Create a Notify Service Instance: [Twilio Console link](https://www.twilio.com/console/notify/services). 

For example:
````
FRIENDLY NAME: twilionotify
FCM CREDENTIAL SID: twilionotify (the above newly created credential entry)
Logging: enabled
````
Click Save.

Example Notify Service SID:
````
IS0e9b3863450252891f81f312a6e3a7d7
````

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
## Twilio Notify Android Quickstart

[GitHub repository](https://github.com/TwilioDevEd/notifications-quickstart-android)

[Documentation](https://www.twilio.com/docs/notify/quickstart/android)

Following is the Android code that is similar to the notification web application.

Firebase IDs used when retrieving a user token.
````
...notifications-quickstart-android/app/google-services.json
{
  "project_info": {
    "project_number": "572828197431",
  ...
  },
  "client": [
    {
      ...,
      "api_key": [
        {
          "current_key": "AIzaSyDF_F11EDPBk6wP7GXzHD9mWFArgUhULdQ"
        }
      ],
      ...
    }
    ...
}
````

Following is the same in the web application method, "getToken()", that is used to get the user FCM ID.
````
.../app/src/main/java/com/twilio/notify/quickstart/fcm/NotifyFirebaseInstanceIDService.java
...
    public void onTokenRefresh() {
        // Get updated InstanceID token.
        String refreshedToken = FirebaseInstanceId.getInstance().getToken();
        Log.d(TAG, "Refreshed token: " + refreshedToken);
        // If you want to send messages to this application instance or
        // manage this apps subscriptions on the server side, send the
        // Instance ID token to your app server.
        sendRegistrationToServer(refreshedToken);
    }
...
````

````
.../fcm/NotifyFirebaseMessagingService.java
...
    public void onMessageReceived(RemoteMessage message) {
        /*
         * The Notify service adds the message body to the remote message data so that we can
         * show a simple notification.
         */
        String from = message.getFrom();
        Map<String,String> data = message.getData();
        String title = data.get(NOTIFY_TITLE_DATA_KEY);
        String body = data.get(NOTIFY_BODY_DATA_KEY);
        Log.d(TAG, "From: " + from);
        Log.d(TAG, "Body: " + body);
        sendNotification(title, body);
    }
    private void sendNotification(String title, String message) {
        ...
        Uri defaultSoundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
        ...
        notificationManager.notify(0, notificationBuilder.build());
    }
...
````

Once the FCM ID is retrieved, an HTTP request is sent
to the registration Twilio Function to create a Notify Binding.
````
.../com/twilio/notify/quickstart/notifyapi/TwilioFunctionsAPI.java
...
public final static String BASE_SERVER_URL = "https://about-time-2357.twil.io";
...
"/register-binding"
...
````

Set the Twilio Functions Environment Variable to the same Notify SID used in the web applications.
Then, can use the sample program listBindings.js, to get the Android device's FCM id.
````
TWILIO_NOTIFICATION_SERVICE_SID = IS0e9b3863450252891f81f312a6e3a7d7
````

Twilio Functions register: https://about-time-2357.twil.io/register-binding
````
exports.handler = function(context, event, callback) {
    const twilioClient = context.getTwilioClient();
    const service = twilioClient.notify.services(
       context.TWILIO_NOTIFICATION_SERVICE_SID
   );
   console.log("event:" + JSON.stringify(event) + ":");
   const binding = {
       'identity':event.identity,
       'bindingType':event.BindingType,
       'address':event.Address
   }
   service.bindings.create(binding).then((binding) => {
       console.log("+ Binding SID:" + binding.sid + ":");
       console.log("+ Binding:" + binding);
       // Send a JSON response indicating success
       callback(null, {message: 'Binding created!'});
   }).catch((error) => {
       console.log(error);
       callback(error, {
       error: error,
       message: 'Failed to create binding: ' + error,
     });
 });
};
````
Sample run log messages:
````
event:{"BindingType":"fcm","identity":"davea","Address":"faReuVhz_gk:APA91bHsNzVpwfrRp_1zIfSr-qCdgM44FhMjFsYfAw6u91uEW0NsQ8ZC_ESnfsf1pU3cb2zpxfOZmfEXe-P_dGd9NuIcMbt3JI4JPW_dhVgk7H5Dka5DbjQ9yrHAFZAA7UKCqdZwws7V"}:
+ Binding SID:BS315f33c816d1f8485db6f80253978a5a:
````
View the Twilio Notify binding:
````
$ node listBindings.js 
+++ List bindings for a Notify service.
+ Notify service SID: IS0e9b3863450252891f81f312a6e3a7d7
+ The listing:
++ Binding-SID bindingType(fcm,apn):identity<address>)
...
++ BS41dbd62a57839201ba892cf40cf97264 fcm:davea<faReuVhz_gk:APA91bHsNzVpwfrRp_1zIfSr-qCdgM44FhMjFsYfAw6u91uEW0NsQ8ZC_ESnfsf1pU3cb2zpxfOZmfEXe-P_dGd9NuIcMbt3JI4JPW_dhVgk7H5Dka5DbjQ9yrHAFZAA7UKCqdZwws7V>
````

--------------------------------------------------------------------------------

Cheers...

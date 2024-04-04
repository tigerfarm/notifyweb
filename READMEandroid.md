# Twilio Notify Android Quickstart Notes

I did testing using my Android Twilio Notify Quickstart app. Notifications are received:
+ When the app is in the foreground.
+ When the app is in the background.

Notifications are not received:
+ When the app is closed.

The messages are sent as data type messages.

--------------------------------------------------------------------------------
The sample Twilio Notify Android Quickstart app uses project:
+ Project ID: tignotify
+ Project number: 572828197431
+ Web API Key: AIzaSyDF_F11EDPBk6wP7GXzHD9mWFArgUhULdQ 

To use the Notify service: IS0e9b3863450252891f81f312a6e3a7d7,
change FCM CREDENTIAL SID from tignotifyweb to "Adroid Quickstart app".

--------------------------------------------------------------------------------
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
.../app/src/main/java/com/twilio/notify/quickstart/fcm/NotifyFirebaseMessagingService.java
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
            NotificationChannel channel = new NotificationChannel(
                    CHANNEL_ID,
                    "CHANNEL_NAME", NotificationManager.IMPORTANCE_LOW
            );
        ...
        notificationManager.notify(0, notificationBuilder.build());
    }
...
````
Note,"CHANNEL_NAME" shows up in my phone's Notify QUickstart Settings/Notifications

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
event:{"BindingType":"fcm","identity":"daves","Address":"faReuVhz_gk:APA91bHsNzVpwfrRp_1zIfSr-qCdgM44FhMjFsYfAw6u91uEW0NsQ8ZC_ESnfsf1pU3cb2zpxfOZmfEXe-P_dGd9NuIcMbt3JI4JPW_dhVgk7H5Dka5DbjQ9yrHAFZAA7UKCqdZwws7V"}:
+ Binding SID:BS1c93a90d06471a757c26a9312df79712:
````
View the Twilio Notify binding:
````
$ node listBindings.js 
+++ List bindings for a Notify service.
+ Notify service SID: IS0e9b3863450252891f81f312a6e3a7d7
+ The listing:
++ Binding-SID bindingType(fcm,apn):identity<address>)
...
++ BS1c93a90d06471a757c26a9312df79712 fcm:daves<faReuVhz_gk:APA91bHsNzVpwfrRp_1zIfSr-qCdgM44FhMjFsYfAw6u91uEW0NsQ8ZC_ESnfsf1pU3cb2zpxfOZmfEXe-P_dGd9NuIcMbt3JI4JPW_dhVgk7H5Dka5DbjQ9yrHAFZAA7UKCqdZwws7V>
````

--------------------------------------------------------------------------------
### Sending Notifications

Sample run:
````
$ node sendNotification.js 
+++ Start sending notifications to an identity.
+ notifyServiceSid: IS0e9b3863450252891f81f312a6e3a7d7 to theIdentity: daves
+ Sent: NT0604fa75d2136ecee0040a18906d2fb8
````
When the app is running in the foreground or background,
the Notify NT0604fa75d2136ecee0040a18906d2fb8 logs show:
````
STATE: SENT
````
I closed/stopped the app using:
Settings/Apps & Notifications/Notify Quickstart/Force Stop.

When the app is not running,the Notify logs show,
````
STATE: SENT
````
Even though, the STATE shows SENT, the notification was not displayed.

When I send using incorrect configurations, the Notify log show,
````
No rows to display
````

I reopened the app, and since the app already registered as "daves",
when I send a notification, the notification is received.

--------------------------------------------------------------------------------
### Documentation Links

[GitHub repository](https://github.com/TwilioDevEd/notifications-quickstart-android)

[Documentation](https://www.twilio.com/docs/notify/quickstart/android)

Configuring Android Push Notifications
[documentation](https://www.twilio.com/docs/notify/configure-android-push-notifications).

--------------------------------------------------------------------------------

Cheers...

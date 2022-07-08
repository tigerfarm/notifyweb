# Twilio Notify iOS Notificaiont Notes

Documentation steps to 
[Configure iOS Push Notifications](https://www.twilio.com/docs/notify/configure-ios-push-notifications)

1. Go to
[Apple development account](https://developer.apple.com/account) has App IDs.

2. Create an Apple Development iOS Push Services certificate.
The certificate is created in line with the App ID(Apple development account app id).
This will enable your app to receive notifications.

3. Use the certificate to create a credential for Twilio.

4. Configure your Twilio Service to use your APNS credentials

--------------------------------------------------------------------------------
### Register the device with the APN service

https://www.twilio.com/docs/notify/register-for-notifications-ios

Address: The device token obtained from iOS.

For iOS, there is an Explicit Bundle ID is set when
[creating the App ID](https://www.twilio.com/docs/notify/configure-ios-push-notifications#option-2-create-a-new-app-id).
"Enter an Explicit Bundle ID that matches the bundle identifier (such as com.twilio.notify.NotifyQuickstart) of your app in Xcode."

In the [Android documentation](https://www.twilio.com/docs/notify/configure-android-push-notifications#step-3-set-up-your-projects-dependencies),
google-services.json is mentioned.
It contains the Firebase project information to register apps on devices with the Firebase network (FCM).

#### Note about background notifications.

Sending
https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/sending_notification_requests_to_apns
alert: Use the alert push type for notifications that trigger a user interaction—for example, an alert, badge, or sound.
background: Use the background push type for notifications that deliver content in the background, and don’t trigger any user interactions.

--------------------------------------------------------------------------------

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
### Documentation Links

[GitHub repository](https://github.com/TwilioDevEd/notifications-quickstart-android)

[Documentation](https://www.twilio.com/docs/notify/quickstart/android)

Configuring Android Push Notifications
[documentation](https://www.twilio.com/docs/notify/configure-android-push-notifications).

--------------------------------------------------------------------------------

Cheers...

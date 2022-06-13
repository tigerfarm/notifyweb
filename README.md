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

Here, I've included the steps to set up, configure, and run the sample web applications.
Before working with applications:
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

Cheers...

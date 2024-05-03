# New Twilio FCM notification configuration setup

Updating Twilio Push for FCM HTTP v1 API
https://help.twilio.com/articles/20768292997147-Updating-Twilio-Push-for-FCM-HTTP-v1-API

Send custom notifications by channel, payload override:
https://www.twilio.com/docs/notify/api/notification-resource#send-custom-notifications-by-channel

Note, FCM custom payload notifications require updates when using the new Google credentials: FCM HTTP v1 API.
See programs:
+ [bindings/sendNotificationToBindingPayloadLegacy.js](bindings/sendNotificationToBindingPayloadLegacy.js)
+ [bindings/sendNotificationToBindingPayloadNew.js](bindings/sendNotificationToBindingPayloadNew.js)

For reference,
[Google Firebase project](https://console.firebase.google.com/) link for legacy configurations.


--------------------------------------------------------------------------------
Below, is the steps I went through.

Confirm that your project is enable for Firebase Cloud Messaging API (V1).
Goto [Google Firebase projects](https://console.firebase.google.com/) and click your project.
Project Overview/Project Settings.
Click Cloud Messaging tab. Confirm Firebase Cloud Messaging API (V1) is enabled.
````
Firebase Cloud Messaging API (V1) Enabled
````
The following may have enabled it for me:
````
---
I think the following is required:
From the following page, under Before you begin/Enable the IAM API, click Enable the API. 
https://cloud.google.com/iam/docs/creating-custom-roles
Short form to confirm the project and enable.
---
````
Documentation steps:
````
--------------------------------------------------------------------------------
Step 1: Create a Custom Role for FCM in Google Cloud Console
1. Go to the IAM & Admin section.
https://console.cloud.google.com/iam-admin

The following is for:
+ New project: twilionotify2024
+ Older project: twilionotify, which is tested and works.

2. Create a custom role for FCM.
Click "Roles" on the left menu which goes to:
https://console.cloud.google.com/iam-admin/roles
Click "Create Role".

3. Add only the "cloudmessaging.messages.create" permission to the role. This is the only role we need.
Current form matches the Twilio doc.
I set the form values to match the doc: custom-fcm-role, CustomFcmRole, ...
Click Add Permissions.
Enter Filter: "Cloud Messaging", and select/click Firebase Cloud Admin API. Click OK.
Click/select: cloudmessaging.messages.create/Supported, click ADD.
Clicked Create.
Message displayed, "Role created."

--------------------
Step 2: Create a New GCP Service Account
Clicked Service Accounts menu item on the left.
https://console.cloud.google.com/iam-admin/serviceaccounts

Clicked + Create Service Account.
I set the form values to match the doc,
1.  Service account details, Service Account name: custom-fcm-sa
Gives, Email address: 
For project: twilionotify2024   custom-fcm-sa@twilionotify2024.iam.gserviceaccount.com
For project: twilionotify       custom-fcm-sa@twilionotify-4bb3b.iam.gserviceaccount.com
Clicked Create and Continue.
Displays, Grant this service account access to project:
Filter: custom-fcm-role, and selected it (created above in step 1).
Clicked Continue. Clicked Done.
Gives list of Service accounts for project "twilionotify2024" .

--------------------
Step 3: Generate a Private Key for the Service Account
In the list of Service accounts, I clicked: custom-fcm-sa@twilionotify2024.iam.gserviceaccount.com.
Under: custom-fcm-sa, top menu, I clicked: Keys which matches the step documentation.
Click Add key/Create new key: JSON, click Create.

For project: twilionotify2024
Private key saved to your computer: twilionotify2024-...json:
For project: twilionotify
Private key saved to your computer: twilionotify-...json

Click Close.

--------------------
Step 4: Configure Your Twilio Credential Using the FCM Private Key
In Twilio Console
https://console.twilio.com/us1/account/keys-credentials/push-credentials
Create New Credentials,
+ Name: twilionotify2024, FCM Push credential >> Credential SID: CR3551bd299871fb5ca942d8417e0e04cb
+ Name: twilionotify2, FCM Push credential >> Credential SID: CRc75055a32cede84b70494b0669d3e02c

--------------------------------------------------------------------------------
++ Application testing

Note, my recent tests only worked with my Chrome browser, didn't work with my Firefox browser.

In Twilio Console,
Develop/Notify/Services/notifyweb: IS0e9b3863450252891f81f312a6e3a7d7
Current, legacy:
Configure/Properties, FCM CREDENTIAL SID: notifyweb

In the sample application: notifyweb/bindings.
sendNotificationToBinding.js uses, notifyweb: IS0e9b3863450252891f81f312a6e3a7d7

------
++ Use the new credential from the new FCM project.
Change from:
FCM CREDENTIAL SID: notifyweb
To:
FCM CREDENTIAL SID: notifyweb2024
sendNotificationToBinding fails:
FAILED	52109: GCM/FCM API key is revoked or invalid
Failed because the receiving notification application uses different Google project ids.

------
++ Use the new credential from the old tested FCM project
which is the same project used in the receiving notification application.
Change to:
FCM CREDENTIAL SID: notifyweb2
sendNotificationToBinding succeeds.

--------------------------------------------------------------------------------
++ Custom payload

++ Use the legacy credentials from the old tested FCM project
which is the same project used in the receiving notification application.
Change to:
FCM CREDENTIAL SID: twilionotify
sendNotificationToBindingPayloadLegacy.js.js succeeds.

++ Use the new credential from the old tested FCM project
which is the same project used in the receiving notification application.
Change to:
FCM CREDENTIAL SID: twilionotify2 (also twilionotify3)
sendNotificationToBindingPayloadNew.js succeeds.

````
--------------------------------------------------------------------------------

Cheers...

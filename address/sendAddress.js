// -----------------------------------------------------------------------------
console.log("+++ Send a notifications to an FCM token address which is a device address.");
const client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
const notifyServiceSid = process.env.MAIN_NOTIFY_SID;
console.log("+ Twilio Notify service SID: " + notifyServiceSid);
//
// For this web application, the "address" is the FCM token value from: index.html.
// Firefox older FCM token, Conversations token:
// deviceFcmTokenAddress = "eQZbCbVf4tQ:APA91bHac8cXIKDPfJNsM6Ffb7py52PMA2H5ERlRF0alq_haXlToLq9p1SbafmHu0olREyPIfsU2xfCjZP8RIbt6qjuQT2Oub21rE05-yPY06b_pQd4BQ4-jVS0ciBQW-j-22XezSftK";
// Firefox current FCM token:
deviceFcmTokenAddress = "c2h7i9H7mcI:APA91bEifCmmIObAbgLUEUys1J_KwKx1bJW3XaxcggSqbheRAQIAwLLoZWccfmRhv3xw_XrNhqHu4OrDdAMF5fQmglY7dv2HetFkZm_3YG_WK1fd0-6yQGBvvHZKFyPM02rbDePLXswX";
// Chrome browser:
// deviceFcmTokenAddress = "c0hBfNzzGlw:APA91bFaXGpwsyVR_erMMLp_LLckTTZRkDBpJvcXOK36C-kBKGXTk8Zc1gU8wwCMjSekQ5T8vMvADd4IGbO6xQDinGLpt5V7KU9DdHiszG9_1rzkcklu17_D0xxgQFKTlPSZxvTXG4Rm";
//
client.notify.services(notifyServiceSid).notifications.create({
    body: 'Hello there 6e',
    toBinding: [
        JSON.stringify({"binding_type": "fcm", "address": deviceFcmTokenAddress})
    ]
}).then(notification => console.log("+ Sent, Twilio Notify log id: " + notification.sid))
        .catch(error => console.log("- Error: " + error));

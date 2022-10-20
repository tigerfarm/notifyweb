// -----------------------------------------------------------------------------
// Notify notification testing web server
// + Twilio client is created and used to add a Notify binding.
// 
// Easy to use.
// Install modules.
//  $ npm install --save express
//  $ npm install --save twilio
//  
// Run the web server. Default port is hardcoded to 8000.
//  $ node websever.js
// 
// -----------------------------------------------------------------------------
console.log("+++ Notify web application server is starting up.");
//
// -----------------------------------------------------------------------------
// Web server interface to call functions.
// 
const express = require('express');
const path = require('path');
const url = require("url");

// When deploying to Heroku, must use the keyword, "PORT".
// This allows Heroku to override the value and use port 80. And when running locally can use other ports.
const PORT = process.env.PORT || 8000;

var app = express();

// -----------------------------------------------------------------------------
// Set program variables using environment variables.

const ACCOUNT_SID = process.env.CONVERSATIONS_ACCOUNT_SID;
var client = require('twilio')(ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
console.log("+ Twilio client object created for Twilio account: " + ACCOUNT_SID);

var API_KEY = process.env.CONVERSATIONS_API_KEY;
var API_KEY_SECRET = process.env.CONVERSATIONS_API_KEY_SECRET;

var CONVERSATIONS_SERVICE_SID = process.env.CONVERSATIONS_SERVICE_SID;
var FCM_CREDENTIAL_SID = process.env.FCM_CREDENTIAL_SID;
console.log("+ CONVERSATIONS_SERVICE_SID: " + CONVERSATIONS_SERVICE_SID);
console.log("+ FCM_CREDENTIAL_SID :" + FCM_CREDENTIAL_SID + ":");

// -----------------------------------------------------------------------------
// Respond with a generated Conversations conversation token.
//
// Documentation: https://www.twilio.com/docs/iam/access-tokens

function generateToken(theIdentity) {
    if (theIdentity === "") {
        console.log("- Required: user identity for creating a Conversations token.");
        return "";
    }
    console.log("+ Generate token, Conversations participants ID: " + theIdentity);
    const AccessToken = require('twilio').jwt.AccessToken;
    const token = new AccessToken(
            ACCOUNT_SID,
            API_KEY,
            API_KEY_SECRET
            );
    // Create a service: https://www.twilio.com/console/conversations/services
    let chatGrant;
    if (FCM_CREDENTIAL_SID) {
        chatGrant = new AccessToken.ChatGrant({
            serviceSid: CONVERSATIONS_SERVICE_SID,
            pushCredentialSid: FCM_CREDENTIAL_SID   // For web application notifications
        });
    } else {
        chatGrant = new AccessToken.ChatGrant({
            serviceSid: CONVERSATIONS_SERVICE_SID
        });
    }
    token.addGrant(chatGrant);
    token.identity = theIdentity;
    // token.ttl = 1200; // Token time to live, in seconds. 1200 = 20 minutes.
    token.ttl = 600; // Token time to live, in seconds. 600 = 5 minutes. For testing token update.
    //
    // Output the token.
    theToken = token.toJwt();
    // console.log("+ theToken " + theToken);
    return(theToken);
}

app.get('/generateToken', function (req, res) {
    console.log("+ Generate Conversations Token.");
    if (req.query.identity) {
        res.send(generateToken(req.query.identity));
    } else {
        console.log("- Parameter required: identity.");
        res.sendStatus(502);
    }
});

// -----------------------------------------------------------------------------
app.get('/hello', function (req, res) {
    res.send('+ hello there.');
});
// -----------------------------------------------------------------------------
app.use(express.static('docroot'));
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('HTTP Error 500.');
});
app.listen(PORT, function () {
    console.log('+ Listening on port: ' + PORT);
});

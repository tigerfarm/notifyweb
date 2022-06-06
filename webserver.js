// -----------------------------------------------------------------------------
// Chat web server
// 
// Easy to use.
// Install modules.
//  $ npm install --save express
//  
// Run the web server. Default port is hardcoded to 8000.
//  $ node websever.js
// 
// -----------------------------------------------------------------------------
console.log("+++ Notify web application server is starting up.");
//
var NOTIFY_SID = process.env.MASTER_NOTIFY_SID;
console.log("+ Notify service SID: " + NOTIFY_SID);
//
var client = require('twilio')(process.env.CONVERSATIONS_ACCOUNT_SID, process.env.CONVERSATIONS_ACCOUNT_AUTH_TOKEN);
console.log("+ Twilio client object created for Twilio account: " + process.env.CONVERSATIONS_ACCOUNT_SID);
//
// -----------------------------------------------------------------------------
var returnMessage = '';
function sayMessage(message) {
    returnMessage = returnMessage + message + "<br>";
    console.log(message);
}

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Web server interface to call functions.
// -----------------------------------------------------------------------------
// 
// $ npm install express --save
const express = require('express');
const path = require('path');
const url = require("url");

// When deploying to Heroku, must use the keyword, "PORT".
// This allows Heroku to override the value and use port 80. And when running locally can use other ports.
const PORT = process.env.PORT || 8000;

var app = express();
// -----------------------------------------------------------------------------
app.get('/registerBinding', function (req, res) {
    var theParameters = "";
    var theParametersError = "";
    sayMessage("+ Twilio Notify Quickstart, Register binding.");
    if (req.query.identity) {
        theParameters = " identity:" + req.query.identity + ":";
    } else {
        sayMessage("- Parameter required: identity.");
        theParametersError = " identity";
    }
    if (req.query.bindingType) {
        theParameters = theParameters + " bindingType:" + req.query.bindingType + ":";
    } else {
        sayMessage("- Parameter required: bindingType.");
        theParametersError = " bindingType";
    }
    if (req.query.address) {
        theParameters = theParameters + " address:" + req.query.address + ":";
    } else {
        sayMessage("- Parameter required: address.");
        theParametersError = " address";
    }
    if (theParametersError !== "") {
        res.status(500).send('HTTP Error 500, Parameters required:' + theParametersError);
        return;
    }
    // --------------------------------------------
    // Register for Twilio Notify notifications
    const binding = {
        'identity': req.query.identity,
        'bindingType': req.query.bindingType,
        'address': req.query.address
    };
    console.log("+ Binding parameters:" + JSON.stringify(binding) + ":");
    const service = client.notify.services(
            NOTIFY_SID
            );
    service.bindings.create(binding).then((bindingResult) => {
        console.log("+ Binding SID:" + bindingResult.sid + ":");
        // console.log("+ Binding:" + JSON.stringify(bindingResult));
        res.send("+ Binding SID: " + bindingResult.sid);
    }).catch((error) => {
        console.log(error);
        res.status(500).send('HTTP Error 500, Failed to create binding: ' + error);
    });
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

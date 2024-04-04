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
// + Get environment variable.
// + Create a Twilio client object.
// + Process a request to create a Notify binding.

var NOTIFY_SID = process.env.MAIN_NOTIFY_SID;
console.log("+ Notify service SID: " + NOTIFY_SID);
//
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
console.log("+ Twilio client object created for Twilio account: " + process.env.MAIN_ACCOUNT_SID);
//
// Process a request to create a Notify binding.
app.get('/registerBinding', function (req, res) {
    var theParameters = "";
    var theParametersError = "";
    console.log("+ Twilio Notify Quickstart, Register binding.");
    if (req.query.identity) {
        theParameters = " identity:" + req.query.identity + ":";
    } else {
        console.log("- Parameter required: identity.");
        theParametersError = " identity";
    }
    if (req.query.bindingType) {
        theParameters = theParameters + " bindingType:" + req.query.bindingType + ":";
    } else {
        console.log("- Parameter required: bindingType.");
        theParametersError = " bindingType";
    }
    if (req.query.address) {
        theParameters = theParameters + " address:" + req.query.address + ":";
    } else {
        console.log("- Parameter required: address.");
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
        // console.log("+ Binding result:" + JSON.stringify(bindingResult));
        console.log("+ Binding SID:" + bindingResult.sid + ":");
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

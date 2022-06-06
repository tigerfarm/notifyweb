// Register a binding
function registerBinding(identity, address) {
    var jqxhr = $.get("registerBinding?bindingType=fcm" + "&identity=" + identity + "&address=" + address, function (theResponse) {
        // Sample: "+ Binding SID:BScacdf587aa405e7a2ddfea2de29abee7:"
        if (!theResponse.startsWith("+ Binding SID:")) {
            console.log("- Error register the binding.");
            return;
        }
        document.getElementById("bindingSid").innerText = theResponse;
        console.log(theResponse);
    });
}

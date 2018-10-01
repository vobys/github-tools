var json = require("./issues");
var issueApi = require("./issue");

// noinspection JSUnresolvedVariable
console.log("Setup to send " + json.length + " issues...");

// noinspection JSUnresolvedFunction
json.forEach(function(issue) {
    issueApi.create(issue);
});

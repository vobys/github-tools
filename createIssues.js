const json = require("./issues");
const issueApi = require("./issue");

console.log("Setup to send " + json.length + " issues...");

json.forEach(function(issue) {
  issueApi.create(issue);
});

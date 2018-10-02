var config = require("./config");
var request = require("request");

var createIssue = function(issue) {
    var options = {
        method: "POST",
        url: "https://api.github.com/repos/" + config.username + "/" + config.toRepo + "/issues",
        headers:
                {
                    "Cache-Control": "no-cache",
                    "User-Agent": "GitHubTools",
                    Authorization: "token " + config.token,
                    "Content-Type": "application/json"
                },
        body: issue,
        json: true
    };

    // noinspection JSUnresolvedFunction
    request(options, function(error, response, body) {
        if (error) throw new Error(error);
        if (response.statusCode === 201) {
            console.log("Created New Issue " + body.id);
        } else {
            console.log("Error Sending Issue " + (issue.id !== undefined ? issue.id : issue.title) + " | Error: " + response.statusCode);
        }
    });
};

exports.create = createIssue;

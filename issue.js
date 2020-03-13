const config = require("./config");
const request = require("request");

const createIssue = function(issue) {
  const options = {
    method: "POST",
    url:
      "https://api.github.com/repos/" +
      config.username +
      "/" +
      config.toRepo +
      "/issues",
    headers: {
      "Cache-Control": "no-cache",
      "User-Agent": "GitHubTools",
      Authorization: "token " + config.token,
      "Content-Type": "application/json"
    },
    body: issue,
    json: true
  };

  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    if (response.statusCode === 201) {
      console.log("Created New Issue " + body.id);
    } else {
      console.log(
        "Error Sending Issue " +
          (issue.id === undefined ? issue.title : issue.id) +
          " | Error: " +
          response.statusCode
      );
    }
  });
};

exports.create = createIssue;

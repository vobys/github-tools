const config = require("./config");
const request = require("request");

const retrieveLabels = function() {
  const options = {
    method: "GET",
    url:
      "https://api.github.com/repos/" +
      config.username +
      "/" +
      config.fromRepo +
      "/labels?per_page=100",
    headers: {
      "Cache-Control": "no-cache",
      "User-Agent": "GitHubTools",
      Accept: "application/vnd.github.symmetra-preview+json",
      Authorization: "token " + config.token,
      "Content-Type": "application/json"
    },
    json: true
  };

  return new Promise(function(resolve, reject) {
    request(options, function(error, response, body) {
      if (error) return reject(error);
      if (response.statusCode === 200) {
        console.log(body.length + " Labels retrieved");
        return resolve(body);
      }

      console.log("Error Retrieving Labels | Error: " + response.statusCode);
      return resolve([]);
    });
  });
};

const createLabel = function(label) {
  const options = {
    method: "POST",
    url:
      "https://api.github.com/repos/" +
      config.username +
      "/" +
      config.toRepo +
      "/labels",
    headers: {
      "Cache-Control": "no-cache",
      "User-Agent": "GitHubTools",
      Accept: "application/vnd.github.symmetra-preview+json",
      Authorization: "token " + config.token,
      "Content-Type": "application/json"
    },
    body: label,
    json: true
  };

  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    if (response.statusCode === 201) {
      console.log("Created New Label " + body.id);
    } else {
      console.log(
        "Error Sending Label " +
          (label.id === undefined ? label.name : label.id) +
          " | Error: " +
          response.statusCode
      );
    }
  });
};

exports.retrieve = retrieveLabels;
exports.create = createLabel;

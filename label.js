var config = require("./config");
var request = require("request");

var retrieveLabels = function() {
    var options = {
        method: 'GET',
        url: 'https://api.github.com/repos/' + config.username + '/' + config.fromRepo + '/labels',
        headers:
                {
                    'Cache-Control': 'no-cache',
                    'User-Agent': 'GitHubTools',
                    Accept: 'application/vnd.github.symmetra-preview+json',
                    Authorization: 'token ' + config.token,
                    'Content-Type': 'application/json'
                },
        json: true
    };

    // noinspection JSUnresolvedFunction
    return new Promise(function(resolve, reject) {
        request(options, function(error, response, body) {
            if (error) return reject(error);
            if (response.statusCode === 200) {
                console.log(body.length + " Labels retrieved");
                return resolve(body);
            } else {
                console.log("Error Retrieving Labels" + " | Error: " + response.statusCode);
                return resolve([]);
            }
        });
    });

};

var createLabel = function(label) {
    var options = {
        method: 'POST',
        url: 'https://api.github.com/repos/' + config.username + '/' + config.toRepo + '/labels',
        headers:
                {
                    'Cache-Control': 'no-cache',
                    'User-Agent': 'GitHubTools',
                    Accept: 'application/vnd.github.symmetra-preview+json',
                    Authorization: 'token ' + config.token,
                    'Content-Type': 'application/json'
                },
        body: label,
        json: true
    };

    // noinspection JSUnresolvedFunction
    request(options, function(error, response, body) {
        if (error) throw new Error(error);
        if (response.statusCode === 201) {
            console.log("Created New Label " + body.id);
        } else {
            console.log("Error Sending Label " + (label.id !== undefined ? label.id : label.name) + " | Error: " + response.statusCode);
        }
    });
};

exports.retrieve = retrieveLabels;
exports.create = createLabel;

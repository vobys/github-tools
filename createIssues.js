var json = require("./issues");
var request = require("request");

// noinspection JSUnresolvedVariable
console.log("Setup to send " + json.length + " issues...");

var options = {
    method: 'POST',
    url: 'https://api.github.com/repos/vobys/vobys-folha-spring-boot/issues',
    headers:
            {
                'Cache-Control': 'no-cache',
                'User-Agent': 'GitHubTools',
                Authorization: 'token TOKEN',
                'Content-Type': 'application/json'
            },
    body:
            {},
    json: true
};

// noinspection JSUnresolvedFunction
json.forEach(function(item) {
    options.body = item;
    request(options, function(error, response, body) {
        if (error) throw new Error(error);
        if (response.statusCode === 201) {
            console.log("Created New Issue " + body.id);
        } else {
            console.log("Error Sending Issue " + (item.id !== undefined ? item.id : item.title) + " | Error: " + response.statusCode);
        }
    });
});

var labelApi = require("./label");

// noinspection JSUnresolvedVariable
console.log("Setup to retrieve labels...");

labelApi.retrieve().then(function(labels) {
    labels.forEach(function(label) {
        labelApi.create(label);
    });
});

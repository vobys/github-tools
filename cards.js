const request = require("request");

const retrieveCards = function(fromCol, token) {
  const options = {
    method: "GET",
    url:
      "https://api.github.com/projects/columns/" +
      fromCol +
      "/cards?per_page=100",
    headers: {
      "Cache-Control": "no-cache",
      "User-Agent": "GitHubTools",
      Accept: "application/vnd.github+json",
      Authorization: "token " + token,
      "Content-Type": "application/json"
    },
    json: true
  };

  return new Promise(function(resolve, reject) {
    request(options, function(error, response, body) {
      if (error) return reject(error);
      if (response.statusCode === 200) {
        console.log(body.length + " Cards retrieved");
        return resolve(body);
      }

      console.log("Error Retrieving Cards | Error: " + response.statusCode);
      return resolve([]);
    });
  });
};

const moveCard = function(card, toCol, token) {
  const options = {
    method: "POST",
    url: "https://api.github.com/projects/columns/cards/" + card.id + "/moves",
    headers: {
      "Cache-Control": "no-cache",
      "User-Agent": "GitHubTools",
      Accept: "application/vnd.github+json",
      Authorization: "token " + token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      // eslint-disable-next-line camelcase
      column_id: toCol,
      position: "top"
    })
  };

  request(options, function(error, response) {
    console.log(options.body);
    if (error) throw new Error(error);
    if (response.statusCode === 201) {
      console.log("Moved Card to Column " + toCol);
    } else {
      console.log(
        "Error Moving Card " + card.id + " | Error: " + response.statusCode
      );
    }
  });
};

exports.retrieve = retrieveCards;
exports.move = moveCard;

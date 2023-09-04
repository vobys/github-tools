const config = require("./config");
const cardsApi = require("./cards");

console.log("Setup to retrieve cards...");

cardsApi
  .retrieve(config.fromAnotherCol, config.token)
  .then(function(anotherCards) {
    cardsApi.retrieve(config.fromCol, config.token).then(function(cards) {
      cards
        .slice()
        .reverse()
        .forEach(function(card) {
          console.log(card.id + " - " + card.content_url);
          cardsApi.move(card, config.toCol, config.token);
          const acs = anotherCards.filter(
            ac => card.content_url === ac.content_url
          );

          acs.forEach(function(ac) {
            console.log("=> " + ac.id + " - " + ac.content_url);
            cardsApi.move(ac, config.toAnotherCol, config.token);
          });
        });
    });
  });

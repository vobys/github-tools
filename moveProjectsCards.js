/* eslint-disable */
const config = require("./config");
const cardsApi = require("./cards");

console.log("Setup to retrieve cards...");

cardsApi.retrieve(config.fromCol, config.token).then(function(cards) {
  cards
    .slice()
    .reverse()
    .forEach(function(card) {
      console.log(card.id + " - " + card.content_url);
      cardsApi.move(card, config.toCol, config.token);
    });

  config.anotherCols.forEach(function(ac) {
    console.log("=> " + ac.from + " - " + ac.to);
    cardsApi.retrieve(ac.from, config.token).then(function(anotherCards) {
      cards
        .slice()
        .reverse()
        .forEach(function(card) {
          const acs = anotherCards.filter(
            anotherCard => card.content_url === anotherCard.content_url
          );

          acs.forEach(function(anotherCard) {
            console.log(
              "=> " + anotherCard.id + " - " + anotherCard.content_url
            );
            cardsApi.move(anotherCard, ac.to, config.token);
          });
        });
    });
  });
});

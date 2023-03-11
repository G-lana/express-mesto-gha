const routesCards = require("express").Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

routesCards.get("/", getCards);
routesCards.post("/", createCard);
routesCards.delete("/:cardId", deleteCard);
routesCards.put("/:cardId/likes", likeCard);
routesCards.delete("/:cardId/likes", dislikeCard);

module.exports = routesCards;

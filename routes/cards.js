const routesCards = require('express').Router();
const { validateCreateCard, validateCardId } = require('../middlewares/validation');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

routesCards.get('/', getCards);
routesCards.post('/', validateCreateCard, createCard);
routesCards.delete('/:cardId', validateCardId, deleteCard);
routesCards.put('/:cardId/likes', validateCardId, likeCard);
routesCards.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = routesCards;

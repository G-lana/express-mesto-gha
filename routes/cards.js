const routesCards = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

routesCards.get('/', getCards);
routesCards.post('/',   celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string()
      .required()
      .regex(/https?:\/\/(www)?[0-9a-z\-._~:/?#[\]@!$&'()*+,;=]+#?$/i),
  }),
}), createCard);
routesCards.delete('/:cardId', deleteCard);
routesCards.put('/:cardId/likes', likeCard);
routesCards.delete('/:cardId/likes', dislikeCard);

module.exports = routesCards;

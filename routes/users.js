const routesUsers = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getSpecialUser,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

routesUsers.get('/', getUsers);
routesUsers.get('/me', getCurrentUser)
routesUsers.get('/:userId', getSpecialUser);
routesUsers.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);
routesUsers.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(
      /https?:\/\/(www)?[0-9a-z\-._~:/?#[\]@!$&'()*+,;=]+#?$/i,
    ),
  }),
}), updateAvatar);

module.exports = routesUsers;

const routesUsers = require('express').Router();
const { validateUserId, validateUpdateProfile, validateUpdateAvatar } = require('../middlewares/validation');
const {
  getUsers,
  getUser,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

routesUsers.get('/', getUsers);
routesUsers.get('/me', getCurrentUser);
routesUsers.get('/:userId', validateUserId, getUser);
routesUsers.patch('/me', validateUpdateProfile, updateProfile);
routesUsers.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = routesUsers;

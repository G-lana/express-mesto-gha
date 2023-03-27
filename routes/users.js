const routesUsers = require('express').Router();
const auth = require('../middlewares/auth')
const {
  getUsers,
  getSpecialUser,
  getCurrentUser,
  createUser,
  updateProfile,
  updateAvatar,
  login,
} = require('../controllers/users');

routesUsers.use(auth);

routesUsers.get('/', getUsers);
routesUsers.get('/me', getCurrentUser)
routesUsers.get('/:userId', getSpecialUser);
routesUsers.patch('/me', updateProfile);
routesUsers.patch('/me/avatar', updateAvatar);

module.exports = routesUsers;

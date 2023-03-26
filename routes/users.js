const routesUsers = require('express').Router();
const auth = require('../middlewares/auth')
const {
  getUsers,
  getCurrentUser,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
  login,
} = require('../controllers/users');

routesUsers.post('/signin', login);
routesUsers.post('/signup', createUser);

routesUsers.use(auth);

routesUsers.get('/', getUsers);
routesUsers.get('/me', getUser)
routesUsers.get('/:userId', getCurrentUser);
routesUsers.patch('/me', updateProfile);
routesUsers.patch('/me/avatar', updateAvatar);

module.exports = routesUsers;

const User = require('../models/user');
const {
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  STATUS_INTERNAL_SERVER_ERROR,
} = require('../utils/constants');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' }));
};
module.exports.getCurrentUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user === null) {
        res
          .status(STATUS_NOT_FOUND)
          .send({ message: 'Запрашиваемый ресурс не найден' });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(STATUS_BAD_REQUEST).send({
          message: `Не удалось найти пользователя с id - ${req.params.userId}`,
        });
      } else {
        res.status(STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(STATUS_BAD_REQUEST).send({
          message:
            'Переданы некорректные данные в методы создания пользователя',
        });
      } else {
        res.status(STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};
module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(STATUS_BAD_REQUEST).send({
          message: 'Переданы некорректные данные в методы обновления профиля',
        });
      } else {
        res.status(STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};
module.exports.updateAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    userId,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(STATUS_BAD_REQUEST).send({
          message: 'Переданы некорректные данные в методы обновления аватара',
        });
      } else {
        res.status(STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

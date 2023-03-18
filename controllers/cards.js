const Card = require('../models/card');
const {
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  STATUS_INTERNAL_SERVER_ERROR,
} = require('../utils/constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => {
      res.status(STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Card.create({ name, link, owner: ownerId })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(STATUS_BAD_REQUEST).send({
          message: 'Переданы некорректные данные в методы создания карточки',
        });
      } else {
        res.status(STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (card === null) {
        res
          .status(STATUS_NOT_FOUND)
          .send({ message: 'Запрашиваемый ресурс не найден' });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(STATUS_BAD_REQUEST).send({
          message: `Не удалось удалить карточку с id - ${req.params.cardId}`,
        });
      } else {
        res.status(STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        res
          .status(STATUS_NOT_FOUND)
          .send({ message: 'Запрашиваемый ресурс не найден' });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(STATUS_BAD_REQUEST).send({
          message: ' Переданы некорректные данные для постановки лайка. ',
        });
      } else {
        res.status(STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        res
          .status(STATUS_NOT_FOUND)
          .send({ message: 'Запрашиваемый ресурс не найден' });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(STATUS_BAD_REQUEST).send({
          message: ' Переданы некорректные данные для снятия лайка. ',
        });
      } else {
        res.status(STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

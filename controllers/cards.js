const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};
module.exports.createCard = (req, res) => {
  console.log(req.user._id);
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Card.create({ name, link, owner: ownerId })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({
          message: "Переданы некорректные данные в методы создания карточки",
        });
      }
    });
};
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (card === null) {
        res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({
          message: `Не удалось удалить карточку с id - ${req.params.cardId}`,
        });
      }
    });
};
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (card === null) {
        res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({
          message: " Переданы некорректные данные для постановки лайка. ",
        });
      }
    });
};
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (card === null) {
        res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({
          message: " Переданы некорректные данные для снятия лайка. ",
        });
      }
    });
};

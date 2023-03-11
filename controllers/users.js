const User = require("../models/user.js");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};
module.exports.getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};
module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  const { user } = { name, about };
  User.findByIdAndUpdate(req.user._id, user)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, avatar)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};

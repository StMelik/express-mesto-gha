const User = require('../models/user');
const ERROR_CODE = require('../utils/constants');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(() => res.status(ERROR_CODE.DEFAULT).send({ message: 'Произошла ошибка' }));
};

const getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res
          .status(ERROR_CODE.NOT_FOUND)
          .send({ message: 'Пользователь по указанному id не найден' });
        return;
      }

      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERROR_CODE.NOT_FOUND)
          .send({ message: 'Пользователь по указанному id не найден' });
        return;
      }
      res.status(ERROR_CODE.DEFAULT).send({ message: 'Произошла ошибка' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(ERROR_CODE.INCORRECT_DATA)
          .send({ message: 'Переданы некорректные данные при создании пользователя.' });
        return;
      }
      res.status(ERROR_CODE.DEFAULT).send({ message: 'Произошла ошибка' });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;

  if (!name || !about) {
    res
      .status(ERROR_CODE.INCORRECT_DATA)
      .send({ message: 'Переданы некорректные данные при обновлении профиля' });
    return;
  }

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERROR_CODE.NOT_FOUND)
          .send({ message: 'Пользователь по указанному id не найден' });
        return;
      }
      res.status(ERROR_CODE.DEFAULT).send({ message: 'Произошла ошибка' });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  if (!avatar) {
    res
      .status(ERROR_CODE.INCORRECT_DATA)
      .send({ message: 'Переданы некорректные данные при обновлении аватара' });
    return;
  }

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERROR_CODE.NOT_FOUND)
          .send({ message: 'Пользователь по указанному id не найден' });
        return;
      }
      res.status(ERROR_CODE.DEFAULT).send({ message: 'Произошла ошибка' });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};

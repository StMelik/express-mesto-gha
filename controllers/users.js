const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  NotFoundError, BadRequestError, ServerError, ConflictError,
} = require('../utils/errors');

const getUsers = (_, res, next) => {
  User
    .find({})
    .then((users) => res.send({ users }))
    .catch(() => next(new ServerError('Произошла ошибка.')));
};

const getUser = (req, res, next) => {
  User
    .findById(req.user)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь по указанному id не найден.'));
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Пользователь по указанному id не найден.');
      }
      throw new ServerError('Произошла ошибка.');
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные при создании пользователя.');
      }

      if (err.code === 11000) {
        throw new ConflictError('Такой пользователь уже существует!');
      }

      throw new ServerError('Произошла ошибка');
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;

  if (!name || !about) {
    next(new NotFoundError('Переданы некорректные данные при обновлении профиля.'));
    return;
  }

  User
    .findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные при обновлении профиля.');
      }
      throw new ServerError('Произошла ошибка.');
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  if (!avatar) {
    next(new NotFoundError('Переданы некорректные данные при обновлении аватара.'));
    return;
  }

  User
    .findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные при обновлении аватара.');
      }
      throw new ServerError('Произошла ошибка.');
    })
    .catch(next);
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'secret-key',
        { expiresIn: '7d' },
      );

      res.send({ token });
    })
    .catch(err => {
      console.log(err);
    })
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
  login,
};

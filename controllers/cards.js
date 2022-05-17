const Card = require('../models/card');
const ERROR_CODE = require('../utils/constants');

const getCards = (req, res) => {
  Card
    .find({})
    .then((cards) => res.send({ cards }))
    .catch(() => {
      res.status(ERROR_CODE.SERVER).send({ message: 'Произошла ошибка' });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card
    .create({ name, link, owner: req.user._id })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(ERROR_CODE.INCORRECT_DATA)
          .send({ message: 'Переданы некорректные данные при создании карточки' });
        return;
      }
      res.status(ERROR_CODE.SERVER).send({ message: 'Произошла ошибка' });
    });
};

const deleteCard = (req, res) => {
  Card
    .findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        res
          .status(ERROR_CODE.NOT_FOUND)
          .send({ message: 'Карточка с указанным _id не найдена.' });
        return;
      }
      res.send({ card });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        res
          .status(ERROR_CODE.INCORRECT_DATA)
          .send({ message: 'Карточка с указанным _id не найдена.' });
        return;
      }
      res.status(ERROR_CODE.SERVER).send({ message: 'Произошла ошибка' });
    });
};

const addLike = (req, res) => {
  Card
    .findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        res
          .status(ERROR_CODE.NOT_FOUND)
          .send({ message: 'Передан несуществующий _id карточки.' });
        return;
      }
      res.send({ card });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        res
          .status(ERROR_CODE.INCORRECT_DATA)
          .send({ message: 'Переданы некорректные данные для постановки лайка.' });
        return;
      }
      res.status(ERROR_CODE.SERVER).send({ message: 'Произошла ошибка' });
    });
};

const deleteLike = (req, res) => {
  Card
    .findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        res
          .status(ERROR_CODE.NOT_FOUND)
          .send({ message: 'Передан несуществующий _id карточки.' });
        return;
      }

      res.send({ card });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        res
          .status(ERROR_CODE.INCORRECT_DATA)
          .send({ message: 'Переданы некорректные данные для снятии лайка.' });
        return;
      }
      res.status(ERROR_CODE.SERVER).send({ message: 'Произошла ошибка' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  deleteLike,
};

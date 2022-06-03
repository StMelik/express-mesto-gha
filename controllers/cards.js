const Card = require('../models/card');
const { NotFoundError, BadRequestError, ServerError, ConflictError, AuthError } = require('../utils/errors')

const getCards = (_, res, next) => {
  Card
    .find({})
    .then((cards) => res.send({ cards }))
    .catch(() => next(new ServerError('Произошла ошибка.')));
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card
    .create({ name, link, owner: req.user._id })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные при создании карточки.')
      }
      throw new ServerError('Произошла ошибка.')
    })
    .catch(next)
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params

  Card
    .findById(cardId)
    .then(card => {
      if (!card) {
        next(new NotFoundError('Карточка с указанным id не найдена.'))
        return;
      }

      if (JSON.stringify(card.owner) !== JSON.stringify(req.user._id)) {
        next(new AuthError('Невозможно удалить карточку.'))
        return
      }

      Card.findByIdAndDelete(cardId)
        .then(card => {
          res.send({ card });
        })
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        throw new BadRequestError('Передан некорректный id карточки.')
      }
      throw new ServerError('Произошла ошибка.')
    })
    .catch(next)
};

const addLike = (req, res, next) => {
  Card
    .findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Передан несуществующий id карточки.'))
        return;
      }
      res.send({ card });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        throw new BadRequestError('Переданы некорректные данные для постановки лайка.')
      }
      throw new ServerError('Произошла ошибка.')
    })
    .catch(next)
};

const deleteLike = (req, res, next) => {
  Card
    .findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Передан несуществующий id карточки.'))
        return;
      }

      res.send({ card });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        throw new BadRequestError('Переданы некорректные данные для снятии лайка.')
      }
      throw new ServerError('Произошла ошибка.')
    })
    .catch(next)
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  deleteLike,
};

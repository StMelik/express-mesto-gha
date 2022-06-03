const { celebrate, Joi } = require('celebrate')

const validationUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  })
})

const validationProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  })
})

const validationAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required()
  })
})

const validationCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required(),
  })
})

const validationCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24)
  })
})

module.exports = {
  validationUser,
  validationProfile,
  validationAvatar,
  validationCard,
  validationCardId
}
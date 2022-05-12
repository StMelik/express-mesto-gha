const Card = require('../models/card')

const getCards = (req, res) => {
    Card.find({})
        .then(cards => res.send({cards}))
        .catch((err) => {
            console.log(err)
            res.status(500).send({message: "Произошла ошибка"})
        })
}

const createCard = (req, res) => {
    const {name, link} = req.body

    Card.create({name, link, owner: req.user._id})
        .then(card => res.send({card}))
        .catch((err) => {
            console.log(err)
            res.status(500).send({message: "Произошла ошибка"})
        })
}

const deleteCard = (req, res) => {
    Card.findByIdAndDelete(req.params.cardId)
        .then(card => res.send({card}))
        .catch(() => res.status(500).send({message: "Произошла ошибка"}))
}

module.exports = {
    getCards,
    createCard,
    deleteCard
}
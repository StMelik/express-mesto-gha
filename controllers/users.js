const User = require("../models/user");

const getUsers = (req, res) => {
    User.find({})
        .then(users => res.send({users}))
        .catch(() => res.status(500).send({message: "Произошла ошибка"}))
}

const getUser = (req, res) => {
    User.findOne({_id: req.params.id})
        .then(user => res.send({user}))
}

const createUser = (req, res) => {
    const {name, about, avatar} = req.body

    User.create({name, about, avatar})
        .then(user => res.send({user}))
}

module.exports = {
    getUsers,
    getUser,
    createUser
}
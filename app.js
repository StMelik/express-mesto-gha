const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const {PORT = 3030} = process.env

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/mestodb")

app.use('/users', require('./routers/users'))

app.listen(PORT, () => {
    console.log(`Сервер работает на ${PORT} порту`)
})
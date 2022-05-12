const express = require('express');
const mongoose = require('mongoose')

const {PORT = 3030} = process.env

const app = express()

mongoose.connect("mongodb://localhost:27017/mestodb")

app.listen(PORT, () => {
    console.log(`Сервер работает на ${PORT} порту`)
})
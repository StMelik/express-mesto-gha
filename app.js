const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ERROR_CODE = require('./utils/constants');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
  req.user = { _id: '6283cc7112a8fe53f43b92bf' };
  next();
});

app.use('/users', require('./routers/users'));
app.use('/cards', require('./routers/cards'));

app.use('/', (req, res) => {
  res
    .status(ERROR_CODE.NOT_FOUND)
    .send({ message: 'Ресурс не найден. Проверьте URL и метод запроса' });
});

app.listen(PORT, () => {
  console.log(`Сервер работает на ${PORT} порту`);
});

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const ERROR_CODE = require('./utils/constants');
const { validationUser } = require('./utils/validation');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.post('/signin', validationUser, login);
app.post('/signup', validationUser, createUser);

app.use('/users', auth, require('./routers/users'));
app.use('/cards', auth, require('./routers/cards'));

app.use('/', (req, res) => {
  res
    .status(ERROR_CODE.NOT_FOUND)
    .send({ message: 'Ресурс не найден. Проверьте URL и метод запроса' });
});

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res
    .status(err.statusCode)
    .send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Сервер работает на ${PORT} порту`); // eslint-disable-line no-console
});

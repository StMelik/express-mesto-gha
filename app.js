const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { validationUser } = require('./utils/validation');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const error = require('./middlewares/error');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(helmet());

app.post('/signin', validationUser, login);
app.post('/signup', validationUser, createUser);

app.use('/users', auth, require('./routers/users'));
app.use('/cards', auth, require('./routers/cards'));

app.use('/', auth, require('./routers/404'));

app.use(errors());
app.use(error);

app.listen(PORT, () => {
  console.log(`Сервер работает на ${PORT} порту`); // eslint-disable-line no-console
});

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ERROR_CODE = require('./utils/constants');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/users', require('./routers/users'));
app.use('/cards', auth, require('./routers/cards'));

app.use('/', (req, res) => {
  res
    .status(ERROR_CODE.NOT_FOUND)
    .send({ message: 'Ресурс не найден. Проверьте URL и метод запроса' });
});

app.use((err, _, res, __) => {
  res
    .status(err.statusCode)
    .send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Сервер работает на ${PORT} порту`);
});

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3030 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
  req.user = { _id: '627d39d969b36fd3667e90bf' };
  next();
});

app.use('/users', require('./routers/users'));
app.use('/cards', require('./routers/cards'));

app.listen(PORT, () => {
  console.log(`Сервер работает на ${PORT} порту`);
});

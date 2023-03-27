const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routesUsers = require('./routes/users');
const routesCards = require('./routes/cards');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users')
const { STATUS_NOT_FOUND } = require('./utils/constants');

const { PORT = 3000 } = process.env;
const DATABASE_URL = 'mongodb://127.0.0.1:27017/mestodb';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/signup', createUser);
app.post('/signin', login);
app.use(auth);
app.use('/users', routesUsers);
app.use('/cards', routesCards);

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log(`Connected to database on ${DATABASE_URL}`);
  })
  .catch((err) => {
    console.log('Error on database connection');
    console.error(err);
  });

app.use((req, res) => {
  res.status(STATUS_NOT_FOUND).send({ message: 'Запрашиваемый ресурс не найден' });
});
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

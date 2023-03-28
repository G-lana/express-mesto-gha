const express = require('express');

const app = express();
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routesUsers = require('./routes/users');
const routesCards = require('./routes/cards');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users')
const { STATUS_INTERNAL_SERVER_ERROR, STATUS_NOT_FOUND  } = require('./utils/constants');
const { validateLogin, validateCreateUser } = require('./middlewares/validation')

const { PORT = 3000 } = process.env;
const DATABASE_URL = 'mongodb://127.0.0.1:27017/mestodb';


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log(`Connected to database on ${DATABASE_URL}`);
  })
  .catch((err) => {
    console.log('Error on database connection');
    console.error(err);
  });

app.post('/signup', validateCreateUser, createUser);
app.post('/signin', validateLogin, login);

app.use(auth);

app.use('/users', routesUsers);
app.use('/cards', routesCards);

app.use((req, res) => {
  res.status(STATUS_NOT_FOUND).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.use(errors());

app.use((err, req, res, next) => {
  const { status = STATUS_INTERNAL_SERVER_ERROR, message = 'На сервере произошла ошибка' } = err;

  res.status(status).send({ message });

  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

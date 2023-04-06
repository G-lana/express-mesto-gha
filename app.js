require('dotenv').config();
const express = require('express');

const app = express();
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routesUsers = require('./routes/users');
const routesCards = require('./routes/cards');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const { STATUS_INTERNAL_SERVER_ERROR, STATUS_NOT_FOUND } = require('./utils/constants');
const { validateLogin, validateCreateUser } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const options = {
  origin: [
    'http://localhost:3000',
    'https://g.lana.students.nomoredomains.monster',
    'http://g.lana.students.nomoredomains.monster',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: [
    'ContentType',
    'origin',
    'Autorization',
  ],
  credentials: true,
};

app.use('*', cors(options));

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

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(requestLogger);

app.post('/signup', validateCreateUser, createUser);
app.post('/signin', validateLogin, login);

app.use(auth);

app.use('/users', routesUsers);
app.use('/cards', routesCards);

app.use((req, res) => {
  res.status(STATUS_NOT_FOUND).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { status = STATUS_INTERNAL_SERVER_ERROR, message = 'На сервере произошла ошибка' } = err;

  res.status(status).send({ message });

  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

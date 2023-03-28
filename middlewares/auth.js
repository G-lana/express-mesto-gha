const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { cookie } = req.headers;
  if (!cookie || !cookie.startsWith('token=')) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  const token = cookie.replace('token=', '');
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
    console.log(payload);
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};

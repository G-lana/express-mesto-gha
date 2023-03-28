const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const token = req.headers.cookie.replace('token=', '');
  if (token == null) {
    return next(new UnauthorizedError('Необходима авторизация'));
  } let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
    console.log(payload);
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};

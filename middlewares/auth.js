const jwt = require('jsonwebtoken');
const AuthError = require('../utils/errors/Auth');

module.exports = (req, _, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthError('Необходима авторизация'));
    return;
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    next(new AuthError('Необходима авторизация'));
    return;
  }

  req.user = payload;

  next();
};

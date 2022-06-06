const NotFoundError = require('../utils/errors/NotFound');

module.exports = (req, res, next) => {
  next(new NotFoundError('Ресурс не найден. Проверьте URL и метод запроса'));
};

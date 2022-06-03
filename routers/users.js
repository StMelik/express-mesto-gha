const router = require('express').Router();
const {
  getUsers, getUser, createUser, updateUser, updateAvatar, login,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validationUser, validationProfile, validationAvatar } = require('../utils/validation');

router.post('/signin', validationUser, login);

router.post('/signup', validationUser, createUser);

router.get('/', auth, getUsers);

router.get('/me', auth, getUser);

router.patch('/me', auth, validationProfile, updateUser);

router.patch('/me/avatar', auth, validationAvatar, updateAvatar);

module.exports = router;

const router = require('express').Router();
const {
  getUsers, getUser, createUser, updateUser, updateAvatar, login
} = require('../controllers/users');
const auth = require('../middlewares/auth')

router.post('/signin', login);

router.post('/signup', createUser);

router.get('/', auth, getUsers);

router.get('/me', auth, getUser);

router.patch('/me', auth, updateUser);

router.patch('/me/avatar', auth, updateAvatar);

module.exports = router;

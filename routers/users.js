const router = require('express').Router();
const {
  getUsers, getUser, getMe, updateUser, updateAvatar,
} = require('../controllers/users');
const { validationProfile, validationUserId, validationAvatar } = require('../utils/validation');

router.get('/', getUsers);
router.get('/me', getMe);

router.get('/:userId', validationUserId, getUser);

router.patch('/me', validationProfile, updateUser);
router.patch('/me/avatar', validationAvatar, updateAvatar);

module.exports = router;

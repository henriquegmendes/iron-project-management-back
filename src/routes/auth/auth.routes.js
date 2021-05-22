const express = require('express');

const authMiddleware = require('../../middlewares/validation/auth.middlewares');
const authController = require('../../controller/auth.controller');

const router = express();

router.post('/signup', authMiddleware.signup, authController.signup);
router.post('/login', authMiddleware.login, authController.login);

module.exports = router;
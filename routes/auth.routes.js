const router = require('express').Router();
const auth = require('../controller/auth.controller');

router.post('/login', auth.login);
router.post('/register', auth.register);
router.post('/forgot-password', auth.forgotPassword);
router.post('/reset-password', auth.resetPassword);
module.exports = router;
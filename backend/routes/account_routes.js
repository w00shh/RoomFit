const express = require('express');
const router = express.Router();
const account_controller = require('../controllers/account_controller');

router.post('/register', account_controller.email_register);
router.put('/update', account_controller.account_update);
router.put('/login', account_controller.account_login);
router.get('/google-auth', account_controller.google_auth);
router.get('/google-auth/redirect', account_controller.google_auth_redirect);
router.post('/email-verification', account_controller.email_verification);

module.exports = router;

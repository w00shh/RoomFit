const express = require('express');
const router = express.Router();
const account_controller = require('../controllers/account_controller');

router.post('/register', account_controller.email_register);
router.put('/update', account_controller.account_update);
router.put('/login', account_controller.account_login);
router.get('/google-auth', account_controller.google_auth);
router.get('/google-auth/redirect', account_controller.google_auth_redirect);
router.get('/find-id', account_controller.find_id);
router.get('/find-password',account_controller.find_password)

module.exports = router;

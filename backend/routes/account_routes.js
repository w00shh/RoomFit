const express = require('express');
const router = express.Router();
const account_controller = require('../controllers/account_controller');

router.post('/register', account_controller.email_register);
router.put('/update', account_controller.account_update);
router.put('/login', account_controller.account_login);

module.exports = router;

const express = require('express');
const router = express.Router();
const set_controller = require('../controllers/set_controller');

router.post('/', set_controller.create_set);
router.get('/:workout_id', set_controller.workout_set);

module.exports = router;

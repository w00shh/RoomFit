const express = require('express');
const router = express.Router();
const workout_controller = require('../controllers/workout_controller');

router.get('/', workout_controller.get_workouts);
router.get('/recent', workout_controller.recent_workouts);
router.post('/', workout_controller.create_workout);
router.put('/done', workout_controller.update_workout);

module.exports = router;

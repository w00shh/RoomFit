const express = require('express');
const router = express.Router();
const workout_controller = require('../controllers/workout_controller');

router.get('/get/:workout_id', workout_controller.get_workout);
router.get('/detail/:workout_id', workout_controller.workout_detail);
router.get('/recent', workout_controller.recent_workouts);
router.post('/', workout_controller.create_workout);
router.put('/done', workout_controller.update_workout);
router.get('/calander/:date', workout_controller.get_specific_date_workouts);

module.exports = router;

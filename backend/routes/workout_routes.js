const express = require('express');
const router = express.Router();

const workout_controller = require('../controllers/workout_controller');
const record_controller = require('../controllers/record_controller');
const set_controller = require('../controllers/set_controller');

//운동 시작
router.post('/', workout_controller.create_workout);
//운동 중
router.post('/record', record_controller.create_record);
router.post('/', set_controller.create_set);
//운동 종료
router.put('/done', workout_controller.update_workout);

//기록
router.get('/get/:workout_id', workout_controller.get_workout);
router.post('/recent', workout_controller.recent_workouts);
router.get('/calander/:date', workout_controller.get_specific_date_workouts);
router.get('/detail/:workout_id', workout_controller.workout_detail);

//기록 삭제
router.delete('/delete/:workout_id', workout_controller.delete_workout);
router.delete('/delete/record/:record_id', record_controller.delete_record);

//통계
router.post('/stat/:period', workout_controller.get_stat);

module.exports = router;

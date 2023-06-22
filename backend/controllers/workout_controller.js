const Workout = require('../models/workout_model');

const create_workout = (req, res) => {
  if (!req.body)
    res.status(400).send({
      message: 'Content can not be empty!',
    });

  const workout = new Workout({
    user_id: req.body.user_id,
    end_time: '',
    tut: '',
    title: '새로운 운동기록',
    content: '',
  });

  Workout.create(workout, (err, id) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while creating Workout.',
      });
    else {
      res.json({workout_id: id});
    }
  });
};

const update_workout = (req, res) => {
  if (!req.body.workout_id)
    res.status(400).send({message: 'ID can not be empty'});

  const new_workout = {
    workout_id: req.body.workout_id,
    end_time: new Date().toLocaleString(),
    tut: req.body.tut,
    title: req.body.title,
    content: req.body.content,
  };

  Workout.update(new_workout, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occured while updating Workout.',
      });
    else res.send(data);
  });
};

const recent_workouts = (req, res) => {
  Workout.recent((err, result) => {
    if (err) console.error(err);
    else res.json(result);
  });
};

const get_workout = (req, res) => {
  if (!req.params.workout_id)
    res.status(400).send({message: 'Workout ID can not be empty'});

  Workout.get(req.params.workout_id, (err, result) => {
    if (err) console.error(err);
    else res.json(result);
  });
};

const workout_detail = (req, res) => {
  if (!req.params.workout_id)
    res.status(400).send({message: 'Workout ID can not be empty'});

  Workout.detail(req.params.workout_id, (err, result) => {
    if (err) console.error(err);
    else res.json(result);
  });
};

const get_specific_date_workouts = (req, res) => {
  const targetDate = req.params.date;

  Workout.calander(targetDate, result => {
    res.json(result);
  });
};

const delete_workout = (req, res) => {
  if (!req.params.workout_id)
    res.status(400).send({message: 'Workout ID can not be empty'});

  Workout.delete(req.params.workout_id, (err, result) => {
    if (err) console.error();
    else res.send(result);
  });
};

module.exports = {
  create_workout,
  update_workout,
  get_workout,
  recent_workouts,
  workout_detail,
  get_specific_date_workouts,
  delete_workout,
};

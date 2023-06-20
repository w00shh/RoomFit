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
  Workout.recent(result => {
    res.json(result);
  });
};

const get_workouts = (req, res) => {
  Workout.all(result => {
    res.json(result);
  });
};

module.exports = {
  create_workout,
  get_workouts,
  recent_workouts,
  update_workout,
};

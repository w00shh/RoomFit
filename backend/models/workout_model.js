const db = require('../db/connect');

const Workout = function (workout) {
  this.user_id = workout.user_id;
  this.end_time = workout.end_time;
  this.tut = workout.tut;
  this.title = workout.title;
  this.content = workout.content;
};
//Create New Workout
Workout.create = (new_workout, callback) => {
  const {user_id, end_time, tut, title, content} = new_workout;
  db.run(
    `INSERT INTO workout (user_id, end_time, tut, title, content) VALUES (?,?,?,?,?)`,
    [user_id, end_time, tut, title, content],
    function (err) {
      if (err) console.error(err);
      callback(null, this.lastID);
    },
  );
};
//Update Workouts
Workout.update = (new_workout, callback) => {
  db.run(
    `UPDATE workout SET end_time = datetime('now', 'localtime'), tut = ?, title = ?, content = ? WHERE workout_id = ?`,
    [
      new_workout.tut,
      new_workout.title,
      new_workout.content,
      new_workout.workout_id,
    ],
    (err, res) => {
      if (err) console.error(err);
      callback(null, res);
    },
  );
};
//Get Past 10 Days Workout
Workout.recent = callback => {
  db.all(
    `SELECT * FROM workout WHERE julianday(date('now', 'localtime')) - julianday(date(start_time)) <= 10`,
    [],
    (err, rows) => {
      if (err) console.error(err);
      callback(rows);
    },
  );
};
//Get All Workouts
Workout.all = callback => {
  db.all('SELECT * FROM workout', [], (err, rows) => {
    if (err) console.error(err);
    callback(rows);
  });
};

module.exports = Workout;

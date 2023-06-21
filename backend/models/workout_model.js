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
      else callback(null, rows);
    },
  );
};

//Get Workout
Workout.get = (workout_id, callback) => {
  db.all(
    'SELECT * FROM workout WHERE workout_id = ?',
    [workout_id],
    (err, rows) => {
      if (err) console.error(err);
      else callback(null, rows);
    },
  );
};
//Get all records & sets in workout
Workout.detail = (workout_id, callback) => {
  db.all(
    `SELECT record.*, (
      SELECT json_group_array(json_object('set_no', set_info.set_no, 'weight', set_info.weight, 'rep', set_info.rep, 'mode', set_info.mode))
      FROM set_info
      WHERE set_info.record_id = record.record_id
    ) AS sets
    FROM record
    WHERE workout_id = ?`,
    [workout_id],
    (err, rows) => {
      if (err) console.error(err);
      else if (rows.length > 0) {
        for (var i = 0; i < rows.length; i++) {
          rows[i].sets = JSON.parse(rows[i].sets);
        }
        callback(null, rows);
      } else callback(null, []);
    },
  );
};

//Get Workout of speicific date
Workout.calander = (date, callback) => {
  const startDate = `${date} 00:00:00`;
  const endDate = `${date} 23:59:59`;

  db.all(
    `SELECT * FROM workout WHERE start_time >= ? AND start_time < ?;`,
    [startDate, endDate],
    (err, rows) => {
      if (err) console.error(err);
      callback(rows);
    },
  );
};

module.exports = Workout;

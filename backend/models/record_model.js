const db = require('../db/connect');

const Record = function (record) {
  this.workout_id = record.workout_id;
  this.motion_id = record.motion_id;
};
//Create New Record
Record.create = (new_record, callback) => {
  db.run(
    `INSERT INTO record (workout_id, motion_id) VALUES (?,?)`,
    [new_record.workout_id, new_record.motion_id],
    function (err) {
      if (err) console.error(err);
      callback(null, this.lastID);
    },
  );
};
//Get Records with same workout_id
Record.group_by_workout = (workout_id, callback) => {
  db.all(
    `SELECT * FROM record WHERE workout_id = ?`,
    [workout_id],
    (err, rows) => {
      if (err) console.error(err);
      callback(null, rows);
    },
  );
};

module.exports = Record;

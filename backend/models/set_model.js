const db = require('../db/connect');

const Set = function (set) {
  this.record_id = set.record_id;
  this.set_no = set.set_no;
  this.weight = set.weight;
  this.rep = set.rep;
  this.mode = set.mode;
};

//Create New Set - 세트 종료
Set.create = (set, callback) => {
  db.run(
    `INSERT INTO set_info (record_id, set_no, weight, rep, mode) VALUES (?,?,?,?,?)`,
    [set.record_id, set.set_no, set.weight, set.rep, set.mode],
    (err, res) => {
      if (err) console.error(err);
      callback(null, res);
    },
  );
};

module.exports = Set;

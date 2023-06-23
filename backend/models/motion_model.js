const db = require('../db/connect');

const Motion = function (motion) {
  this.motion_id = motion.motion_id;
  this.motion_name = motion.motion_name;
  this.major_target = motion.major_target;
  this.minor_target = motion.minor_target;
  this.equipment = motion.equipment;
  this.imageURL = motion.imageURL;
  this.description = motion.description;
  this.count = motion.count;
};

Motion.load = function (callback) {
  db.all('SELECT * FROM favorite', (err, rows) => {
    if (err) {
      console.error(err);
    } else {
      const favoriteMotionIds = rows.map(row => row.motion_id);
      const placeholders = favoriteMotionIds.map(() => '?').join(',');
      const motionList = [];
      const sqlFav = `SELECT * FROM motion WHERE motion_id IN (${placeholders}) ORDER BY count desc`;
      db.all(sqlFav, favoriteMotionIds, (err, favRows) => {
        if (err) {
          console.error(err);
        } else {
          favRows.forEach(row => {
            motionList.push({...row});
          });
        }
      });
      const sqlNotFav = `SELECT * FROM motion WHERE motion_id NOT IN (${placeholders}) ORDER BY count desc`;
      db.all(sqlNotFav, favoriteMotionIds, (err, notFavRows) => {
        if (err) {
          console.error(err);
        } else {
          notFavRows.forEach(row => {
            motionList.push({...row});
          });
          callback(null, motionList);
        }
      });
    }
  });
};

Motion.add_fav = function (user_id, motion_id, callback) {
  const sql = 'INSERT INTO favorite (user_id, motion_id) values (?,?)';
  db.run(sql, [user_id, motion_id], function (err, result) {
    if (err) console.error(err.message);
    else callback(null, result);
  });
};

Motion.del_fav = function (user_id, motion_id, callback) {
  const sql = 'DELETE FROM favorite where motion_id =? AND user_id=?';
  db.run(sql, [motion_id, user_id], function (err) {
    if (err) console.error(err.message);
    else callback(null, result);
  });
};

Motion.add_motion = function (motion_ids, callback) {
  const placeholders = Array(motion_ids.length).fill('?').join(',');
  const sql = `SELECT motion_id, motion_name, imageUrl FROM motion WHERE motion_id IN (${placeholders})`;
  db.all(sql, motion_ids, (err, rows) => {
    if (err) console.error(err);
    else callback(null, rows);
  });
};

module.exports = Motion;
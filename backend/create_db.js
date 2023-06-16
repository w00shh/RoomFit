const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
  "./db/roomfit.sqlite",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) console.error(err);
    else console.log("Connected to RoomFit Database");
  }
);

//create table queries
const userTableQuery = `
  CREATE TABLE IF NOT EXISTS user (
    user_id TEXT PRIMARY KEY,
    user_name VARCHAR(30),
    email VARCHAR(30),
    password VARCHAR(30),
    birthday TEXT,
    gender int
  )
`;
const motionTableQuery = `
    CREATE TABLE IF NOT EXISTS motion (
        motion_id INTEGER PRIMARY KEY,
        motion_name VARCHAR(60),
        major_target VARCHAR(30),
        minor_target VARCHAR(30),
        equipment VARCHAR(30),
        imageUrl VARCHAR(150),
        description TEXT,
        count INTEGER
    )
`;

const workoutTableQuery = `
  CREATE TABLE IF NOT EXISTS workout (
    workout_id INTEGER PRIMARY KEY,
    user_id TEXT,
    start_time TEXT,
    end_time TEXT,
    tut TEXT,
    title TEXT,
    content TEXT,

    FOREIGN KEY(user_id) REFERENCES user(user_id)
  )
`;
const recordTableQuery = `
    CREATE TABLE IF NOT EXISTS record (
        record_id INTEGER PRIMARY KEY,
        workout_id INTEGER,
        motion_id INTEGER,
        time TEXT,

        FOREIGN KEY(workout_id) REFERENCES workout(workout_id)
        FOREIGN KEY(motion_id) REFERENCES motion(motion_id)
    )
`;

const routineTableQuery = `
    CREATE TABLE IF NOT EXISTS routine (
        rountine_id INTEGER PRIMARY KEY,
        user_id TEXT,
        routine_name VARCHAR(30),

        FOREIGN KEY(user_id) REFERENCES user(user_id)
    )
`;
const routineMotionTableQuery = `
    CREATE TABLE IF NOT EXISTS routine_motion (
        routine_motion_id INTEGER PRIMARY KEY,
        routine_id INTEGER,
        motion_id INTEGER,
        order INTEGER,

        FOREIGN KEY(routine_id) REFERENCES routine(routine_id)
        FOREIGN KEY(motion_id) REFERENCES motion(motion_id)
    )
`;
const setTableQuery = `
    CREATE TABLE IF NOT EXISTS set (
        set_id INTEGER PRIMARY KEY,
        inherited_id INTEGER,
        source_table INTEGER,
        set_no INTEGER,
        weight INTEGER,
        rep INTEGER,
        mode INTEGER,

        FOREIGN KEY(inherited_id)
        REFERENCES routine_motion(routine_motion_id)
        OR REFERENCES record(record_id)
    )
`;

const favoriteTableQuery = `
    CREATE TABLE IF NOT EXISTS favorite (
        user_id TEXT,
        motion_id INTEGER,

        FOREIGN KEY(user_id) REFERENCES user(user_id)
        FOREIGN KEY(motion_id) REFERENCES motion(motion_id)
    )
`;

db.serialize(() => {
  db.each(userTableQuery);
  db.each(motionTableQuery);
  db.each(workoutTableQuery);
  db.each(recordTableQuery);
  db.each(routineTableQuery);
  db.each(routineMotionTableQuery);
  db.each(setTableQuery);
  db.each(favoriteTableQuery);
});

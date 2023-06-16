CREATE TABLE IF NOT EXISTS User(
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT,
    birth DATE,
    gender TEXT,
    is_api INT NOT NULL
);

CREATE TABLE IF NOT EXISTS Routine(
    id INT PRIMARY KEY NOT NULL,
    user_id TEXT NOT NULL,
    routine_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Routine_Exercise(
    routine_exercise_id INT PRIMARY KEY NOT NULL,
    routine_id INT NOT NULL,
    exercise_id INT NOT NULL,
    order INT NOT NULL
);

CREATE TABLE IF NOT EXISTS Set_Info(
    set_id INT PRIMARY KEY NOT NULL,
    routine_exercise_id INT NOT NULL,
    set_no INT NOT NULL,
    set_weight INT NOT NULL,
    rep INT NOT NULL
);

CREATE TABLE IF NOT EXISTS Motion(
    motion_id INT PRIMARY KEY NOT NULL,
    motion_name TEXT NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Workout(
    workout_id INT PRIMARY KEY NOT NULL,
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Record(
    record_id INT PRIMARY KEY NOT NULL,
    workout_id INT NOT NULL,
    motion_id INT NOT NULL,
    time TIME NOT NULL,
);

CREATE TABLE IF NOT EXISTS Packet(
    packet_id INT PRIMARY KEY NOT NULL,
    record_id INT NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    left INT NOT NULL,
    right INT NOT NULL
);

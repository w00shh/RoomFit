const express = require('express');
const app = express();
app.use(express.json());
const Hangul = require('hangul-js');

//import routers
const workout = require('./routes/workout_routes');
const routine = require('./routes/routine_routes');
const motion = require('./routes/motion_routes');

//router settings
app.use('/workout', workout);
app.use('/routine', routine);
app.use('/motion', motion);

const port = 4000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

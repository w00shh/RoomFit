const express = require('express');
const app = express();
app.use(express.json());

//import routers
const workout = require('./routes/workout_routes');
const record = require('./routes/record_routes');
const set = require('./routes/set_routes');

//router settings
app.use('/workout', workout);
app.use('/record', record);
app.use('/set', set);

const port = 4000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

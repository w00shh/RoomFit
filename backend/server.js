const express = require('express');
const app = express();
app.use(express.json());
const Hangul = require('hangul-js');

//import routers
const workout = require('./routes/workout_routes');
const record = require('./routes/record_routes');
const account = require('./routes/account_routes');
const set = require('./routes/set_routes');

//router settings
app.use('/workout', workout);
app.use('/record', record);
app.use('/set', set);
app.use('/account', account);

const port = 4000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

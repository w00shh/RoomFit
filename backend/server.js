const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());


app.use(cors());
//import routers
const workout = require('./routes/workout_routes');
const record = require('./routes/record_routes');
const account = require('./routes/account_routes');
const set = require('./routes/set_routes');
const motion = require('./routes/motion_routes');
const routine = require('./routes/routine_routes');

//router settings
app.use('/workout', workout);
app.use('/record', record);
app.use('/set', set);
app.use('/account', account);
app.use('/motion', motion);
app.use('/routine', routine);

const port = 4000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

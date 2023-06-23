const express = require('express');
const app = express();
app.use(express.json());

//import routers
const workout = require('./routes/workout_routes');

//router settings
app.use('/workout', workout);

const port = 4000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const axios = require('axios');

axios
  .post('http://localhost:4000/record', {
    workout_id: 1,
    motion_id: 3,
  })
  .then(res => console.log(res))
  .catch(err => console.error(err));

const axios = require('axios');

//새로운 운동 기록 생성 테스트
axios
  .post('http://localhost:4000/workout', {user_id: 'sunoo'})
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err);
  });

//운동 종료 테스트
setTimeout(() => {
  axios
    .put('http://localhost:4000/workout/done', {
      workout_id: 5,
      tut: '00:45:00',
      title: '3일차 운동',
      content: '좌우 파워 밸런스가 잘 안맞는다.',
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.error(err);
    });
  console.log('운동 종료');
}, 7000);

axios
  .delete('http://localhost:4000/workout/delete/2')
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err);
  });

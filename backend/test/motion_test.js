// 모션 불러오기 테스트

fetch('http://127.0.0.1:4000/motion',{
    method: "POST",
    headers:{
        'Content-type' : 'application/json'
    },
    body: JSON.stringify({
        user_id: 1
    })
}).then(res=>res.json()).then(res=>{
    console.log(res);
});

// 모션 추가하기 테스트
fetch('http://127.0.0.1:4000/motion/add',{
    method: "POST",
    headers:{
    'Content-type' : 'application/json'
    },
    body: JSON.stringify({
        motion_ids: [2,3,4]
    })
}).then(res=>res.json()).then(res=>{
    console.log(res);
});

// 즐겨찾기 추가
fetch('http://127.0.0.1:4000/motion/favInsert/1',{
    method: "POST",
    headers:{
        'Content-type' : 'application/json'
    },
    body: JSON.stringify({
        user_id: 1
    })
});

// 즐겨찾기 삭제
fetch('http://127.0.0.1:4000/motion/favDelete/1',{
    method: "DELETE",
});

// 동작 검색
fetch('http://127.0.0.1:4000/motion/search',{
    method: "POST",
    headers:{
        'Content-type' : 'application/json'
    },
    body: JSON.stringify({
        user_id: 1,
        motion_name: "벤칲"
    })
});
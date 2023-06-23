import React, { useEffect, useState } from 'react';
//import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

const Home = ({navigation}) => {
  const [routineID, setRoutineID] = useState({});
  useEffect(()=>{
    fetch('http://127.0.0.1:4000/routine/home',{
      method:"GET"
    }).then(res=>res.json()).then(res=>{
      console.log(res);
    });
  },[]);
  const createRoutine = () => {
    fetch('http://127.0.0.1:4000/routine/create',{
      method : "GET"
    }).then(res=>res.json()).then(res=>{
      console.log(res);
      setRoutineID(res);
    });
  }
  const lookAllRoutine = () => {
    fetch('http://127.0.0.1:4000/routine/load',{
      method:"GET"
    }).then(res=>res.json()).then(res=>{
      console.log(res);
    });
  }

  const modifyRoutine = () => {
    const params = new URLSearchParams();
    params.append('routine_id',1);
    fetch(`http://127.0.0.1:4000/routine/modify/${params}`,{
      method:"GET"
    }).then(res=>res.json()).then(res=>{
      console.log(res);
      //console.log(res.routine_name);
      //console.log(res.motionList[0].sets);
    });
  }

  const deleteRoutine = () => {
    fetch('http://127.0.0.1:4000/routine/delete',{
      method: "PUT",
      headers:{
        'Content-type' : 'application/json'
      },
      body: JSON.stringify({
        routineIds: [5,6]
      })
    });
  }

  const nameChange=()=>{
    fetch('http://127.0.0.1:4000/routine/nameChange',{
      method: "PUT",
      headers:{
        'Content-type' : 'application/json'
      },
      body: JSON.stringify({
        routine_id: routineID.routine_id, //
        routine_name: "상체뽀개기"
      })
    }).then(res=>res.json()).then(res=>{
      console.log(res);
    });
  }

  const loadMotion=()=>{
    fetch('http://127.0.0.1:4000/routine/loadMotion',{
      method: "GET",
    }).then(res=>res.json()).then(res=>{
      console.log(res);
    });
  }

  const favMotionInsert=()=>{
    const params = new URLSearchParams();
    params.append('motion_id',1);
    fetch(`http://127.0.0.1:4000/motion/favInsert/${params}`,{
      method: "GET",
    });
  }
  const favMotionDelete=()=>{
    const params = new URLSearchParams();
    params.append('motion_id',1);
    fetch(`http://127.0.0.1:4000/motion/favDelete/${params}`,{
      method: "DELETE",
    });
  }

  const motionSearch=()=>{
    const params = new URLSearchParams();
    params.append('motion_name',"ㄷㅂㅇㅅㅋ");
    fetch(`http://127.0.0.1:4000/motion/search/${params}`,{
      method: "GET",
    });
  }

  const addMotion = () => {
    fetch('http://127.0.0.1:4000/motion/add',{
      method: "PUT",
      headers:{
        'Content-type' : 'application/json'
      },
      body: JSON.stringify({
        motion_ids: [2,3,4]
      })
    }).then(res=>res.json()).then(res=>{
      console.log(res);
    });
  }

  const saveRoutine = () => {
    fetch('http://127.0.0.1:4000/routine/save',{
      method: "POST",
      headers:{
        'Content-type' : 'application/json'
      },
      body: JSON.stringify({
        routine_id: 5,
        motionList: [
          {
            motion_id: 1,
            sets: [{ weight: 30, rep: 20, mode: 1 }, { weight: 40, rep: 10, mode: 1 }]
          },
          {
            motion_id: 5,
            sets: [{ weight: 25, rep: 15, mode: 1 }, { weight: 60, rep: 10, mode: 1 }]
          },
          {
            motion_id: 5,
            sets: [{ weight: 15, rep: 15, mode: 1 }, { weight: 10, rep: 20, mode: 1 }, { weight: 70, rep: 5, mode: 1 }]
          }
        ]
      })
    })
  }

  return (
    <View>
      <View>
        <TouchableOpacity onPress={lookAllRoutine}>
          <Text>자세히 보기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={createRoutine}>
          <Text>루틴 생성</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={nameChange}>
          <Text>name change</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={loadMotion}>
          <Text>load motion</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={favMotionInsert}>
          <Text>fav insert</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={favMotionDelete}>
          <Text>fav delete</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={motionSearch}>
          <Text>motion search</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={modifyRoutine}>
          <Text>modifyRoutine</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={addMotion}>
          <Text>동작 추가</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress = {deleteRoutine}>
          <Text>루틴 삭제</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress = {saveRoutine}>
          <Text>루틴 저장</Text>
        </TouchableOpacity>
      </View>
    </View>
    
  );
};

export default Home;

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
    fetch('http://127.0.0.1:4000/routine/create',{
      method : "GET"
    }).then(res=>res.json()).then(res=>{
      console.log(res);
      setRoutineID(res);
    });

    fetch('http://127.0.0.1:4000/routine/home',{
      method:"GET"
    }).then(res=>res.json()).then(res=>{
      console.log(res);
    });
  },[]);

  const lookDetail = () => {
    fetch('http://127.0.0.1:4000/routine/load',{
      method:"GET"
    }).then(res=>res.json()).then(res=>{
      console.log(res);
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
    fetch(`http://127.0.0.1:4000/favMotion/insert/${params}`,{
      method: "GET",
    });
  }
  const favMotionDelete=()=>{
    const params = new URLSearchParams();
    params.append('motion_id',1);
    fetch(`http://127.0.0.1:4000/favMotion/delete/${params}`,{
      method: "DELETE",
    });
  }

  const motionSearch=()=>{
    const params = new URLSearchParams();
    params.append('motion_name',"벤 치 프레스");
    fetch(`http://127.0.0.1:4000/motion/search/${params}`,{
      method: "GET",
    });
  }
  return (
    <View>
      <Text>�ѱ۵Ƕ�</Text>
      <View>
        <TouchableOpacity onPress={nameChange}>
          <Text>name change</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={loadMotion}>
          <Text>loading</Text>
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
        <TouchableOpacity onPress={lookDetail}>
          <Text>자세히 보기</Text>
        </TouchableOpacity>
      </View>
    </View>
    
  );
};

export default Home;

import React, {useEffect, useState, useContext} from 'react';
import {SafeAreaView, View, Image, Dimensions} from 'react-native';
import Intros from '../../assets/svg/img/logo.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {serverAxios} from '../../utils/commonAxios';
import {AppContext} from '../../contexts/AppProvider';
const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const IntroSplash = ({navigation}) => {
  const appcontext = useContext(AppContext);
  const [autoLogin, setAutoLogin] = useState(false);
  useEffect(() => {
    checkLogined();
  }, []);

  const checkLogined = async () => {
    const userId = await AsyncStorage.getItem('isLogin');
    const assist = await AsyncStorage.getItem('SmartAssist');
    const saftey = await AsyncStorage.getItem('SmartSaftey');
    if (userId !== null) {
      appcontext.actions.setUserid(userId);
      setAutoLogin(true);
    } else {
      setTimeout(() => {
        navigation.navigate('Intro');
      }, 1500);
    }

    if (assist === 'false') {
      await AsyncStorage.setItem('SmartAssist', 'false');
      appcontext.actions.setSmartAssist(false);
    } else {
      await AsyncStorage.setItem('SmartAssist', 'true');
      appcontext.actions.setSmartAssist(true);
    }
    if (saftey === 'false') {
      await AsyncStorage.setItem('SmartSaftey', 'false');
      appcontext.actions.setSmartSaftey(false);
    } else {
      await AsyncStorage.setItem('SmartSaftey', 'true');
      appcontext.actions.setSmartSaftey(true);
    }
  };

  useEffect(() => {
    if (autoLogin) {
      handleGetAllRoutine();
      handleGetAllWorkoutList();
      handleGetMotionList();

      setTimeout(() => {
        navigation.navigate('HomeScreen');
      }, 500);
    }
  }, [autoLogin]);

  const handleGetAllRoutine = async () => {
    const body = {
      user_id: appcontext.state.userid,
      is_home: false,
    };
    console.log('routine', body);
    await serverAxios
      .post('/routine/brief', body)
      .then(res => {
        res.data.map((value, key) => {
          appcontext.actions.setRoutineList(currentRoutine => [
            ...currentRoutine,
            {
              routine_id: value._id,
              routine_name: value.name,
              body_regions: value.targets,
              motion_count: value.motion_count,
            },
          ]);
          handleGetAllRoutineDetail(value._id);
        });
      })
      .catch(err => {
        console.error('Routine Brief Error:', err);
      });
  };

  // const handleGetAllRoutineDetail = async routineID => {
  //   const targetUrl = 'routine/detail/' + routineID;
  //   await serverAxios.get(targetUrl).then(res => {
  //     appcontext.actions.setRoutineDetailList([
  //       ...appcontext.state.routineDetailList,
  //       res.data,
  //     ]);
  //   });
  // };

  const handleGetAllRoutineDetail = async routineID => {
    const targetUrl = 'routine/detail/' + routineID;
    const res = await serverAxios.get(targetUrl).catch(err => {
      console.error('Routine Detail Error:', err);
    });

    const newData = res.data;

    appcontext.actions.setRoutineDetailList(prevList => [...prevList, newData]);
  };

  const handleGetMotionList = async () => {
    const body = {
      user_id: appcontext.state.userid,
    };
    console.log('motion', appcontext.state.userid);
    await serverAxios
      .post('/motion', body)
      .then(res => {
        console.log('motion');
        console.log(res.data);
        appcontext.actions.setMotionList(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleGetAllWorkoutList = async () => {
    const body = {
      user_id: appcontext.state.userid,
      duration: 7,
    };
    console.log('workout', appcontext.state.userid);
    await serverAxios
      .post('/workout/brief', body)
      .then(res => {
        appcontext.actions.setWorkoutList(groupDataByDate(res.data));
      })
      .catch(e => console.log(e));
  };

  const groupDataByDate = data => {
    const groupedData = data.reduce((acc, exercise) => {
      const {date, ...exerciseInfo} = exercise;
      if (!acc[date.split(' ')[0]]) {
        acc[date] = [];
      }
      acc[date].push(exerciseInfo);
      return acc;
    }, {});

    return Object.keys(groupedData).map(date => ({
      date,
      data: groupedData[date],
    }));
  };

  const handleAutoLogin = () => {};

  useEffect(() => {
    if (
      appcontext.state.routineList.length ===
      appcontext.state.routineDetailList.length
    ) {
      console.log('check');
      handleAutoLogin();
    }
  }, [
    appcontext.state.routineDetailList,
    appcontext.state.workoutList,
    appcontext.state.routineList,
  ]);

  useEffect(() => {
    if (appcontext.state.userid.length > 0) {
      getUserInfo();
    }
  }, [appcontext.state.userid]);

  const getUserInfo = async () => {
    await serverAxios
      .get('/account/user-info?user_id=' + appcontext.state.userid)
      .then(res => {
        if (res.data.user_name)
          appcontext.actions.setUsernickname(res.data.user_name);
        if (res.data.birth) appcontext.actions.setUserBirth(res.data.birth);
        if (res.data.gender) appcontext.actions.setUserGender(res.data.gender);
        if (res.data.height) appcontext.actions.setUserHeight(res.data.height);
        if (res.data.weight) appcontext.actions.setUserWeight(res.data.weight);
        if (res.data.body_fat)
          appcontext.actions.setUserBodyFat(res.data.body_fat);
        if (res.data.set_break)
          appcontext.actions.setUserSetTime(res.data.set_break);
        if (res.data.motion_break)
          appcontext.actions.setUserMotionTime(res.data.motion_break);
        if (res.data.experience)
          appcontext.actions.setUserWorkoutCareer(res.data.experience);
      })
      .catch(e => console.log(e));
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: 'white',
      }}>
      <Intros width={282 * width_ratio} height={80 * height_ratio}></Intros>
    </View>
  );
};

export default IntroSplash;

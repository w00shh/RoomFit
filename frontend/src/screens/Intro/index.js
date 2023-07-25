import React, {useContext, useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  Dimensions,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import {AppContext} from '../../contexts/AppProvider';
import {BackHandler} from 'react-native';
import {serverAxios} from '../../utils/commonAxios';
import AsyncStorage from '@react-native-async-storage/async-storage';

//svg
import Intro_Img from '../../assets/svg/img/intro.svg';
import Logo from '../../assets/svg/img/logo.svg';
import Apple from '../../assets/svg/icons/apple.svg';
import Google from '../../assets/svg/icons/google.svg';
import Google2 from '../../assets/svg/img/google.svg';
import Kakao from '../../assets/svg/img/kakaoLogin.svg';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const Intro = ({navigation}) => {
  const isRef = useRef(false);
  appcontext = useContext(AppContext);
  useEffect(() => {
    const handleBackButton = () => {
      // 뒤로가기 버튼 동작을 막기 위해 아무 작업도 수행하지 않습니다.
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  useEffect(() => {
    const handleDeepLink = async () => {
      // 앱이 최초로 실행되었을 때 딥 링크 처리
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        handleUrl(initialUrl);
      }

      // 딥 링크 이벤트 리스너 등록
      Linking.addEventListener('url', handleUrl);
    };

    const handleUrl = url => {
      const sep_url = url.url.split('auth?')[1];
      const params = {};
      sep_url.split('/').forEach(pair => {
        const [key, value] = pair.split('=');
        params[key] = value;
      });
      if (params.user_id) {
        appcontext.actions.setIsLogin(true);
        appcontext.actions.setUserid(params.user_id);
        appcontext.actions.setUsernickname(params.user_name);

        handleGetAllRoutine(params.user_id);
        handleGetAllWorkoutList(params.user_id);
        handleGetMotionList(params.user_id);

        saveLogin(params.user_id);
        navigation.reset({routes: [{name: 'HomeScreen'}]});
      }
    };

    handleDeepLink();

    // // 딥 링크 이벤트 리스너 해제
    // return () => {
    //   Linking.removeEventListener('url', handleUrl);
    // };
  }, []);

  const handleGetAllRoutine = async userId => {
    const body = {
      user_id: userId,
      isHome: false,
    };
    await serverAxios.post('/routine/load', body).then(res => {
      res.data.map((value, key) => {
        appcontext.actions.setRoutineList(currentRoutine => [
          ...currentRoutine,
          {
            routine_id: value.routine_id,
            routine_name: value.routine_name,
            body_regions: value.body_regions,
            motion_count: value.motion_count,
          },
        ]);
        handleGetAllRoutineDetail(value.routine_id);
      });
    });
  };

  const handleGetAllRoutineDetail = async routineID => {
    const targetUrl = 'routine/detail/' + routineID;
    const res = await serverAxios.get(targetUrl);
    const newData = res.data;

    appcontext.actions.setRoutineDetailList(prevList => [...prevList, newData]);
  };

  const handleGetMotionList = async userId => {
    const body = {
      user_id: userId,
    };
    await serverAxios
      .post('/motion', body)
      .then(res => {
        appcontext.actions.setMotionList(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleGetAllWorkoutList = async userId => {
    const body = {
      user_id: userId,
    };
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

  useEffect(() => {
    if (isRef.current) {
      if (
        appcontext.state.routineList.length ===
        appcontext.state.routineDetailList.length
      ) {
        console.log('goHome');
        navigation.navigate('HomeScreen');
      }
    } else {
      isRef.current = true;
    }
  }, [
    appcontext.state.routineDetailList,
    appcontext.state.workoutList,
    appcontext.state.routineList,
  ]);

  const saveLogin = async userId => {
    try {
      await AsyncStorage.setItem('isLogin', userId);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (appcontext.state.userid.length > 0) {
      console.log('?');
      getUserInfo();
    }
  }, [appcontext.state.userid]);

  const getUserInfo = async () => {
    await serverAxios
      .get('/account/user-info?user_id=' + appcontext.state.userid)
      .then(res => {
        console.log(res.data);
        if (res.data.user_name) {
          appcontext.actions.setUsernickname(res.data.user_name);
          console.log(res.data.user_name);
        }
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
    <View style={styles.pageContainer}>
      {/* <WithLocalSvg
        width={320 * width_ratio}
        height={352 * height_ratio}
        asset={Imgintro}></WithLocalSvg> */}
      <View
        style={{
          marginTop:
            Platform.OS === 'ios' ? 64 * height_ratio : 32 * height_ratio,
        }}></View>
      <Intro_Img height={352 * height_ratio} width={320 * width_ratio} />

      <Logo
        style={styles.mainLogo}
        height={80 * height_ratio}
        width={232 * width_ratio}
      />

      {/* <TouchableOpacity
        onPress={() => navigation.navigate('HomeScreen')}
        style={styles.Apple_Button}>
        <Apple height={24 * height_ratio} width={24 * width_ratio} />
        <Text style={styles.Button_Text}> Apple로 시작하기</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(
            `http://ec2-3-36-196-200.ap-northeast-2.compute.amazonaws.com:4000/account/kakao-auth`,
          );
        }}
        style={styles.Kakao_Button}>
        <Kakao></Kakao>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.Google_Button}
        onPress={() =>
          Linking.openURL(
            `http://ec2-3-36-196-200.ap-northeast-2.compute.amazonaws.com:4000/account/google-auth`,
          )
        }>
        <View style={{flex: 1}}>
          <Google2 height={40 * height_ratio} width={40 * width_ratio} />
        </View>
        <Text style={styles.Button_Text}>Google로 시작하기</Text>
        <View style={{flex: 0.7}}></View>
      </TouchableOpacity>

      <View style={styles.selectionContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Login', {
              isRegister: false,
            })
          }
          style={{marginRight: 20 * width_ratio}}>
          <Text style={{fontSize: 14 * height_ratio}}>이메일로 로그인</Text>
        </TouchableOpacity>
        <Image
          style={styles.divider}
          source={require('../../assets/images/divider.png')}></Image>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={{marginLeft: 20 * width_ratio}}>
          <Text style={{fontSize: 14 * height_ratio}}>이메일로 회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Intro;

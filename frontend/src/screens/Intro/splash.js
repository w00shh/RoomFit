import React, {useEffect, useState, useContext} from 'react';
import {SafeAreaView, View, Image, Dimensions} from 'react-native';
import Intros from '../../assets/svg/img/logo.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {serverAxios} from '../../utils/commonAxios';
import {AppContext} from '../../contexts/AppProvider';
const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const Splash = ({navigation}) => {
  const appcontext = useContext(AppContext);
  const [autoLogin, setAutoLogin] = useState(false);
  useEffect(() => {
    checkLogined();
  }, []);

  useEffect(() => {
    if (autoLogin) {
      setTimeout(() => {
        navigation.navigate('HomeScreen');
      }, 1000);
    }
  }, [autoLogin]);

  const checkLogined = async () => {
    const userId = await AsyncStorage.getItem('isLogin');
    console.log(userId);
    if (userId !== null) {
      appcontext.actions.setUserid(userId);
      setAutoLogin(true);
    } else {
      console.log('no');
      setTimeout(() => {
        navigation.navigate('Intro');
      }, 1500);
    }
  };

  useEffect(() => {
    if (appcontext.state.userid.length > 0) {
      getUserInfo();
    }
  }, [appcontext.state.userid]);

  const getUserInfo = async () => {
    await serverAxios
      .get('/account/user-info?user_id=' + appcontext.state.userid)
      .then(res => {
        console.log(res.data);
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

export default Splash;

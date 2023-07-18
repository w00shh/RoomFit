import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  Dimensions,
  Platform,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Kakao from 'react-native-vector-icons/Ionicons';
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

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const Intro = ({navigation}) => {
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
      console.log(params);
      if (params.user_id) {
        appcontext.actions.setIsLogin(true);
        appcontext.actions.setUserid(params.user_id);
        appcontext.actions.setUsernickname(params.user_id);

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

  const saveLogin = async userId => {
    try {
      await AsyncStorage.setItem('isLogin', userId);
    } catch (e) {
      console.log(e);
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
      <TouchableOpacity
        onPress={() => navigation.navigate('HomeScreen')}
        style={styles.Apple_Button}>
        <Apple height={24 * height_ratio} width={24 * width_ratio} />
        <Text style={styles.Button_Text}> Apple로 시작하기</Text>
      </TouchableOpacity>
      {/* <Button
        title="커뮤니티"
        onPress={() => navigation.navigate('Community')}
      /> */}
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(
            `http://ec2-3-36-196-200.ap-northeast-2.compute.amazonaws.com:4000/account/kakao-auth`,
          );
        }}
        style={styles.Kakao_Button}>
        <Kakao name="chatbubble" size={20 * height_ratio} color="black"></Kakao>
        <Text style={styles.Button_Text2}> Kakao로 시작하기</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.Google_Button}
        onPress={() =>
          Linking.openURL(
            `http://ec2-3-36-196-200.ap-northeast-2.compute.amazonaws.com:4000/account/google-auth`,
          )
        }>
        <Google height={24 * height_ratio} width={24 * width_ratio} />
        <Text style={styles.Button_Text}> Google로 시작하기</Text>
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

import React, {useContext, useEffect, useState} from 'react';
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
import Kakao from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import {AppContext} from '../../contexts/AppProvider';
import {WithLocalSvg} from 'react-native-svg';
import Imgintro from '../../assets/images/img_intro.svg';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const Intro = ({navigation}) => {
  appcontext = useContext(AppContext);
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
        navigation.reset({routes: [{name: 'HomeScreen'}]});
      }
    };

    handleDeepLink();

    // 딥 링크 이벤트 리스너 해제
    // return () => {
    //   Linking.removeEventListener('url', handleUrl);
    // };
  }, []);
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
          width: 320 * width_ratio,
          height: 352 * height_ratio,
        }}>
        <Image source={require('../../assets/images/img_intro.png')}></Image>
      </View>
      <Image
        style={styles.mainLogo}
        source={require('../../assets/images/img_logo_roomfit.png')}></Image>
      <TouchableOpacity
        onPress={() => navigation.navigate('HomeScreen')}
        style={styles.Apple_Button}>
        <Icon name="apple" size={20} color="white"></Icon>
        <Text style={styles.Button_Text}> Apple로 시작하기</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        onPress={() => {
          Linking.openURL(
            `http://ec2-18-119-142-5.us-east-2.compute.amazonaws.com:4000/account/kakao-auth`,
          );
        }}
        style={styles.Kakao_Button}>
        <Kakao name="chatbubble" size={20} color="black"></Kakao>
        <Text style={styles.Button_Text2}> Kakao로 시작하기</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={styles.Google_Button}
        onPress={() =>
          Linking.openURL(
            `http://ec2-18-119-142-5.us-east-2.compute.amazonaws.com:4000/account/google-auth`,
          )
        }>
        <Icon name="google" size={20} color="white"></Icon>
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
          <Text>이메일로 로그인</Text>
        </TouchableOpacity>
        <Image
          style={styles.divider}
          source={require('../../assets/images/divider.png')}></Image>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={{marginLeft: 20 * width_ratio}}>
          <Text>이메일로 회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Intro;

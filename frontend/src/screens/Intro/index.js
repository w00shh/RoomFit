import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {  WithLocalSvg } from 'react-native-svg';
import apple from '../../assets/images/apple_logo.svg';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import CustomButton_B from '../../components/CustomButton_B';
import styles from './styles';

const Intro = ({navigation}) => {
  return (
    <View style={styles.pageContainer}>
      <Image
        style={styles.intro}
        source={require('../../assets/images/img_intro.png')}></Image>
      <Image
        style={styles.mainLogo}
        source={require('../../assets/images/img_logo_roomfit.png')}></Image>
      <TouchableOpacity style={styles.Apple_Button}>
        <Icon name="apple" size={20} color ="white"></Icon>
        <Text style={styles.Button_Text}>  Apple로 시작하기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Google_Button}>
        <Icon name = "google" size ={20} color = "white" ></Icon>
        <Text style={styles.Button_Text}>  Google로 시작하기</Text>
      </TouchableOpacity>

      <View style = {styles.selectionContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={{marginRight:20,}}>
          <Text>이메일로 로그인</Text>
        </TouchableOpacity>
        <Image style={styles.devider} source ={require('../../assets/images/devider.png')}></Image>
        <TouchableOpacity style={{marginLeft:20,}}>
          <Text>이메일로 회원가입</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default Intro;

import React, {useState} from 'react';
import {Text, View, Image, TouchableOpacity, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Kakao from 'react-native-vector-icons/Ionicons';
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
      {/* <TouchableOpacity
        onPress={() => navigation.navigate('HomeScreen')}
        style={styles.Apple_Button}>
        <Icon name="apple" size={20} color="white"></Icon>
        <Text style={styles.Button_Text}> Apple로 시작하기</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(
            `http://ec2-18-119-142-5.us-east-2.compute.amazonaws.com:4000/account/kakao-auth`,
          );
        }}
        style={styles.Kakao_Button}>
        <Kakao name="chatbubble" size={20} color="black"></Kakao>
        <Text style={styles.Button_Text2}> Kakao로 시작하기</Text>
      </TouchableOpacity>
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
          style={{marginRight: 20}}>
          <Text>이메일로 로그인</Text>
        </TouchableOpacity>
        <Image
          style={styles.divider}
          source={require('../../assets/images/divider.png')}></Image>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={{marginLeft: 20}}>
          <Text>이메일로 회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Intro;

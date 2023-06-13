import React, {useState} from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import styles from './styles.js';
import Input from '../../components/Input/index.js';

const Register = ({navigation}) => {
  const [nickname, setNickname] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleToLoginPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.pageContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>이메일로 회원가입</Text>
      </View>
      <Input label="닉네임" placeholder="닉네임 입력" inputMode="text"></Input>
      <Input
        label="이메일"
        placeholder="이메일 입력"
        inputMode="email"
        keyboardType="email-address"></Input>
      <Input
        label="비밀번호"
        placeholder="비밀번호 입력"
        inputMode="text"
        secureTextEntry={true}></Input>
      <Input
        label="비밀번호 확인"
        placeholder="비밀번호 확인"
        inputMode="text"
        secureTextEntry={true}></Input>
      <View style={styles.toLogin}>
        <Text style={styles.questionText}>이미 회원이신가요?</Text>
        <TouchableWithoutFeedback onPress={handleToLoginPress}>
          <Text style={styles.loginText}>로그인하기</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default Register;

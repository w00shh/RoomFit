import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles.js';
import Input from '../../components/Input/index.js';
import CustomButton_B from '../../components/CustomButton_B/index.js';

const Register = ({navigation}) => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [registerDisabled, setRegisterDisablbed] = useState(true);

  const handleRegisterPress = () => {};

  const handleToLoginPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.pageContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>이메일로 회원가입</Text>
      </View>
      <Input
        label="닉네임"
        onChangeText={text => setNickname(text)}
        placeholder="닉네임 입력"
        inputMode="text"></Input>
      <Input
        label="이메일"
        onChangeText={text => setEmail(text)}
        placeholder="이메일 입력"
        inputMode="email"
        keyboardType="email-address"></Input>
      <Input
        label="비밀번호"
        onChangeText={text => setPassword(text)}
        placeholder="비밀번호 입력"
        inputMode="text"
        secureTextEntry={true}></Input>
      <Input
        label="비밀번호 확인"
        onChangeText={text => setPasswordConfirm(text)}
        placeholder="비밀번호 확인"
        inputMode="text"
        secureTextEntry={true}></Input>
      <CustomButton_B
        width={356}
        onPress={handleRegisterPress}
        disabled={registerDisabled}
        content="회원가입"></CustomButton_B>
      <View style={styles.toLogin}>
        <Text style={styles.questionText}>이미 회원이신가요?</Text>
        <TouchableOpacity onPress={handleToLoginPress}>
          <Text style={styles.loginText}>로그인하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;

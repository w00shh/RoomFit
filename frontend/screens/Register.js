import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Input from '../components/Input';

const Register = ({navigation}) => {
  const [nickname, setNickname] = React.useState('');

  const [errorMessage, setErrorMessage] = React.useState('');

  return (
    <View style={styles.pageContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>이메일로 회원가입</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  titleContainer: {
    marginBottom: 32,
    alignSelf: 'flex-start',
  },
  title: {
    fontWeight: '700',
    fontSize: 20,
  },
});

export default Register;

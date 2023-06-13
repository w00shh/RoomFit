import React, {useState} from 'react';
import styles from './styles';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import Input from '../../components/Input';
import SetItem from '../../components/SetItem';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFindIdPress = () => {};

  const handleFindPasswordPress = () => {};

  const handleToRegisterPress = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.pageContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>이메일로 로그인</Text>
      </View>
      <View>
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
      </View>
      <View style={styles.findContainer}>
        <View style={styles.findBox}>
          <TouchableWithoutFeedback onPress={handleFindIdPress}>
            <Text style={styles.findText}>아이디 찾기</Text>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.findBox}>
          <TouchableWithoutFeedback onPress={handleFindPasswordPress}>
            <Text style={styles.findText}>비밀번호 찾기</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={styles.toRegister}>
        <Text style={styles.questionText}>아직 회원이 아니신가요?</Text>
        <TouchableWithoutFeedback onPress={handleToRegisterPress}>
          <Text style={styles.registerText}>회원가입하기</Text>
        </TouchableWithoutFeedback>
      </View>
      <SetItem isKey={true}></SetItem>
      <SetItem isKey={false}></SetItem>
    </View>
  );
};

export default Login;

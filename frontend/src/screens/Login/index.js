import React, {useEffect, useState} from 'react';
import styles from './styles';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Input from '../../components/Input';
import SetItem from '../../components/SetItem';
import CustomButton_B from '../../components/CustomButton_B';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [isEmail, setIsEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [isPassword, setIsPassword] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleEmailChange = e => {};

  const handlePasswordChange = e => {};

  const handleDisabled = () => {
    if (isEmail && isPassword) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const handleLoginPress = () => {};

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
      </View>
      <CustomButton_B
        width={356}
        onPress={handleLoginPress}
        disabled={isDisabled}
        content="로그인하기"></CustomButton_B>
      <View style={styles.findContainer}>
        <View style={styles.findBox}>
          <TouchableOpacity onPress={handleFindIdPress}>
            <Text style={styles.findText}>아이디 찾기</Text>
          </TouchableOpacity>
        </View>
        <Image
          style={styles.divider}
          source={require('../../assets/images/divider.png')}></Image>
        <View style={styles.findBox}>
          <TouchableOpacity onPress={handleFindPasswordPress}>
            <Text style={styles.findText}>비밀번호 찾기</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.toRegister}>
        <Text style={styles.questionText}>아직 회원이 아니신가요?</Text>
        <TouchableOpacity onPress={handleToRegisterPress}>
          <Text style={styles.registerText}>회원가입하기</Text>
        </TouchableOpacity>
      </View>

      {/* <SetItem isKey={true}></SetItem>
      <SetItem isKey={false}></SetItem> */}
    </View>
  );
};

export default Login;

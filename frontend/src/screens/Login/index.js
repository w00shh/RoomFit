import React, {useEffect, useState} from 'react';
import styles from './styles';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Input from '../../components/Input';
import SetItem from '../../components/SetItem';
import CustomButton_B from '../../components/CustomButton_B';
import {useSelector, useDispatch} from 'react-redux';
import {setEmail, setPassword} from '../../redux/actions';

const Login = ({navigation}) => {
  const {email, password} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const [loginDisabled, setLoginDisabled] = useState(true);

  const handleEmailChange = e => {};

  const handlePasswordChange = e => {};

  const handleLoginDisabled = () => {
    if (email.length > 0 && password.length > 0) {
      setLoginDisabled(false);
    } else {
      setLoginDisabled(true);
    }
  };

  useEffect(() => {
    handleLoginDisabled();
  }, [email, password]);

  const handleLoginPress = () => {
    try {
      dispatch(setEmail(email));
      dispatch(setPassword(password));
      console.group(email);
      // var user = {
      //     Name: name,
      //     Age: age
      // }
      // await AsyncStorage.setItem('UserData', JSON.stringify(user));
      console.log(email);
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.log(error);
    }
  };

  const handleselectionIdPress = () => {};

  const handleselectionPasswordPress = () => {};

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
          onChangeText={text => dispatch(setEmail(text))}
          placeholder="이메일 입력"
          inputMode="email"
          keyboardType="email-address"></Input>
        <Input
          label="비밀번호"
          onChangeText={text => dispatch(setPassword(text))}
          placeholder="비밀번호 입력"
          inputMode="text"
          secureTextEntry={true}></Input>
      </View>
      <CustomButton_B
        width={356}
        onPress={handleLoginPress}
        disabled={loginDisabled}
        content="로그인하기"></CustomButton_B>
      <View style={styles.selectionContainer}>
        <View style={styles.selectionBox}>
          <TouchableOpacity onPress={handleselectionIdPress}>
            <Text style={styles.selectionText}>아이디 찾기</Text>
          </TouchableOpacity>
        </View>
        <Image
          style={styles.divider}
          source={require('../../assets/images/divider.png')}></Image>
        <View style={styles.selectionBox}>
          <TouchableOpacity onPress={handleselectionPasswordPress}>
            <Text style={styles.selectionText}>비밀번호 찾기</Text>
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

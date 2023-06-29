import React, {useEffect, useState} from 'react';
import styles from './styles';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Input from '../../components/Input';
import CustomButton_B from '../../components/CustomButton_B';
import {useDispatch} from 'react-redux';
import {
  setIsLogin,
  setUserId,
  setUserNickname,
  setUserEmail,
} from '../../redux/actions';
import {serverAxios} from '../../utils/commonAxios';

const Login = ({navigation, route}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginDisabled, setLoginDisabled] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (route.params.isRegister) {
      setEmail(route.params.email);
    }
  }, []);

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

  const handleLoginPress = async () => {
    const body = {
      email: email,
      password: password,
    };

    await serverAxios
      .put('/account/login', body)
      .then(res => {
        console.log(res.data);

        dispatch(setIsLogin(res.data.success));
        dispatch(setUserId(res.data.user_id));
        dispatch(setUserNickname(res.data.user_name));
        dispatch(setUserEmail(res.data.email));

        navigation.reset({routes: [{name: 'HomeScreen'}]});
      })
      .catch(e => {
        console.log(e);
      });
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
          onChangeText={text => setEmail(text)}
          placeholder="이메일 입력"
          defaultValue={email}
          inputMode="email"
          keyboardType="email-address"></Input>
        <Input
          label="비밀번호"
          onChangeText={text => setPassword(text)}
          placeholder="비밀번호 입력"
          defaultValue={password}
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
    </View>
  );
};

export default Login;

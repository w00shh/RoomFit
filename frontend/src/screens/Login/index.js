import React, {useContext, useEffect, useState} from 'react';
import styles from './styles';
import {Text, TouchableOpacity, View, Dimensions} from 'react-native';
import Input from '../../components/Input';
import CustomButton_B from '../../components/CustomButton_B';
import {serverAxios} from '../../utils/commonAxios';
import {AppContext} from '../../contexts/AppProvider';
import Back from 'react-native-vector-icons/Ionicons';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const Login = ({navigation, route}) => {
  const appcontext = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginDisabled, setLoginDisabled] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Back
            name="arrow-back"
            color={'#242424'}
            size={25 * height_ratio}
            style={{
              marginLeft: 0 * width_ratio,
              marginRight: 10 * width_ratio,
            }}></Back>
        </TouchableOpacity>
      ),
    });
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

        appcontext.actions.setIsLogin(res.data.success);
        appcontext.actions.setUserid(res.data.user_id);
        appcontext.actions.setUsernickname(res.data.user_name);
        appcontext.actions.setUseremail(res.data.email);

        navigation.reset({routes: [{name: 'HomeScreen'}]});
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleselectionIdFindPress = () => {};

  const handleselectionPasswordFindPress = () => {
    navigation.navigate('PasswordFind');
  };

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
        width={358 * width_ratio}
        onPress={handleLoginPress}
        disabled={loginDisabled}
        content="로그인하기"></CustomButton_B>
      <View style={styles.selectionContainer}>
        <View style={styles.selectionBox}>
          <TouchableOpacity onPress={handleselectionPasswordFindPress}>
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

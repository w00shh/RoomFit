import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import styles from './styles.js';
import Input from '../../components/Input/index.js';
import CustomButton_B from '../../components/CustomButton_B/index.js';
import {serverAxios} from '../../utils/commonAxios.js';

//svg
import Back from '../../assets/svg/buttons/single/back.svg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const Register = ({navigation}) => {
  const [id, setId] = useState('');
  const [isIdValid, setIsIdValid] = useState(false);
  const [idErrorMessage, setIdErrorMessage] = useState('');
  const [nickname, setNickname] = useState('');
  const [isNicknamevalid, setIsNicknameValid] = useState(false);
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [isCertificated, setIsCertificated] = useState(false);
  const [certificationDisabled, setCertificationDisabled] = useState(true);
  const [certificationCode, setCertificationCode] = useState();
  const [isCertificationNumberVisible, setIsCertificationNumberVisible] =
    useState(false);
  const [certificationNumber, setcertificationNumber] = useState('');
  const [certificationNumberDisabled, setCertificationNumberDisabled] =
    useState(true);
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isPasswordConfirmValid, setIsPasswordConfirmValid] = useState(false);
  const [passwordConfirmErrorMessage, setPasswordConfirmErrorMessage] =
    useState('');
  const [registerDisabled, setRegisterDisablbed] = useState(true);

  const handleIdChange = text => {
    setId(text);
  };

  const handleNicknameChange = text => {
    setNickname(text);
  };

  const handleEmailChange = text => {
    setEmail(text);
    if (text.length > 0) {
      setCertificationDisabled(false);
    } else {
      setCertificationDisabled(true);
    }
  };

  const handleCertificationPress = async () => {
    const body = {
      email: email,
    };
    await serverAxios
      .post('/account/email-verification', body)
      .then(res => {
        setCertificationCode(res.data.verification_code);
        setIsCertificationNumberVisible(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleCertificationNumberChange = text => {
    setcertificationNumber(text);
    if (text.length > 0) {
      setCertificationNumberDisabled(false);
    } else {
      setCertificationNumberDisabled(true);
    }
  };

  const handleCertificationNumberPress = () => {
    if (certificationNumber === String(certificationCode)) {
      setIsCertificated(true);
      setIsCertificationNumberVisible(false);
    }
  };

  useEffect(() => {}, [isCertificated]);
  const handlePasswordChange = text => {
    setPassword(text);
  };

  const handlePasswordConfirmChange = text => {
    setPasswordConfirm(text);
  };

  const handleRegisterDisabled = () => {
    if (
      // isIdValid &&
      // isNicknamevalid &&
      // isEmailValid &&
      // isPasswordValid &&
      // isPasswordConfirmValid
      id.length > 0 &&
      nickname.length > 0 &&
      email.length > 0 &&
      isCertificated &&
      password.length > 0 &&
      password === passwordConfirm
    ) {
      setRegisterDisablbed(false);
    } else {
      setRegisterDisablbed(true);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Back height={24 * height_ratio} width={24 * width_ratio} />
        </TouchableOpacity>
      ),
    });
  }, []);

  useEffect(() => {
    handleRegisterDisabled();
  }, [id, nickname, email, password, passwordConfirm]);

  const handleRegisterPress = async () => {
    const body = {
      user_id: id,
      user_name: nickname,
      email: email,
      password: password,
    };

    await serverAxios
      .post('/account/register', body)
      .then(res => {
        navigation.navigate('Birthday', {
          isRegister: true,
          email: email,
          id: id,
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleToLoginPress = () => {
    navigation.navigate('Login', {isRegister: false});
  };

  return (
    <View style={styles.pageContainer}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>이메일로 회원가입</Text>
        </View>
        <Input
          label="아이디"
          onChangeText={handleIdChange}
          placeholder="아이디 입력"
          defaultValue={id}
          inputMode="text"></Input>
        <Input
          label="닉네임"
          onChangeText={handleNicknameChange}
          placeholder="닉네임 입력"
          defaultValue={nickname}
          inputMode="text"></Input>
        <Input
          label="이메일"
          onChangeText={handleEmailChange}
          placeholder="이메일 입력"
          defaultValue={email}
          inputMode="email"
          keyboardType="email-address"
          isCertification={true}
          isCertificated={isCertificated}
          certificationContent="인증번호 전송"
          disabled={certificationDisabled}
          onPress={handleCertificationPress}></Input>
        {isCertificationNumberVisible && (
          <Input
            isCertificationNumberVisible={true}
            onChangeText={handleCertificationNumberChange}
            placeholder="인증번호 입력"
            defaultValue={certificationNumber}
            inputMode="text"
            xkeyboardType="number-pad"
            isCertification={true}
            certificationContent="인증번호 입력"
            disabled={certificationNumberDisabled}
            onPress={handleCertificationNumberPress}></Input>
        )}
        <Input
          label="비밀번호"
          onChangeText={handlePasswordChange}
          placeholder="비밀번호 입력"
          defaultValue={password}
          inputMode="text"
          secureTextEntry={true}></Input>
        <Input
          label="비밀번호 확인"
          onChangeText={handlePasswordConfirmChange}
          placeholder="비밀번호 확인"
          defaultValue={passwordConfirm}
          inputMode="text"
          secureTextEntry={true}></Input>
        <CustomButton_B
          width={358 * width_ratio}
          onPress={handleRegisterPress}
          disabled={registerDisabled}
          content="회원가입"></CustomButton_B>
        <View style={styles.toLogin}>
          <Text style={styles.questionText}>이미 회원이신가요?</Text>
          <TouchableOpacity onPress={handleToLoginPress}>
            <Text style={styles.loginText}>로그인하기</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Register;

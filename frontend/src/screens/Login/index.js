import React, {useContext, useEffect, useState, useRef} from 'react';
import styles from './styles';
import {Text, TouchableOpacity, View, Dimensions} from 'react-native';
import Input from '../../components/Input';
import CustomButton_B from '../../components/CustomButton_B';
import {serverAxios} from '../../utils/commonAxios';
import {AppContext} from '../../contexts/AppProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

//svg
import Back from '../../assets/svg/buttons/single/back.svg';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const Login = ({navigation, route}) => {
  const appcontext = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginDisabled, setLoginDisabled] = useState(true);
  const isRef = useRef(false);
  const array1 = [1, 2];

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

  const saveLogin = async userId => {
    try {
      await AsyncStorage.setItem('isLogin', userId);
    } catch (e) {
      console.log(e);
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
        if (res.data.success) {
          appcontext.actions.setIsLogin(res.data.success);
          appcontext.actions.setUserid(res.data.user_id);
          appcontext.actions.setUseremail(res.data.email);

          getUserInfo(res.data.user_id);
          handleGetAllRoutine(res.data.user_id);
          handleGetAllWorkoutList(res.data.user_id);
          handleGetMotionList(res.data.user_id);
          saveLogin(res.data.user_id);
        }

        navigation.reset({routes: [{name: 'HomeScreen'}]});
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleGetAllRoutine = async userId => {
    const body = {
      user_id: userId,
      isHome: false,
    };
    await serverAxios.post('/routine/load', body).then(res => {
      res.data.map((value, key) => {
        appcontext.actions.setRoutineList(currentRoutine => [
          ...currentRoutine,
          {
            routine_id: value.routine_id,
            routine_name: value.routine_name,
            body_regions: value.body_regions,
            motion_count: value.motion_count,
          },
        ]);
        handleGetAllRoutineDetail(value.routine_id);
      });
    });
  };

  const handleGetAllRoutineDetail = async routineID => {
    const targetUrl = 'routine/detail/' + routineID;
    const res = await serverAxios.get(targetUrl);
    const newData = res.data;

    appcontext.actions.setRoutineDetailList(prevList => [...prevList, newData]);
  };

  const handleGetMotionList = async userId => {
    const body = {
      user_id: userId,
    };
    await serverAxios
      .post('/motion', body)
      .then(res => {
        appcontext.actions.setMotionList(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleGetAllWorkoutList = async userId => {
    const body = {
      user_id: userId,
      duration: 7,
    };
    await serverAxios
      .post('/workout/brief', body)
      .then(res => {
        appcontext.actions.setWorkoutList(groupDataByDate(res.data));
      })
      .catch(e => console.log(e));
  };

  const groupDataByDate = data => {
    const groupedData = data.reduce((acc, exercise) => {
      const {date, ...exerciseInfo} = exercise;
      if (!acc[date.split(' ')[0]]) {
        acc[date] = [];
      }
      acc[date].push(exerciseInfo);
      return acc;
    }, {});

    return Object.keys(groupedData).map(date => ({
      date,
      data: groupedData[date],
    }));
  };

  useEffect(() => {
    if (isRef.current) {
      if (
        appcontext.state.routineList.length ===
        appcontext.state.routineDetailList.length
      ) {
        navigation.navigate('HomeScreen');
      }
    } else {
      isRef.current = true;
    }
  }, [
    appcontext.state.routineDetailList,
    appcontext.state.workoutList,
    appcontext.state.routineList,
  ]);

  const getUserInfo = async userId => {
    await serverAxios
      .get('/account/user-info?user_id=' + userId)
      .then(res => {
        if (res.data.user_name)
          appcontext.actions.setUsernickname(res.data.user_name);
        if (res.data.birthday) {
          appcontext.actions.setUserBirth(res.data.birthday);
        }

        if (res.data.gender) appcontext.actions.setUserGender(res.data.gender);
        if (res.data.height) appcontext.actions.setUserHeight(res.data.height);
        if (res.data.weight) appcontext.actions.setUserWeight(res.data.weight);
        if (res.data.body_fat)
          appcontext.actions.setUserBodyFat(res.data.body_fat);
        if (res.data.set_break)
          appcontext.actions.setUserSetTime(res.data.set_break);
        if (res.data.motion_break)
          appcontext.actions.setUserMotionTime(res.data.motion_break);
        if (res.data.experience)
          appcontext.actions.setUserWorkoutCareer(res.data.experience);
      })
      .catch(e => console.log(e));
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

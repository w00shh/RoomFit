import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';

import styles from './styles';
import Profile from '../../../assets/svg/normalProfile.svg';
import Camera from '../../../assets/images/camera.svg';
import Right from 'react-native-vector-icons/AntDesign';
import Back from 'react-native-vector-icons/Ionicons';
import {AppContext} from '../../../contexts/AppProvider';
import {serverAxios} from '../../../utils/commonAxios';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const ProfileSetting = ({navigation}) => {
  const appcontext = useContext(AppContext);
  const [tempNickname, setTempNickname] = useState(
    appcontext.state.usernickname,
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            handleBackButton();
          }}>
          <Back
            name="arrow-back"
            color={'#242424'}
            size={25 * height_ratio}
            style={{
              marginLeft: 0 * width_ratio,
              marginRight: Platform.OS === 'ios' ? 0 : 10 * width_ratio,
            }}></Back>
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <>
          <Text
            style={{
              marginHorizontal: Platform.OS === 'ios' ? 0 : 6 * width_ratio,
              color: '#242424',
              fontSize: 16 * height_ratio,
              fontWeight: '700',
            }}>
            프로필 설정
          </Text>
        </>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => handleSaveButton()}>
          <Text style={{fontSize: 14 * height_ratio}}>저장</Text>
        </TouchableOpacity>
      ),
    });
  }, [appcontext.state.usernickname]);

  const handleSaveButton = async () => {
    console.log(appcontext.state.usernickname);
    const body = {
      user_id: appcontext.state.userid,
      user_name: appcontext.state.usernickname,
    };
    await serverAxios.put('/account/update', body).then(res => {
      console.log(res.data.success);

      navigation.navigate('MainSetting');
    });
  };

  const handleBackButton = () => {
    appcontext.actions.setUsernickname(tempNickname);
    navigation.reset({routes: [{name: 'MainSetting'}]});
  };

  useEffect(() => {
    console.log(appcontext.state.usernickname);
    appcontext.actions.setUsernickname(appcontext.state.usernickname);
  }, [appcontext.state.usernickname]);

  return (
    <SafeAreaView style={styles.pageContainer}>
      <ScrollView>
        <View style={styles.profileContainer}>
          <View>
            <Profile width={64 * width_ratio} height={64 * height_ratio} />
            <TouchableWithoutFeedback>
              <Camera
                width={25 * width_ratio}
                height={25 * height_ratio}
                style={{position: 'absolute', bottom: 0, right: 0}}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
        <Text style={styles.subTitle}>닉네임 설정</Text>
        <View>
          <TextInput
            style={styles.inputContainer}
            value={appcontext.state.usernickname}
            onChangeText={text =>
              appcontext.actions.setUsernickname(text)
            }></TextInput>
        </View>
        <Text style={styles.subTitle}>개인 설정</Text>
        <View style={styles.appContainer}>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>이메일</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.contentText2}>
                {appcontext.state.useremail}
              </Text>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>생년월일</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.contentText2}>
                {appcontext.state.userBirth}
              </Text>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>비밀번호 수정</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('PasswordSetting')}>
                <Right
                  name="right"
                  size={18 * height_ratio}
                  style={styles.rightIcon}
                  color={'#242424'}></Right>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>성별</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.contentText2}>
                {appcontext.state.userGender ? '남성' : '여성'}
              </Text>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>키/몸무게</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.contentText3}>
                {appcontext.state.userHeight} {'cm / '}
                {appcontext.state.userWeight}kg
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('HeightWeight')}>
                <Right
                  name="right"
                  size={18 * height_ratio}
                  style={styles.rightIcon}
                  color={'#242424'}></Right>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>운동경력</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.contentText3}>
                {appcontext.state.userWorkoutCareer}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('WorkoutCareer')}>
                <Right
                  name="right"
                  size={18 * height_ratio}
                  style={styles.rightIcon}
                  color={'#242424'}></Right>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>체지방률</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.contentText3}>
                {appcontext.state.userBodyFat}%
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('BodyFat')}>
                <Right
                  name="right"
                  size={18 * height_ratio}
                  style={styles.rightIcon}
                  color={'#242424'}></Right>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileSetting;

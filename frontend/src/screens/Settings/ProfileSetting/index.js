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
import {WithLocalSvg} from 'react-native-svg';
import Profile from '../../../assets/images/normalProfile.svg';
import Camera from '../../../assets/images/camera.svg';
import Right from 'react-native-vector-icons/AntDesign';
import Back from 'react-native-vector-icons/Ionicons';
import {AppContext} from '../../../contexts/AppProvider';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const ProfileSetting = ({navigation}) => {
  const appcontext = useContext(AppContext);
  const [Nickname, onChangeText] = useState(appcontext.state.usernickname);

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
        <TouchableOpacity>
          <Text style={{fontSize: 14 * height_ratio}}>저장</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  useEffect(() => {
    appcontext.actions.setUsernickname(Nickname);
  }, [Nickname]);

  handleBackButton = () => {
    navigation.reset({routes: [{name: 'MainSetting'}]});
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <ScrollView>
        <View style={styles.profileContainer}>
          <View>
            <WithLocalSvg
              width={64 * width_ratio}
              height={64 * height_ratio}
              asset={Profile}
            />
            <TouchableWithoutFeedback>
              <WithLocalSvg
                width={25 * width_ratio}
                height={25 * height_ratio}
                asset={Camera}
                style={{position: 'absolute', bottom: 0, right: 0}}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
        <Text style={styles.subTitle}>닉네임 설정</Text>
        <View>
          <TextInput
            style={styles.inputContainer}
            value={Nickname}
            onChangeText={onChangeText}></TextInput>
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
                {appcontext.state.userHWeight.split('/')[0]}cm /{' '}
                {appcontext.state.userHWeight.split('/')[1]}kg
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
              <TouchableOpacity>
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

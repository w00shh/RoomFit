import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Platform,
} from 'react-native';
import styles from './styles';
import {AppContext} from '../../../contexts/AppProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

//svg
import Workout from '../../../assets/svg/buttons/default/workout.svg';
import History from '../../../assets/svg/buttons/default/history.svg';
import Setting from '../../../assets/svg/buttons/active/setting.svg';

import Profile from '../../../assets/svg/img/profile.svg';
import Right from '../../../assets/svg/buttons/single/arrow/right_no.svg';

import {Switch} from '../../../components/toggle';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const MainSetting = ({navigation}) => {
  const appcontext = useContext(AppContext);
  const [isAssist, setIsAssist] = useState(appcontext.state.smartAssist);
  const [isSaftey, setIsSaftey] = useState(appcontext.state.smartSaftey);
  const toggleSwitch = () => setIsAssist(previousState => !previousState);
  const toggleSwitch2 = () => setIsSaftey(previousState => !previousState);

  const handleLogout = () => {
    appcontext.actions.setIsLogin(false);
    appcontext.actions.setWorkoutList([]);
    appcontext.actions.setRoutineList([]);
    appcontext.actions.setRoutineDetailList([]);
    appcontext.actions.setUserid('');
    appcontext.actions.setUseremail('');
    saveLogout();
    navigation.reset({routes: [{name: 'IntroSplash'}]});
  };

  const saveLogout = async () => {
    try {
      await AsyncStorage.setItem('isLogin', '');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log(isAssist);
    console.log(isSaftey);
  }, []);

  useEffect(() => {
    assist();
  }, [isAssist]);

  useEffect(() => {
    saftey();
  }, [isSaftey]);

  const assist = async () => {
    try {
      await AsyncStorage.setItem('SmartAssist', isAssist ? 'true' : 'false');
      appcontext.actions.setSmartAssist(isAssist);
    } catch (e) {
      console.log(e);
    }
  };

  const saftey = async () => {
    try {
      await AsyncStorage.setItem('SmartSaftey', isSaftey ? 'true' : 'false');
      appcontext.actions.setSmartSaftey(isSaftey);
    } catch (e) {
      console.log(e);
    }
  };

  const calcTime = time => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    if (time < 60) {
      return `${time}초`;
    } else if (time % 60 === 0) {
      return `${min}분`;
    } else {
      return `${min}분 ${sec}초`;
    }
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 16 * width_ratio,
            }}>
            <Profile width={64 * width_ratio} height={64 * height_ratio} />
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12 * width_ratio,
              }}
              onPress={() => navigation.navigate('ProfileSetting')}>
              <Text
                style={{
                  fontSize: 20 * height_ratio,
                  fontWeight: '700',
                  color: '#242424',
                }}>
                {appcontext.state.usernickname}
              </Text>
              <Right height={15 * height_ratio} width={9 * width_ratio} />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => handleLogout()}>
              <Text style={{fontSize: 16 * height_ratio, color: '#242424'}}>
                로그아웃
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.subTitle}>기기 설정</Text>
        <View style={styles.gigiContainer}>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>기기 연결</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('ConnectDevice')}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8 * width_ratio,
                }}>
                <Text style={styles.contentText2}>Roomfit 1</Text>
                <Right height={16 * height_ratio} width={9 * width_ratio} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.contentContainer2}>
            <View
              style={[
                styles.contentContainer,
                {paddingVertical: 0, marginBottom: 6 * height_ratio},
              ]}>
              <Text style={styles.contentText}>스마트 세이프티</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8 * width_ratio,
                }}>
                <Text
                  style={{
                    fontSize: 14 * height_ratio,
                    color: isSaftey ? '#5252fa' : '#f5f5f5',
                  }}>
                  ON
                </Text>
                <Switch on={isSaftey} onPress={toggleSwitch2} />
              </View>
            </View>
            <Text style={styles.subcontentText}>
              급격한 변화, 장기간 움직임이 없거나 좌우 대칭이 심각하게 틀어진
              경우 하중을 자동으로 줄여줍니다.
            </Text>
          </View>
          <View style={styles.contentContainer2}>
            <View
              style={[
                styles.contentContainer,
                {paddingVertical: 0, marginBottom: 6 * height_ratio},
              ]}>
              <Text style={styles.contentText}>스마트 어시스트</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8 * width_ratio,
                }}>
                <Text
                  style={{
                    fontSize: 14 * height_ratio,
                    color: isAssist ? '#5252fa' : '#f5f5f5',
                  }}>
                  ON
                </Text>
                <Switch on={isAssist} onPress={toggleSwitch} />
              </View>
            </View>
            <Text style={styles.subcontentText}>
              비위험상황이지만 힘이 부족하여 동작을 일시적으로 주저하게 되는
              경우 하중을 자동으로 줄여줍니다.
            </Text>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>세트간 휴식시간</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('RestingTime', {title: '세트'});
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8 * width_ratio,
                }}>
                <Text style={styles.contentText2}>
                  {calcTime(appcontext.state.userSetTime)}
                </Text>

                <Right height={16 * height_ratio} width={9 * width_ratio} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>동작간 휴식시간</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('RestingTime', {title: '동작'});
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8 * width_ratio,
                }}>
                <Text style={styles.contentText2}>
                  {calcTime(appcontext.state.userMotionTime)}
                </Text>

                <Right height={16 * height_ratio} width={9 * width_ratio} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>절전 모드</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8 * width_ratio,
              }}>
              <Text style={styles.contentText2}>
                {appcontext.state.powerSaving}분
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('PowerSaving')}>
                <Right height={16 * height_ratio} width={9 * width_ratio} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Text style={styles.subTitle}>앱 설정</Text>
        <View style={styles.appContainer}>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>언어 설정</Text>
            <TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8 * width_ratio,
                }}>
                <Text style={styles.contentText2}>한국어</Text>

                <Right height={16 * height_ratio} width={9 * width_ratio} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>시간대 설정</Text>
            <TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8 * width_ratio,
                }}>
                <Text style={styles.contentText2}>한국표준시 (KST)</Text>

                <Right height={16 * height_ratio} width={9 * width_ratio} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>단위 설정</Text>
            <TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8 * width_ratio,
                }}>
                <Text style={styles.contentText2}>kg</Text>

                <Right height={16 * height_ratio} width={9 * width_ratio} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>커스텀 운동 목록</Text>
            <TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8 * width_ratio,
                }}>
                <Right height={16 * height_ratio} width={9 * width_ratio} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>알림 설정</Text>
            <TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8 * width_ratio,
                }}>
                <Right height={16 * height_ratio} width={9 * width_ratio} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.subTitle}>기타 설정</Text>
        <View style={styles.gitaContainer}>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>고객센터</Text>
            <TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8 * width_ratio,
                }}>
                <Right height={16 * height_ratio} width={9 * width_ratio} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>이용약관</Text>
            <TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8 * width_ratio,
                }}>
                <Right height={16 * height_ratio} width={9 * width_ratio} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>개인정보 처리방침</Text>
            <TouchableOpacity>
              <View style={{flexDirection: 'row'}}>
                <Right height={16 * height_ratio} width={9 * width_ratio} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>오픈소스 라이선스</Text>
            <TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8 * width_ratio,
                }}>
                <Right height={16 * height_ratio} width={9 * width_ratio} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>앱 버전</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.contentText2}>1.0.0</Text>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>회원탈퇴</Text>
            <View style={{flexDirection: 'row'}}></View>
          </View>
        </View>
        <View style={{height: 90 * height_ratio}}></View>
      </ScrollView>
      <View style={styles.navigator}>
        <TouchableOpacity
          onPress={() => navigation.reset({routes: [{name: 'HomeScreen'}]})}>
          <Workout height={24 * height_ratio} width={24 * width_ratio} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('WorkoutRecord', {isCalendar: false})
          }>
          <History height={24 * height_ratio} width={24 * width_ratio} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Setting height={24 * height_ratio} width={24 * width_ratio} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MainSetting;

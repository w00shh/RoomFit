import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Switch,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {serverAxios} from '../../../utils/commonAxios';
import styles from './styles';
import {WithLocalSvg} from 'react-native-svg';
import Profile from '../../../assets/images/normalProfile.svg';
import Right from 'react-native-vector-icons/AntDesign';
import Setting from 'react-native-vector-icons/Ionicons';
import Board from 'react-native-vector-icons/MaterialCommunityIcons';
import Dumbbell from 'react-native-vector-icons/FontAwesome5';
import {AppContext} from '../../../contexts/AppProvider';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const MainSetting = ({navigation}) => {
  const appcontext = useContext(AppContext);
  const [isAssist, setIsAssist] = useState(true);
  const [isLock, setIsLock] = useState(false);
  const toggleSwitch = () => setIsAssist(previousState => !previousState);
  const toggleSwitch2 = () => setIsLock(previousState => !previousState);
  return (
    <SafeAreaView style={styles.pageContainer}>
      <ScrollView>
        <View style={styles.profileContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <WithLocalSvg
              width={64 * width_ratio}
              height={64 * height_ratio}
              asset={Profile}
            />
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => navigation.navigate('ProfileSetting')}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: '#242424',
                  marginLeft: 16 * width_ratio,
                }}>
                {appcontext.state.usernickname}
              </Text>
              <Right
                name="right"
                size={20}
                style={styles.rightIcon}
                color={'#242424'}></Right>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.logoutButton}>
              <Text style={{fontSize: 16, color: '#242424'}}>로그아웃</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.subTitle}>기기 설정</Text>
        <View style={styles.gigiContainer}>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>기기 연결</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.contentText2}>Roomfit 1</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('ConnectDevice')}>
                <Right
                  name="right"
                  size={18}
                  style={styles.rightIcon}
                  color={'#242424'}></Right>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.contentContainer2}>
            <Text style={styles.contentText}>스마트 세이프티</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: isAssist ? '#5252fa' : '#f5f5f5',
                  marginRight: 3 * width_ratio,
                }}>
                ON
              </Text>
              <Switch
                trackColor={{false: '#acacac', true: '#5252fa'}}
                thumbColor={'#fff'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isAssist}
                style={{
                  transform: [
                    {scaleX: 1.2 * height_ratio},
                    {scaleY: 1.2 * width_ratio},
                  ],
                }}
              />
            </View>
          </View>
          <Text style={styles.subcontentText}>
            급격한 변화, 장기간 움직임이 없거나 좌우 대칭이 심각하게 틀어진 경우
            하중을 자동으로 줄여줍니다.
          </Text>
          <View style={styles.contentContainer2}>
            <Text style={styles.contentText}>스마트 어시스트</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: isLock ? '#5252fa' : '#f5f5f5',
                  marginRight: 3 * width_ratio,
                }}>
                ON
              </Text>
              <Switch
                trackColor={{false: '#acacac', true: '#5252fa'}}
                thumbColor={'#fff'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch2}
                value={isLock}
                style={{
                  transform: [{scaleX: 1.2}, {scaleY: 1.2}],
                }}
              />
            </View>
          </View>
          <Text style={styles.subcontentText}>
            비위험상황이지만 힘이 부족하여 동작을 일시적으로 주저하게 되는 경우
            하중을 자동으로 줄여줍니다.
          </Text>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>세트간 휴식시간</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.contentText2}>30초</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('RestingTime', {title: '세트'});
                }}>
                <Right
                  name="right"
                  size={18}
                  style={styles.rightIcon}
                  color={'#242424'}></Right>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>동작간 휴식시간</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.contentText2}>30초</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('RestingTime', {title: '동작'});
                }}>
                <Right
                  name="right"
                  size={18}
                  style={styles.rightIcon}
                  color={'#242424'}></Right>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>절전 모드</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.contentText2}>5분</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('PowerSaving')}>
                <Right
                  name="right"
                  size={18}
                  style={styles.rightIcon}
                  color={'#242424'}></Right>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Text style={styles.subTitle}>앱 설정</Text>
        <View style={styles.appContainer}>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>언어 설정</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.contentText2}>한국어</Text>
              <TouchableOpacity>
                <Right
                  name="right"
                  size={18}
                  style={styles.rightIcon}
                  color={'#242424'}></Right>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>시간대 설정</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.contentText2}>한국표준시 (KST)</Text>
              <TouchableOpacity>
                <Right
                  name="right"
                  size={18}
                  style={styles.rightIcon}
                  color={'#242424'}></Right>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>단위 설정</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.contentText2}>kg</Text>
              <TouchableOpacity>
                <Right
                  name="right"
                  size={18}
                  style={styles.rightIcon}
                  color={'#242424'}></Right>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>커스텀 운동 목록</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity>
                <Right
                  name="right"
                  size={18}
                  style={styles.rightIcon}
                  color={'#242424'}></Right>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>알림 설정</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity>
                <Right
                  name="right"
                  size={18}
                  style={styles.rightIcon}
                  color={'#242424'}></Right>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Text style={styles.subTitle}>기타 설정</Text>
        <View style={styles.gitaContainer}>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>고객센터</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity>
                <Right
                  name="right"
                  size={18}
                  style={styles.rightIcon}
                  color={'#242424'}></Right>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>이용약관</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity>
                <Right
                  name="right"
                  size={18}
                  style={styles.rightIcon}
                  color={'#242424'}></Right>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>개인정보 처리방침</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity>
                <Right
                  name="right"
                  size={18}
                  style={styles.rightIcon}
                  color={'#242424'}></Right>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>오픈소스 라이선스</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity>
                <Right
                  name="right"
                  size={18}
                  style={styles.rightIcon}
                  color={'#242424'}></Right>
              </TouchableOpacity>
            </View>
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
          style={{marginLeft: 45 * width_ratio}}
          onPress={() => navigation.reset({routes: [{name: 'HomeScreen'}]})}>
          <Dumbbell name="dumbbell" size={20} color={'#dfdfdf'}></Dumbbell>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('WorkoutRecord', {isCalendar: false})
          }>
          <Board name="clipboard-check" size={20} color={'#dfdfdf'}></Board>
        </TouchableOpacity>
        <TouchableOpacity style={{marginRight: 45 * width_ratio}}>
          <Setting name="settings" size={20} color={'#fff'}></Setting>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MainSetting;

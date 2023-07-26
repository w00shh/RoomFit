import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  Modal,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  TextInput,
  Dimensions,
  Platform,
  useWindowDimensions,
  Animated,
} from 'react-native';

import {AppContext} from '../../../contexts/AppProvider';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import styles from './styles';
import {Battery} from '../../../components/battery';
import {Information} from '../../../components/Modal/information';
import {Switch} from '../../../components/toggle';
import BLEStore from '../../../redux/BLE/mobx_store';
import CustomButton_B from '../../../components/CustomButton_B';
import CustomButton_W from '../../../components/CustomButton_W';

import Right from '../../../assets/svg/buttons/single/arrow/right.svg';
import Check from '../../../assets/svg/buttons/active/check.svg';
import SLeft from '../../../assets/svg/buttons/single/left_small.svg';
import App from '../../../../App';

const width_ratio = Dimensions.get('window').width / 390;
const height_ratio = Dimensions.get('window').height / 844;

export const WorkoutSetting = ({navigation, route}) => {
  const appcontext = useContext(AppContext);
  const [pressSetting, setPressSetting] = useState(false);
  const [isAssist, setIsAssist] = useState(appcontext.state.smartAssist);
  const [isSafety, setIsSaftey] = useState(appcontext.state.smartSaftey);
  const [isLock, setIsLock] = useState(false);
  const toggleSwitch = () =>
    appcontext.actions.setSmartAssist(previousState => !previousState);
  const toggleSwitch2 = () =>
    appcontext.actions.setSmartSaftey(previousState => !previousState);
  const toggleSwitch3 = () => setIsLock(previousState => !previousState);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [temprestSet, setTempRestSet] = useState('');
  const [temprestMotion, setTempRestMotion] = useState('');
  const [restSet, setRestSet] = useState(appcontext.state.userSetTime);
  const [restMotion, setRestMotion] = useState(appcontext.state.userMotionTime);
  const battery = useAppSelector(state => state.ble.battery);

  const restTime = [
    {time: 10, selsected: false},
    {time: 20, selsected: false},
    {time: 30, selsected: false},
    {time: 40, selsected: false},
    {time: 50, selsected: false},
    {time: 60, selsected: false},
    {time: 70, selsected: false},
    {time: 80, selsected: false},
    {time: 90, selsected: false},
    {time: 100, selsected: false},
    {time: 110, selsected: false},
    {time: 120, selsected: false},
    {time: 130, selsected: false},
  ];

  useEffect(() => {
    console.log(BLEStore.animationSelection);
  }, []);

  const setRestTime = () => {
    appcontext.actions.setUserSetTime(temprestSet);
    setModalVisible2(false);
  };

  useEffect(() => {
    console.log(appcontext.state.userSetTime);
  }, [appcontext.state.userSetTime]);

  const setTempRestTime = time => {
    setTempRestSet(time);
  };

  const MotionTempRestTime = time => {
    setTempRestMotion(time);
  };

  const MotionRestTime = () => {
    appcontext.actions.setUserMotionTime(temprestMotion);
    setModalVisible3(false);
  };

  const calTime = time => {
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

  const formatTime = time => {
    if (time < 0) {
      return `00:00`;
    }
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
  };

  const endSetting = () => {
    // setIsPaused(false);
    // setPressSetting(false);
    // setRestTimer(restSet);
    navigation.push('WorkoutStart', {
      isQuickWorkout: route.params.isQuickWorkout,
      routine_id: route.params.routine_id,
      workout_id: route.params.workout_id,
      isAddMotion: route.params.isAddMotion,
      motionList: route.params.motionList,
      elapsedTime: route.params.elapsedTime,
      TUT: route.params.TUT,
      m_index: route.params.m_index,
      s_index: route.params.s_index,
      isPaused: route.params.isPaused,
      isPausedPage: route.params.isPausedPage,
      isModifyMotion: route.params.isModifyMotion,
      isResting: route.params.isResting,
      restTimer: route.params.restTimer,
    });
  };

  return (
    <View style={styles.subpageContainer}>
      <Modal visible={modalVisible2} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modeContainer}>
            <View style={styles.modeTitleContainer}>
              <Text style={styles.titleText}>세트간 휴식시간</Text>
            </View>
            <ScrollView
              style={{height: 500 * height_ratio}}
              showsVerticalScrollIndicator={false}>
              {restTime.map((value, key) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setTempRestTime(value.time)}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                      height: 56 * height_ratio,
                      backgroundColor:
                        value.time === temprestSet ? '#f5f5f5' : 'white',
                    }}>
                    <View style={styles.restContainer}>
                      <Text style={{fontSize: 14 * height_ratio}}>
                        {calTime(value.time)}
                      </Text>
                    </View>
                    <View style={styles.restChecker}>
                      {value.time === temprestSet && (
                        <Check
                          height={16 * height_ratio}
                          width={16 * width_ratio}
                        />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.modeButtonContainer}>
              <View>
                <CustomButton_W
                  width={171 * width_ratio}
                  content="취소"
                  disabled={false}
                  onPress={() => setModalVisible2(false)}></CustomButton_W>
              </View>
              <View>
                <CustomButton_B
                  width={171 * width_ratio}
                  content="선택 완료"
                  disabled={false}
                  onPress={() => setRestTime()}></CustomButton_B>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={modalVisible3} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modeContainer}>
            <View style={styles.modeTitleContainer}>
              <Text style={styles.titleText}>동작간 휴식시간</Text>
            </View>
            <ScrollView
              style={{height: 500 * height_ratio}}
              showsVerticalScrollIndicator={false}>
              {restTime.map((value, key) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => MotionTempRestTime(value.time)}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                      height: 56 * height_ratio,
                      backgroundColor:
                        value.time === temprestMotion ? '#f5f5f5' : 'white',
                    }}>
                    <View style={styles.restContainer}>
                      <Text style={{fontSize: 14 * height_ratio}}>
                        {calTime(value.time)}
                      </Text>
                    </View>
                    <View style={styles.restChecker}>
                      {value.time === temprestMotion && (
                        <Check
                          height={16 * height_ratio}
                          width={16 * width_ratio}
                        />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.modeButtonContainer}>
              <View>
                <CustomButton_W
                  width={171 * width_ratio}
                  content="취소"
                  disabled={false}
                  onPress={() => setModalVisible3(false)}></CustomButton_W>
              </View>
              <View>
                <CustomButton_B
                  width={171 * width_ratio}
                  content="선택 완료"
                  disabled={false}
                  onPress={() => MotionRestTime()}></CustomButton_B>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: 16 * height_ratio,
        }}>
        <Text style={styles.pauseTitle}>운동 설정</Text>
        <Battery battery={battery} />
      </View>

      <View style={styles.settings}>
        <View style={styles.settingContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4 * width_ratio,
            }}>
            <Text style={styles.settingText}>스마트 세이프티</Text>
            <Information />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8 * width_ratio,
            }}>
            <Text
              style={{
                color: appcontext.state.smartSaftey ? '#5252fa' : '#fff',
              }}>
              ON
            </Text>
            <Switch on={appcontext.state.smartSaftey} onPress={toggleSwitch2} />
          </View>
        </View>
      </View>
      <View style={styles.settings}>
        <View style={styles.settingContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4 * width_ratio,
            }}>
            <Text style={styles.settingText}>스마트 어시스트</Text>
            <Information />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8 * width_ratio,
            }}>
            <Text
              style={{
                color: appcontext.state.smartAssist ? '#5252fa' : '#fff',
              }}>
              ON
            </Text>
            <Switch on={appcontext.state.smartAssist} onPress={toggleSwitch} />
          </View>
        </View>
      </View>
      <View style={styles.settings}>
        <View style={styles.settingContainer}>
          <Text style={styles.settingText}>화면잠금</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8 * width_ratio,
            }}>
            <Text
              style={{
                fontSize: 14 * height_ratio,
                color: isLock ? '#5252fa' : '#fff',
              }}>
              ON
            </Text>
            <Switch on={isLock} onPress={toggleSwitch3} />
          </View>
        </View>
      </View>
      <View style={styles.settings}>
        <View style={styles.settingContainer}>
          <Text style={styles.settingText}>세트간 휴식시간</Text>
          <TouchableOpacity
            onPress={() => setModalVisible2(true)}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 16 * height_ratio, color: '#242424'}}>
              {calTime(appcontext.state.userSetTime)}
            </Text>
            <Right height={24 * height_ratio} width={24 * width_ratio} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.settings}>
        <View style={styles.settingContainer}>
          <Text style={styles.settingText}>동작간 휴식시간</Text>

          <TouchableOpacity
            onPress={() => setModalVisible3(true)}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 16 * height_ratio, color: '#242424'}}>
              {calTime(appcontext.state.userMotionTime)}
            </Text>
            <Right height={24 * height_ratio} width={24 * width_ratio} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity style={styles.CButton3} onPress={() => endSetting()}>
          <SLeft height={16 * height_ratio} width={16 * width_ratio} />
          <Text style={styles.CText3}>
            휴식중 {formatTime(route.params.elapsedTime)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

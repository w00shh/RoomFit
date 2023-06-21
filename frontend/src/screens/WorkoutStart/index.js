import React, {useState, useEffect, Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Modal,
  Switch,
  Image,
  TouchableOpacity,
  TurboModuleRegistry,
} from 'react-native';
import CustomButton_W from '../../components/CustomButton_W';
import Plus from 'react-native-vector-icons/AntDesign';
import Minus from 'react-native-vector-icons/AntDesign';
import Pause from 'react-native-vector-icons/AntDesign';
import Body from 'react-native-vector-icons/Ionicons';
import Timer from 'react-native-vector-icons/MaterialCommunityIcons';
import Lightning from 'react-native-vector-icons/MaterialCommunityIcons';
import Fire from 'react-native-vector-icons/MaterialCommunityIcons';
import Start from 'react-native-vector-icons/AntDesign';
import Square from 'react-native-vector-icons/FontAwesome';
import TutTimer from 'react-native-vector-icons/MaterialCommunityIcons';
import Setting from 'react-native-vector-icons/Ionicons';
import Board from 'react-native-vector-icons/MaterialCommunityIcons';
import Dumbbell from 'react-native-vector-icons/FontAwesome5';
import Left from 'react-native-vector-icons/Entypo';
import Right from 'react-native-vector-icons/AntDesign';
import Swiper from 'react-native-swiper';
import styles from './styles';
import OnOff from '../../components/Switch';

export const WorkoutStart = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [TUT, setTUT] = useState(0);
  const [isTut, setIsTus] = useState(true);
  const [time, setTime] = useState('');
  const [pressSetting, setPressSetting] = useState(false);
  const [isAssist, setIsAssist] = useState(true);
  const [isLock, setIsLock] = useState(false);
  const [restSet, setRestSet] = useState(30);
  const [restMotion, setRestMotion] = useState(60);
  const toggleSwitch = () => setIsAssist(previousState => !previousState);
  const toggleSwitch2 = () => setIsLock(previousState => !previousState);

  const pausedModal = () => {
    setIsPaused(!isPaused);
    setTime(formatTime(elapsedTime));
    console.log(time);
  };

  const calTime = time => {
    if (time < 60) {
      return `${time}초`;
    } else {
      const min = Math.floor(time / 60);
      const sec = time % 60;

      return `${min}분 ${sec}초`;
    }
  };

  useEffect(() => {
    console.log(isPaused);
    let intervalId;
    let intervalId2;

    if (!isPaused) {
      intervalId = setInterval(() => {
        setElapsedTime(prevElapsedTime => prevElapsedTime + 1);
      }, 1000); // 1초마다 증가
    }

    if (isTut) {
      intervalId2 = setInterval(() => {
        setTUT(pervTuttime => pervTuttime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
      clearInterval(intervalId2);
    };
  }, [isPaused, isTut]);

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      {!isPaused && !pressSetting && (
        <View>
          <View style={{alignItems: 'center', height: 440}}>
            <View>
              <Text style={styles.timer}>{formatTime(elapsedTime)}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TutTimer
                  name="timer-cog"
                  size={18}
                  color={'#9f76e1'}
                  style={{marginRight: 10}}></TutTimer>
                <Text style={styles.tutText}>{formatTime(TUT)}</Text>
              </View>
            </View>
          </View>
          <Image
            source={require('../../assets/images/devider.png')}
            style={styles.devider}></Image>

          <View style={{alignItems: 'center'}}>
            <Text style={styles.motionName}>로우 케이블 크로스오버</Text>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                <Text style={styles.statusText}>1</Text>
                <Text style={styles.targetText}>/4set</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  marginHorizontal: 16,
                }}>
                <Text style={styles.statusText}>15</Text>
                <Text style={styles.targetText}> kg</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                <Text style={styles.statusText}>1</Text>
                <Text style={styles.targetText}>/18회</Text>
              </View>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.CButton}>
              <Minus name="minus" size={16} color="#808080"></Minus>
            </TouchableOpacity>
            <TouchableOpacity style={styles.CButton}>
              <Plus name="plus" size={16} color="#808080"></Plus>
            </TouchableOpacity>
            <TouchableOpacity style={styles.CButton2}>
              <Text style={styles.CText}>세트완료</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.navigator}>
            <TouchableOpacity onPress={pausedModal} style={{marginLeft: 45}}>
              <Dumbbell name="dumbbell" size={20} color={'#fff'}></Dumbbell>
            </TouchableOpacity>
            <TouchableOpacity onPress={pausedModal}>
              <Pause name="pausecircle" size={20} color={'#fff'}></Pause>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setPressSetting(true)}
              style={{marginRight: 45}}>
              <Setting name="settings" size={20} color={'#fff'}></Setting>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {isPaused && (
        <View>
          <View>
            <Text style={styles.pauseTitle}>일시정지</Text>
          </View>
          <View style={{marginLeft: 16, marginTop: 24}}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.grayCircle}>
                <Body name="body" color="#3aa84c" size={23}></Body>
              </View>

              <View style={{marginLeft: 8}}>
                <Text style={styles.pauseMotionTitle}>
                  로우 케이블 크로스오버
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                    }}>
                    <Text style={styles.statusText2}>1</Text>
                    <Text style={styles.targetText2}>/4set</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                      marginHorizontal: 16,
                    }}>
                    <Text style={styles.statusText2}>15</Text>
                    <Text style={styles.targetText2}> kg</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                    }}>
                    <Text style={styles.statusText2}>1</Text>
                    <Text style={styles.targetText2}>/18회</Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                justifyContent: 'flex-start',
              }}>
              <View style={{flexDirection: 'row', width: 120}}>
                <View style={styles.grayCircle}>
                  <Timer name="timer" color="#41b1ca" size={23}></Timer>
                </View>
                <View style={{marginLeft: 8}}>
                  <Text style={styles.puaseSubtitle}>전체 운동시간</Text>
                  <Text style={styles.puaseSubcontent}>{time}</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.RgrayCircle}>
                  <Timer name="timer" color="#41b1ca" size={23}></Timer>
                </View>

                <View style={{marginLeft: 8}}>
                  <Text style={styles.puaseSubtitle}>유효 수행시간</Text>
                  <Text style={styles.puaseSubcontent}>{time}</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                justifyContent: 'flex-start',
              }}>
              <View style={{flexDirection: 'row', width: 120}}>
                <View style={styles.grayCircle}>
                  <Lightning
                    name="lightning-bolt"
                    color="#fbcb22"
                    size={23}></Lightning>
                </View>
                <View style={{marginLeft: 8}}>
                  <Text style={styles.puaseSubtitle}>볼륨</Text>
                  <Text style={styles.puaseSubcontent}>{time}</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.RgrayCircle}>
                  <Fire name="fire" color="#fc7d36" size={23}></Fire>
                </View>

                <View style={{marginLeft: 8}}>
                  <Text style={styles.puaseSubtitle}>칼로리</Text>
                  <Text style={styles.puaseSubcontent}>{time}</Text>
                </View>
              </View>
            </View>
          </View>
          <View></View>
          <Image
            source={require('../../assets/images/devider.png')}
            style={styles.devider2}></Image>

          <ScrollView style={{height: 320}}></ScrollView>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity style={styles.endButton}>
              <Square
                name="square"
                color={'#fff'}
                size={15}
                style={{marginRight: 8, marginTop: 2}}></Square>
              <Text style={styles.CText3}>운동 종료</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.restartButton}
              onPress={() => setIsPaused(!isPaused)}>
              <Start
                name="caretright"
                color={'white'}
                size={17}
                style={{marginRight: 8, marginTop: 2}}></Start>
              <Text style={styles.CText3}>운동 다시 시작</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {!isPaused && pressSetting && (
        <View style={{alignSelf: 'flex-start'}}>
          <Text style={styles.pauseTitle}>운동 설정</Text>
          <View style={styles.settings}>
            <View style={styles.settingContainer}>
              <Text style={styles.settingText}>스마트 어시스트</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    color: isAssist ? '#5252fa' : '#fff',
                    marginRight: 3,
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
                    transform: [{scaleX: 1.2}, {scaleY: 1.2}],
                    marginRight: 16,
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.settings}>
            <View style={styles.settingContainer}>
              <Text style={styles.settingText}>화면잠금</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    color: isLock ? '#5252fa' : '#fff',
                    marginRight: 3,
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
                    marginRight: 16,
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.settings}>
            <View style={styles.settingContainer}>
              <Text style={styles.settingText}>세트간 휴식시간</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text>{calTime(restSet)}</Text>
                <TouchableOpacity>
                  <Right
                    name="right"
                    size={20}
                    color="#242424"
                    style={{marginRight: 16, marginLeft: 4}}></Right>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.settings}>
            <View style={styles.settingContainer}>
              <Text style={styles.settingText}>동작간 휴식시간</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text>{calTime(restSet)}</Text>
                <TouchableOpacity>
                  <Right
                    name="right"
                    size={20}
                    color="#242424"
                    style={{marginRight: 16, marginLeft: 4}}></Right>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <ScrollView></ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={styles.CButton3}
              onPress={() => setPressSetting(false)}>
              <Left
                name="chevron-left"
                size={15}
                color="#fff"
                style={{marginRight: 7, marginTop: 3}}></Left>
              <Text style={styles.CText3}>
                휴식중 {formatTime(elapsedTime)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <StatusBar style={{marginTop: 15}} />
    </SafeAreaView>
  );
};

export default WorkoutStart;

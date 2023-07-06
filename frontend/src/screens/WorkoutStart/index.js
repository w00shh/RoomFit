import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  Modal,
  Switch,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Dimensions,
} from 'react-native';
import CustomButton_W from '../../components/CustomButton_W';
import Check from 'react-native-vector-icons/AntDesign';
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
import CustomButton_B from '../../components/CustomButton_B';
import WorkoutTitle from '../../components/WorkoutTitle';
import AddMotion from '../AddMotion';
import WorkoutItem from '../../components/WorkoutItem';
import {serverAxios} from '../../utils/commonAxios';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {AppContext} from '../../contexts/AppProvider';

const width_ratio = Dimensions.get('window').width / 390;
const height_ratio = Dimensions.get('window').height / 844;

export const WorkoutStart = ({navigation, route}) => {
  const appcontext = useContext(AppContext);
  const [isQuickWorkout, setisQuickWorkout] = useState(
    route.params.isQuickWorkout,
  );
  const [saveAddedMotionToRoutine, setSaveAddedMotionToRoutine] =
    useState(false);
  const [isSaveWorkoutDisabled, setIsSaveWorkoutDisabled] = useState(true);

  // motionList 관련 변수 :
  const [motionList, setMotionList] = useState(route.params.motionList);
  const [m_index, setMIndex] = useState(route.params.m_index);
  const [s_index, setSIndex] = useState(route.params.s_index);

  //workout & record 관련 변수
  const [workoutId, setWorkoutId] = useState(route.params.workout_id);
  const [recordId, setRecordId] = useState(
    route.params.record_id ? route.params.record_id : null,
  );
  const [workoutTitle, setWorkoutTitle] = useState('');
  const [workoutMemo, setWorkoutMemo] = useState('');
  const [workoutDone, setWorkoutDone] = useState(false);
  const [workoutDoneModal, setWorkoutDoneModal] = useState(false);
  const [routineDoneModal, setRoutineDoneModal] = useState(false);

  //time 관련 변수 :
  const [TUT, setTUT] = useState(route.params.TUT);
  const [isTut, setIsTus] = useState(true);
  const [time, setTime] = useState('');
  const [elapsedTime, setElapsedTime] = useState(route.params.elapsedTime);

  //pause 화면 관련 변수 :
  const [isPausedPage, setIsPausedPage] = useState(route.params.isPausedPage);
  const [isPaused, setIsPaused] = useState(route.params.isPaused);
  const [workoutDoneModal2, setWorkoutDoneModal2] = useState(false);
  const [workoutMemoModal, setWorkoutMemoModal] = useState(false);

  //setting 화면 관련 변수 :
  const [pressSetting, setPressSetting] = useState(false);
  const [isAssist, setIsAssist] = useState(true);
  const [isLock, setIsLock] = useState(false);
  const toggleSwitch = () => setIsAssist(previousState => !previousState);
  const toggleSwitch2 = () => setIsLock(previousState => !previousState);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [temprestSet, setTempRestSet] = useState('');
  const [temprestMotion, setTempRestMotion] = useState('');
  const [restSet, setRestSet] = useState(30);
  const [restMotion, setRestMotion] = useState(60);

  // resting 관련 변수
  const [isResting, setIsResting] = useState(false);
  const [isRestingModal, setIsRestingModal] = useState(false);
  const [isStopResting, setIsStopResting] = useState(false);
  const [isMotionDone, setIsMotionDone] = useState(false);
  const [restTimer, setRestTimer] = useState(restSet);
  const [nextMotionModal, setNextMotionModal] = useState(false);

  // motionList 수정 관련 변수 :
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isExercisingDisabled, setIsExercisingDisabled] = useState(false);

  const [isModifyMotion, setIsModifyMotion] = useState(
    route.params.isModifyMotion,
  );
  const [selectedMode, setSelectedMode] = useState({
    modeName: '기본',
    modeDescription: '설명',
  });

  useEffect(() => {
    if (motionList.length === 0) {
      setIsExercisingDisabled(true);
    } else {
      setIsExercisingDisabled(false);
    }
  }, [motionList]);

  useEffect(() => {
    if (route.params.motionList) {
      setMotionList(route.params.motionList);
    }

    if (route.params.displaySelected) {
      if (route.params.isAddedMotionDone) {
        setMotionList(currentMotionList => [
          ...currentMotionList,
          {
            isMotionDone: false,
            isMotionDoing: true,
            isFavorite: route.params.displaySelected[0].isFavorite,
            motion_id: route.params.displaySelected[0].motion_id,
            motionName: route.params.displaySelected[0].motionName,
            imageUrl: route.params.displaySelected[0].imageUrl,
            sets: [
              {weight: 0, reps: 1, mode: '기본', isDoing: true, isDone: false},
            ],
          },
        ]);
      } else {
        setMotionList(currentMotionList => [
          ...currentMotionList,
          {
            isMotionDone: false,
            isMotionDoing: false,
            isFavorite: route.params.displaySelected[0].isFavorite,
            motion_id: route.params.displaySelected[0].motion_id,
            motionName: route.params.displaySelected[0].motionName,
            imageUrl: route.params.displaySelected[0].imageUrl,
            sets: [
              {weight: 0, reps: 1, mode: '기본', isDoing: false, isDone: false},
            ],
          },
        ]);
      }
      for (let i = 1; i < route.params.displaySelected.length; i++) {
        setMotionList(currentMotionList => [
          ...currentMotionList,
          {
            isMotionDone: false,
            isMotionDoing: false,
            isFavorite: route.params.displaySelected[i].isFavorite,
            motion_id: route.params.displaySelected[i].motion_id,
            motionName: route.params.displaySelected[i].motionName,
            imageUrl: route.params.displaySelected[i].imageUrl,
            sets: [
              {weight: 0, reps: 1, mode: '기본', isDoing: false, isDone: false},
            ],
          },
        ]);
      }
    } else {
      /* WorkoutReady 또는 Routine Detail에서 최초에 진입했을 때 */
      let updatedMotionList = [...motionList];
      console.log('route.params.isAddMotion: ', route.params.AddMotion);
      if (!route.params.isAddMotion) {
        updatedMotionList[m_index].isMotionDoing = true;
        updatedMotionList[m_index].sets[0].isDoing = true;
        setMotionList(updatedMotionList);
      }
      getRecordId(0);
    }
  }, []);

  useEffect(() => {
    if (workoutTitle.length > 0) {
      setIsSaveWorkoutDisabled(false);
    } else {
      setIsSaveWorkoutDisabled(true);
    }
  }, [workoutTitle]);

  const modifyingMotion = () => {
    setIsPaused(true);
    setIsPausedPage(false);
    setIsModifyMotion(true);
  };

  const saveModifying = () => {
    setIsPaused(false);
    setIsModifyMotion(false);
  };

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

  const modeList = [
    {
      modeName: '기본',
      modeDescription: '설명',
    },
    {
      modeName: '고무밴드',
      modeDescription: '설명',
    },
    {
      modeName: '모드1',
      modeDescription: '설명',
    },
    {
      modeName: '모드2',
      modeDescription: '설명',
    },
    {
      modeName: '모드3',
      modeDescription: '설명',
    },
  ];

  const setTempRestTime = time => {
    setTempRestSet(time);
    console.log(time);
  };

  const setRestTime = () => {
    setRestSet(temprestSet);
    setModalVisible2(false);
  };

  const MotionTempRestTime = time => {
    setTempRestMotion(time);
    console.log(time);
  };

  const MotionRestTime = () => {
    setRestMotion(temprestMotion);
    setModalVisible3(false);
  };

  const pausedModal = () => {
    setIsPaused(!isPaused);
    setIsPausedPage(!isPausedPage);
    setTime(formatTime(elapsedTime));
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

  const endResting = () => {
    setIsResting(false);
    setRestTimer(restSet);
    setIsStopResting(false);
  };

  const writeMemo = async () => {
    if (workoutDone) {
      if (isQuickWorkout) {
        setWorkoutDoneModal(false);
      } else {
        if (saveAddedMotionToRoutine) {
          const body = {
            routine_id: route.params.routine_id,
            motion_list: motionList,
          };

          await serverAxios
            .post('/routine/save', body)
            .then(res => {
              console.log(res.data);
            })
            .catch(e => {
              console.log(e);
            });
        }
        setRoutineDoneModal(false);
      }
    } else setWorkoutDoneModal2(false);

    setWorkoutMemoModal(true);
  };

  const getRecordId = async m_index => {
    const body = {
      workout_id: workoutId,
      motion_id: motionList[m_index].motion_id,
    };
    await serverAxios
      .post('/workout/record', body)
      .then(res => {
        console.log(res.data.record_id);
        setRecordId(res.data.record_id);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const setCompletePost = async () => {
    console.log([
      recordId,
      s_index + 1,
      motionList[m_index].sets[s_index].weight,
      motionList[m_index].sets[s_index].reps,
      motionList[m_index].sets[s_index].mode,
    ]);
    const body = {
      record_id: recordId,
      set_no: s_index + 1,
      weight: motionList[m_index].sets[s_index].weight,
      reps: motionList[m_index].sets[s_index].reps,
      mode: motionList[m_index].sets[s_index].mode,
    };
    console.log(body);
    await serverAxios
      .post('/workout/set', body)
      .then(res => {})
      .catch(e => {
        console.log(e);
      });
  };

  const saveWorkoutRecord = async () => {
    console.log(formatTime(TUT));
    const body = {
      workout_id: workoutId,
      tut: formatTime(TUT),
      title: workoutTitle,
      memo: workoutMemo,
    };
    await serverAxios
      .put('/workout/done', body)
      .then(res => {})
      .catch(e => {
        console.log(e);
      });
  };

  function Item({mode}) {
    return (
      <TouchableOpacity
        onPress={() => {
          handleModeItemPress(mode);
        }}>
        <View
          style={{
            flexDirection: 'column',
            height: 72 * height_ratio,
            padding: 12,
            margin: 4,
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor:
              mode.modeName === selectedMode.modeName ? '#f5f5f5' : 'white',
          }}>
          <Text style={styles.modeText}>{mode.modeName}</Text>
          <Text style={styles.descriptionText}>{mode.modeDescription}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  useEffect(() => {
    let intervalId;
    let intervalId2;
    let intervalId3;

    if (!isPaused && !workoutDone) {
      intervalId = setInterval(() => {
        setElapsedTime(prevElapsedTime => prevElapsedTime + 1);
      }, 1000); // 1초마다 증가
    }

    if (isTut && !workoutDone) {
      intervalId2 = setInterval(() => {
        setTUT(prevTuttime => prevTuttime + 1);
      }, 1000);
    }

    if (isResting && !isStopResting) {
      intervalId3 = setInterval(() => {
        setRestTimer(prevrestTime => prevrestTime - 1);
        if (restTimer <= 0) {
          setNextMotionModal(true);
          setIsResting(false);
          setIsRestingModal(false);
          setRestTimer(restSet);
        }
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
      clearInterval(intervalId2);
      clearInterval(intervalId3);
    };
  }, [isPaused, isTut, isResting, restTimer, isStopResting, workoutDone]);

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

  const handleModeItemPress = mode => {
    setSelectedMode(mode);
  };

  const handleCancelPress = () => {
    setIsModalVisible(false);
  };

  const handleSelectPress = () => {
    updatedMotionList = [...motionList];
    updatedMotionList[appcontext.state.targetmotionindex].sets[
      appcontext.state.targetsetindex
    ].mode = selectedMode.modeName;
    setMotionList(updatedMotionList);

    setIsModalVisible(false);
  };

  const setComplete = () => {
    setCompletePost();
    setIsMotionDone(false);
    let updatedMotionList = [...motionList];
    updatedMotionList[m_index].sets[s_index].isDone = true;
    setMotionList(updatedMotionList);
    if (s_index + 1 < motionList[m_index].sets.length) {
      //set 종료시
      setIsResting(true);
      setIsRestingModal(true);
      updatedMotionList = [...motionList];
      updatedMotionList[m_index].sets[s_index].isDoing = false;
      setMotionList(updatedMotionList);
    } else if (
      s_index + 1 === motionList[m_index].sets.length &&
      motionList[m_index + 1]
    ) {
      // 동작 종료시
      setIsResting(true);
      setIsRestingModal(true);
      setIsMotionDone(true);
      updatedMotionList = [...motionList];
      updatedMotionList[m_index].isMotionDone = true;
      setMotionList(updatedMotionList);
      updatedMotionList = [...motionList];
      updatedMotionList[m_index].isMotionDoing = false;
      setMotionList(updatedMotionList);
      updatedMotionList = [...motionList];
      updatedMotionList[m_index].sets[s_index].isDoing = false;
      setMotionList(updatedMotionList);

      setRestTimer(restMotion);
    } else {
      // 운동 종료시
      updatedMotionList = [...motionList];
      updatedMotionList[m_index].isMotionDone = true;
      setMotionList(updatedMotionList);
      updatedMotionList = [...motionList];
      updatedMotionList[m_index].isMotionDoing = false;
      updatedMotionList = [...motionList];
      updatedMotionList[m_index].sets[s_index].isDoing = false;
      setMotionList(updatedMotionList);
      setMotionList(updatedMotionList);
      setWorkoutDone(true);
      if (isQuickWorkout) {
        setWorkoutDoneModal(true);
      } else {
        setRoutineDoneModal(true);
      }
      setIsResting(true);
    }
  };

  const goNextMotion = () => {
    setIsResting(false);
    setIsRestingModal(false);
    setRestTimer(restSet);
    setIsStopResting(false);
    if (s_index + 1 < motionList[m_index].sets.length) {
      setSIndex(s_index + 1);
      let updatedMotionList = [...motionList];
      updatedMotionList[m_index].sets[s_index + 1].isDoing = true;
      setMotionList(updatedMotionList);
    } else if (
      s_index + 1 === motionList[m_index].sets.length &&
      motionList[m_index + 1]
    ) {
      getRecordId(m_index + 1);
      setMIndex(m_index + 1);
      setSIndex(0);
      let updatedMotionList = [...motionList];
      updatedMotionList[m_index + 1].isMotionDoing = true;
      setMotionList(updatedMotionList);
      updatedMotionList = [...motionList];
      updatedMotionList[m_index + 1].sets[0].isDoing = true;
      setMotionList(updatedMotionList);
      setRestTimer(restMotion);
    }
  };

  const endSetting = () => {
    setPressSetting(false);
    setRestTimer(restSet);
  };
  return (
    <SafeAreaView style={styles.pageContainer}>
      {!isPausedPage && !pressSetting && !isModifyMotion && (
        <View>
          <Modal
            visible={isRestingModal}
            transparent={true}
            animationType="fade">
            <View style={styles.modalContainer2}>
              <View style={styles.restingContainer}>
                <Text style={styles.restingTitle}>
                  {isMotionDone ? '동작간 휴식' : '세트간 휴식'}
                </Text>
                <Text style={styles.restingTimer}>{formatTime(restTimer)}</Text>
                <View
                  style={{flexDirection: 'row', marginTop: 16 * height_ratio}}>
                  <TouchableOpacity
                    onPress={() => setRestTimer(restTimer - 10)}
                    style={{
                      marginRight: 25 * width_ratio,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Minus name="minus" size={18} color="#808080"></Minus>
                    <Text style={styles.plusminus}> 10초</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setRestTimer(restTimer + 10)}
                    style={{
                      marginLeft: 25 * width_ratio,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Plus name="plus" size={18} color="#808080"></Plus>
                    <Text style={styles.plusminus}> 10초</Text>
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{marginRight: 5 * width_ratio}}>
                    <CustomButton_W
                      width={126 * width_ratio}
                      onPress={() => {
                        setIsRestingModal(false);
                      }}
                      content="창 닫기"></CustomButton_W>
                  </View>
                  <View style={{marginLeft: 5 * width_ratio}}>
                    <CustomButton_B
                      width={126 * width_ratio}
                      onPress={() => goNextMotion()}
                      content="바로 시작"></CustomButton_B>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
          <Modal
            visible={nextMotionModal}
            transparent={true}
            animationType="fade">
            <View style={styles.modalContainer2}>
              <View style={styles.restingContainer}>
                <Text style={styles.restingTitle}>
                  {isMotionDone ? '동작간 휴식' : '세트간 휴식'}
                </Text>
                <Text style={styles.restingTimer}>{formatTime(0)}</Text>
                <View
                  style={{flexDirection: 'row', marginTop: 16 * height_ratio}}>
                  <Text style={{color: '#242424'}}>
                    세트간 휴식시간이 끝났습니다.
                  </Text>
                </View>
                <View
                  style={{flexDirection: 'row', marginTop: 15 * height_ratio}}>
                  <View>
                    <CustomButton_B
                      width={264 * width_ratio}
                      onPress={() => {
                        goNextMotion();
                        setNextMotionModal(false);
                      }}
                      content="다음 동작 시작"></CustomButton_B>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
          <Modal
            visible={workoutDoneModal}
            transparent={true}
            animationType="fade">
            <View style={styles.modalContainer2}>
              <View style={styles.endingContainer}>
                <Text style={styles.restingTitle}>운동 수행 완료</Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#242424',
                    marginTop: 12 * height_ratio,
                  }}>
                  다른 동작을 추가 하시겠습니까?
                </Text>
                <View
                  style={{flexDirection: 'row', marginTop: 5 * height_ratio}}>
                  <View style={{marginRight: 5 * width_ratio}}>
                    <CustomButton_W
                      width={126 * width_ratio}
                      onPress={() => {
                        setWorkoutDoneModal(false);
                        navigation.push('AddMotion', {
                          isQuickWorkout: isQuickWorkout,
                          workout_id: route.params.workout_id,
                          record_id: recordId,
                          isRoutine: false,
                          isExercising: true,
                          isAddedMotionDone: true,
                          motionList: motionList,
                          elapsedTime: elapsedTime,
                          TUT: TUT,
                          m_index: m_index + 1,
                          s_index: 0,
                        });
                      }}
                      content="동작 추가"></CustomButton_W>
                  </View>
                  <View style={{marginLeft: 5 * width_ratio}}>
                    <CustomButton_B
                      width={126}
                      onPress={() => writeMemo()}
                      content="여기서 종료"></CustomButton_B>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
          <Modal
            visible={routineDoneModal}
            transparent={true}
            animationType="fade">
            <View style={styles.modalContainer2}>
              <View style={styles.endingContainer2}>
                <Text style={styles.restingTitle}>루틴 수행 완료</Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#242424',
                    marginTop: 12 * height_ratio,
                  }}>
                  루틴을 모두 수행했습니다.
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#242424',
                    marginTop: 12 * height_ratio,
                  }}>
                  다른 동작을 추가하시거나, 운동을 완료해주세요.
                </Text>

                <View style={{alignSelf: 'stretch', marginVertical: 0}}>
                  <CustomButton_W
                    onPress={() => {
                      setRoutineDoneModal(false);
                      navigation.push('AddMotion', {
                        isQuickWorkout: isQuickWorkout,
                        workout_id: route.params.workout_id,
                        record_id: recordId,
                        routine_id: route.params.routine_id,
                        isRoutine: false,
                        isExercising: true,
                        isAddedMotionDone: true,
                        motionList: motionList,
                        elapsedTime: elapsedTime,
                        TUT: TUT,
                        m_index: m_index + 1,
                        s_index: 0,
                      });
                    }}
                    content="동작 추가"></CustomButton_W>
                </View>
                <BouncyCheckbox
                  size={24}
                  fillColor="#5252fa"
                  unfillColor="#FFFFFF"
                  textComponent={
                    <Text
                      style={{
                        marginHorizontal: 8 * width_ratio,
                        fontSize: 14,
                        color: '#242424',
                      }}>
                      추가하는 동작을 내 루틴에 추가하기
                    </Text>
                  }
                  iconStyle={{borderColor: '#5252fa'}}
                  innerIconStyle={{borderWidth: 2}}
                  isChecked={saveAddedMotionToRoutine}
                  onPress={() => {
                    setSaveAddedMotionToRoutine(!saveAddedMotionToRoutine);
                  }}
                />
                <View style={{alignSelf: 'stretch'}}>
                  <CustomButton_B
                    marginVertical={0}
                    onPress={() => writeMemo()}
                    content="운동 완료"></CustomButton_B>
                </View>
              </View>
            </View>
          </Modal>
          <Modal
            visible={workoutMemoModal}
            transparent={true}
            animationType="fade">
            <View style={styles.modalContainer2}>
              <View style={styles.memoContainer}>
                <Text style={styles.restingTitle}>
                  운동 기록의 이름을 입력해주세요
                </Text>
                <TextInput
                  style={styles.titleInput}
                  onChangeText={text => setWorkoutTitle(text)}
                  value={workoutTitle}
                  placeholder="운동 기록 이름"></TextInput>
                <TextInput
                  style={styles.memoInput}
                  onChangeText={text => setWorkoutMemo(text)}
                  value={workoutMemo}
                  placeholder="추가 메모 남기기 (선택)"></TextInput>
                <View
                  style={{flexDirection: 'row', marginTop: 5 * height_ratio}}>
                  <CustomButton_B
                    width={264 * width_ratio}
                    disabled={isSaveWorkoutDisabled}
                    onPress={() => {
                      navigation.reset({routes: [{name: 'HomeScreen'}]});
                      saveWorkoutRecord();
                    }}
                    content="확인"
                    marginVertical={12 * height_ratio}></CustomButton_B>
                </View>
              </View>
            </View>
          </Modal>
          <View style={{alignItems: 'center', height: 440 * height_ratio}}>
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
                  style={{marginRight: 10 * width_ratio}}></TutTimer>
                <Text style={styles.tutText}>{formatTime(TUT)}</Text>
              </View>
            </View>
          </View>
          <Image
            source={require('../../assets/images/devider.png')}
            style={styles.devider}></Image>

          <View style={{alignItems: 'center'}}>
            <Text style={styles.motionName}>
              {motionList[m_index].motionName}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                <Text style={styles.statusText}>{s_index + 1}</Text>
                <Text style={styles.targetText}>
                  /{motionList[m_index].sets.length}set
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  marginHorizontal: 16 * width_ratio,
                }}>
                <Text style={styles.statusText}>
                  {motionList[m_index].sets[s_index].weight}
                </Text>
                <Text style={styles.targetText}> kg</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                <Text style={styles.statusText}>1</Text>
                <Text style={styles.targetText}>
                  /{motionList[m_index].sets[s_index].reps}회
                </Text>
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                if (motionList[m_index].sets[s_index].weight > 0) {
                  const updatedMotionList = [...motionList];
                  updatedMotionList[m_index].sets[s_index].weight -= 1;
                  setMotionList(updatedMotionList);
                }
              }}
              style={styles.CButton}>
              <Minus name="minus" size={16} color="#808080"></Minus>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (motionList[m_index].sets[s_index].weight < 200) {
                  const updatedMotionList = [...motionList];
                  updatedMotionList[m_index].sets[s_index].weight += 1;
                  setMotionList(updatedMotionList);
                }
              }}
              style={styles.CButton}>
              <Plus name="plus" size={16} color="#808080"></Plus>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                isResting ? setIsRestingModal(true) : setComplete();
              }}
              style={styles.CButton2}>
              <Text style={styles.CText}>
                {isResting ? formatTime(restTimer) : '세트완료'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.navigator}>
            <TouchableOpacity
              onPress={modifyingMotion}
              style={{marginLeft: 45 * width_ratio}}>
              <Dumbbell name="dumbbell" size={20} color={'#fff'}></Dumbbell>
            </TouchableOpacity>
            <TouchableOpacity onPress={pausedModal}>
              <Pause name="pausecircle" size={20} color={'#fff'}></Pause>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setPressSetting(true)}
              style={{marginRight: 45 * width_ratio}}>
              <Setting name="settings" size={20} color={'#fff'}></Setting>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {isPausedPage && (
        <View>
          <Modal
            visible={workoutDoneModal2}
            transparent={true}
            animationType="fade">
            <View style={styles.modalContainer2}>
              <View style={styles.endingContainer}>
                <Text style={styles.restingTitle}>운동 종료</Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#242424',
                    marginTop: 12 * height_ratio,
                  }}>
                  운동을 종료하시겠습니까?
                </Text>
                <View
                  style={{flexDirection: 'row', marginTop: 5 * height_ratio}}>
                  <View style={{marginRight: 5 * width_ratio}}>
                    <CustomButton_W
                      width={126 * width_ratio}
                      onPress={() => setWorkoutDoneModal2(false)}
                      content="취소"></CustomButton_W>
                  </View>
                  <View style={{marginLeft: 5 * width_ratio}}>
                    <CustomButton_B
                      width={126 * width_ratio}
                      onPress={() => writeMemo()}
                      content="종료"></CustomButton_B>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
          <Modal
            visible={workoutMemoModal}
            transparent={true}
            animationType="fade">
            <View style={styles.modalContainer2}>
              <View style={styles.memoContainer}>
                <Text style={styles.restingTitle}>
                  운동 기록의 이름을 입력해주세요
                </Text>
                <TextInput
                  style={styles.titleInput}
                  onChangeText={text => setWorkoutTitle(text)}
                  value={workoutTitle}
                  placeholder="운동 기록 이름"></TextInput>
                <TextInput
                  style={styles.memoInput}
                  onChangeText={text => setWorkoutMemo(text)}
                  value={workoutMemo}
                  placeholder="추가 메모 남기기 (선택)"></TextInput>
                <View
                  style={{flexDirection: 'row', marginTop: 5 * height_ratio}}>
                  <CustomButton_B
                    width={264 * width_ratio}
                    onPress={() => navigation.navigate('HomeScreen')}
                    content="확인"
                    marginVertical={12}></CustomButton_B>
                </View>
              </View>
            </View>
          </Modal>
          <View>
            <Text style={styles.pauseTitle}>일시정지</Text>
          </View>
          <View
            style={{
              marginLeft: 16 * width_ratio,
              marginTop: 24 * height_ratio,
            }}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.grayCircle}>
                <Body name="body" color="#3aa84c" size={23}></Body>
              </View>

              <View style={{marginLeft: 8 * width_ratio}}>
                <Text style={styles.pauseMotionTitle}>
                  {motionList[m_index].motionName}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                    }}>
                    <Text style={styles.statusText2}>{s_index + 1}</Text>
                    <Text style={styles.targetText2}>/4set</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                      marginHorizontal: 16 * width_ratio,
                    }}>
                    <Text style={styles.statusText2}>
                      {motionList[m_index].sets[s_index].weight}
                    </Text>
                    <Text style={styles.targetText2}> kg</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                    }}>
                    <Text style={styles.statusText2}>
                      {motionList[m_index].sets[s_index].reps}
                    </Text>
                    <Text style={styles.targetText2}>
                      /{motionList[m_index].sets[s_index].reps}회
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20 * height_ratio,
                justifyContent: 'flex-start',
              }}>
              <View style={{flexDirection: 'row', width: 120 * width_ratio}}>
                <View style={styles.grayCircle}>
                  <Timer name="timer" color="#41b1ca" size={23}></Timer>
                </View>
                <View style={{marginLeft: 8 * width_ratio}}>
                  <Text style={styles.puaseSubtitle}>전체 운동시간</Text>
                  <Text style={styles.puaseSubcontent}>{time}</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.RgrayCircle}>
                  <Timer name="timer" color="#41b1ca" size={23}></Timer>
                </View>

                <View style={{marginLeft: 8 * width_ratio}}>
                  <Text style={styles.puaseSubtitle}>유효 수행시간</Text>
                  <Text style={styles.puaseSubcontent}>{formatTime(TUT)}</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20 * height_ratio,
                justifyContent: 'flex-start',
              }}>
              <View style={{flexDirection: 'row', width: 120 * width_ratio}}>
                <View style={styles.grayCircle}>
                  <Lightning
                    name="lightning-bolt"
                    color="#fbcb22"
                    size={23}></Lightning>
                </View>
                <View style={{marginLeft: 8 * width_ratio}}>
                  <Text style={styles.puaseSubtitle}>볼륨</Text>
                  <Text style={styles.puaseSubcontent}>{time}</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.RgrayCircle}>
                  <Fire name="fire" color="#fc7d36" size={23}></Fire>
                </View>

                <View style={{marginLeft: 8 * width_ratio}}>
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

          <ScrollView style={{height: 320 * height_ratio}}></ScrollView>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={() => setWorkoutDoneModal2(true)}
              style={styles.endButton}>
              <Square
                name="square"
                color={'#fff'}
                size={15}
                style={{
                  marginRight: 8 * width_ratio,
                  marginTop: 2 * height_ratio,
                }}></Square>
              <Text style={styles.CText3}>운동 종료</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.restartButton}
              onPress={pausedModal}>
              <Start
                name="caretright"
                color={'white'}
                size={17}
                style={{
                  marginRight: 8 * width_ratio,
                  marginTop: 2 * height_ratio,
                }}></Start>
              <Text style={styles.CText3}>운동 다시 시작</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {!isPausedPage && pressSetting && (
        <View style={{alignSelf: 'flex-start'}}>
          <Modal
            visible={modalVisible2}
            transparent={true}
            animationType="fade">
            <View style={styles.modalContainer}>
              <View style={styles.modeContainer}>
                <View style={styles.modeTitleContainer}>
                  <Text style={styles.titleText}>세트간 휴식시간</Text>
                </View>
                <ScrollView style={{height: 500 * height_ratio}}>
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
                          <Text>{calTime(value.time)}</Text>
                        </View>
                        <View style={styles.restChecker}>
                          <Check
                            name="check"
                            size={20}
                            color={
                              value.time === temprestSet ? '#5252fa' : 'white'
                            }></Check>
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
          <Modal
            visible={modalVisible3}
            transparent={true}
            animationType="fade">
            <View style={styles.modalContainer}>
              <View style={styles.modeContainer}>
                <View style={styles.modeTitleContainer}>
                  <Text style={styles.titleText}>동작간 휴식시간</Text>
                </View>
                <ScrollView style={{height: 500 * height_ratio}}>
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
                          <Text>{calTime(value.time)}</Text>
                        </View>
                        <View style={styles.restChecker}>
                          <Check
                            name="check"
                            size={20}
                            color={
                              value.time === temprestMotion
                                ? '#5252fa'
                                : 'white'
                            }></Check>
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
          <Text style={styles.pauseTitle}>운동 설정</Text>
          <View style={styles.settings}>
            <View style={styles.settingContainer}>
              <Text style={styles.settingText}>스마트 어시스트</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    color: isAssist ? '#5252fa' : '#fff',
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
                    transform: [{scaleX: 1.2}, {scaleY: 1.2}],
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
          </View>
          <View style={styles.settings}>
            <View style={styles.settingContainer}>
              <Text style={styles.settingText}>세트간 휴식시간</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text>{calTime(restSet)}</Text>
                <TouchableOpacity onPress={() => setModalVisible2(true)}>
                  <Right
                    name="right"
                    size={20}
                    color="#242424"
                    style={{marginLeft: 4 * width_ratio}}></Right>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.settings}>
            <View style={styles.settingContainer}>
              <Text style={styles.settingText}>동작간 휴식시간</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text>{calTime(restMotion)}</Text>
                <TouchableOpacity onPress={() => setModalVisible3(true)}>
                  <Right
                    name="right"
                    size={20}
                    color="#242424"
                    style={{marginLeft: 4 * width_ratio}}></Right>
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
              onPress={() => endSetting()}>
              <Left
                name="chevron-left"
                size={15}
                color="#fff"
                style={{
                  marginRight: 7 * width_ratio,
                  marginTop: 3 * height_ratio,
                }}></Left>
              <Text style={styles.CText3}>
                휴식중 {formatTime(elapsedTime)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {!isPausedPage && isModifyMotion && (
        <View>
          <Modal
            visible={isModalVisible}
            transparent={true}
            animationType="fade">
            <View style={styles.modalContainer5}>
              <View style={styles.modeContainer5}>
                <View style={styles.modeTitleContainer5}>
                  <Text style={styles.titleText5}>하중모드</Text>
                  <Text>{selectedMode.modeName}</Text>
                </View>
                <View>
                  <FlatList
                    data={modeList}
                    renderItem={({item}) => <Item mode={item}></Item>}
                    keyExtractor={item => item.modeName}></FlatList>
                </View>

                <View style={styles.modeButtonContainer5}>
                  <View>
                    <CustomButton_W
                      width={171 * width_ratio}
                      content="취소"
                      onPress={handleCancelPress}
                      disabled={false}></CustomButton_W>
                  </View>
                  <View>
                    <CustomButton_B
                      width={171}
                      content="선택 완료"
                      onPress={handleSelectPress}
                      disabled={false}></CustomButton_B>
                  </View>
                </View>
              </View>
            </View>
          </Modal>

          <View style={{alignSelf: 'flex-start'}}>
            <Text style={styles.motionTitle}>동작</Text>
          </View>
          <ScrollView>
            {motionList.map((value, key) => (
              <WorkoutItem
                key={key}
                motion_index={key}
                id={value.motion_id}
                motion={value}
                isExercising={true}
                setIsModalVisible={setIsModalVisible}
                motionList={motionList}
                setMotionList={setMotionList}></WorkoutItem>
            ))}
          </ScrollView>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View style={{marginRight: 8}}>
              <CustomButton_W
                width={171 * width_ratio}
                content="+ 동작 추가"
                onPress={() => {
                  navigation.push('AddMotion', {
                    isQuickWorkout: isQuickWorkout,
                    workout_id: route.params.workout_id,
                    record_id: recordId,
                    routine_id: route.params.routine_id,
                    isRoutine: false,
                    isExercising: true,
                    isAddedMotionDone: false,
                    motionList: motionList,
                    elapsedTime: elapsedTime,
                    TUT: TUT,
                    m_index: m_index,
                    s_index: s_index,
                  });
                }}></CustomButton_W>
            </View>
            <View style={{marginLeft: 8}}>
              <CustomButton_B
                disabled={isExercisingDisabled}
                width={171 * width_ratio}
                content={`운동중  ${formatTime(elapsedTime)}`}
                onPress={saveModifying}></CustomButton_B>
            </View>
          </View>
        </View>
      )}
      <StatusBar style={{marginTop: 15 * height_ratio}} />
    </SafeAreaView>
  );
};

export default WorkoutStart;

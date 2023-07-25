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
} from 'react-native';

import CustomButton_W from '../../components/CustomButton_W';
import styles from './styles';
import CustomButton_B from '../../components/CustomButton_B';
import WorkoutItem from '../../components/WorkoutItem';
import {serverAxios} from '../../utils/commonAxios';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {AppContext} from '../../contexts/AppProvider';
import {BackHandler} from 'react-native';
import {VictoryLine, VictoryChart, VictoryAxis} from 'victory-native';
import {
  GestureHandlerRootView,
  gestureHandlerRootHOC,
} from 'react-native-gesture-handler';
import DraggableFlatList from 'react-native-draggable-flatlist';
import MotionRangeModal from '../../components/Modal/MotionRange';
import {Svg, Path} from 'react-native-svg';
import * as d3 from 'd3';

//svg
import Tut from '../../assets/svg/icons/tut.svg';
import Body from '../../assets/svg/icons/body.svg';
import Time from '../../assets/svg/icons/time.svg';
import Volume from '../../assets/svg/icons/volume.svg';
import Calorie from '../../assets/svg/icons/calorie.svg';

import Plus from '../../assets/svg/buttons/single/plus.svg';
import Minus from '../../assets/svg/buttons/single/minus.svg';

import Workout from '../../assets/svg/buttons/active/workout.svg';
import Pause from '../../assets/svg/buttons/single/pause.svg';
import Setting from '../../assets/svg/buttons/active/setting.svg';

import Stop from '../../assets/svg/buttons/single/stop.svg';
import Play from '../../assets/svg/buttons/single/play.svg';
import Cline from '../../assets/svg/icons/colorLine.svg';
import Cline2 from '../../assets/svg/icons/colorLine2.svg';
import Right from '../../assets/svg/buttons/single/arrow/right.svg';

import SLeft from '../../assets/svg/buttons/single/left_small.svg';

import Check from '../../assets/svg/buttons/active/check.svg';

//other components
import {Battery} from '../../components/battery';
import {useAppDispatch, useAppSelector} from '../../redux/store';

import {Divider} from '../../components/divider';
import {Information} from '../../components/Modal/information';
import {Switch} from '../../components/toggle';

//data receiving
import {startListening, stopListening} from '../../redux/BLE/slice';
import BLEStore from '../../redux/BLE/mobx_store';
import {startReport, stopReport} from '../../redux/BLE/ble_instruction';
import {set} from 'mobx';

const width_ratio = Dimensions.get('window').width / 390;
const height_ratio = Dimensions.get('window').height / 844;

export const WorkoutStart = ({navigation, route}) => {
  const [motionIndexBase, setMotionIndexBase] = useState(
    route.params.motion_index_base,
  );
  const [motionIndexMax, setMotionIndexMax] = useState(
    route.params.motion_index_base,
  );
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
  const [isTut, setIsTuT] = useState(true);
  const [time, setTime] = useState('');
  const [elapsedTime, setElapsedTime] = useState(route.params.elapsedTime);
  const [timerValue, setTimerValue] = useState(100);
  const [isRunning, setIsRunning] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);

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
  const [restSet, setRestSet] = useState(appcontext.state.userSetTime);
  const [restMotion, setRestMotion] = useState(appcontext.state.userMotionTime);

  // resting 관련 변수
  const [isResting, setIsResting] = useState(route.params.isResting);
  const [isRestingModal, setIsRestingModal] = useState(false);
  const [isStopResting, setIsStopResting] = useState(false);
  const [isMotionDone, setIsMotionDone] = useState(false);
  const [restTimer, setRestTimer] = useState(route.params.restTimer);
  const [nextMotionModal, setNextMotionModal] = useState(false);

  // motionList 수정 관련 변수 :
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMotionRangeModalVisible, setIsMotionRangeModalVisible] =
    useState(false);
  const [isExercisingDisabled, setIsExercisingDisabled] = useState(false);

  const [isModifyMotion, setIsModifyMotion] = useState(
    route.params.isModifyMotion,
  );
  const [selectedMode, setSelectedMode] = useState({
    modeName: '기본',
    modeDescription: '설명',
  });

  //graph 관련
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  const left = BLEStore.left;
  const right = BLEStore.right;

  const scrollViewRef = useRef(null);
  const {width: windowWidth} = useWindowDimensions();
  useEffect(() => {
    const newData1 = [...data1, left];
    const newData2 = [...data2, right];
    let interval;
    if (!isResting) {
      interval = setInterval(() => {
        // 새로운 데이터 생성 또는 가져오기

        // 최대 10개의 데이터 유지
        if (newData1.length > 300) {
          newData1.shift();
        }

        if (newData2.length > 300) {
          newData2.shift();
        }

        setData1(newData1);
        setData2(newData2);
      }, 10); // 1초마다 데이터 업데이트}
    }
    return () => clearInterval(interval);
  }, [data1, data2, isResting]);

  const heights = 200;
  const widths = data1.length * 30;

  const xScale = d3
    .scaleLinear()
    .domain([0, data1.length - 1])
    .range([0, widths]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max([...data1, ...data2])])
    .range([heights, 0]);

  const line1 = d3
    .line()
    .x((d, i) => xScale(i))
    .y(d => yScale(d))
    .curve(d3.curveMonotoneX);

  const line2 = d3
    .line()
    .x((d, i) => xScale(i))
    .y(d => yScale(d))
    .curve(d3.curveMonotoneX);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  }, [data1]);

  //Report 관련
  const [isReporting, setReporting] = useState(false);
  useEffect(() => {
    if (!isReporting) {
      startReport();
      setReporting(true);
    }
  }, []);

  //battery
  const battery = useAppSelector(state => state.ble.battery);

  useEffect(() => {
    const handleBackButton = () => {
      // 뒤로가기 버튼 동작을 막기 위해 아무 작업도 수행하지 않습니다.
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  useEffect(() => {
    if (motionList.length === 0) {
      setIsExercisingDisabled(true);
    } else {
      setIsExercisingDisabled(false);
    }
    motionList.forEach((value, key) => {
      if (value.motion_index > motionIndexMax) {
        setMotionIndexMax(value.motion_index);
      }
    });
  }, [motionList]);

  useEffect(() => {
    if (route.params.motionList) {
      setMotionList(route.params.motionList);
    }

    if (route.params.displaySelected) {
      if (route.params.isAddedMotionDone) {
        /*동작 완료 후 동작 추가 시*/
        setMotionList(currentMotionList => [
          ...currentMotionList,
          {
            motion_index: motionIndexBase,
            isMotionDone: false,
            isMotionDoing: true,
            doingSetIndex: 0,
            isFav: route.params.displaySelected[0].isFav,
            motion_range_min: route.params.displaySelected[0].motion_range_min,
            motion_range_max: route.params.displaySelected[0].motion_range_max,
            motion_id: route.params.displaySelected[0].motion_id,
            motion_name: route.params.displaySelected[0].motion_name,
            image_url: route.params.displaySelected[0].image_url,
            sets: [
              {weight: 0, reps: 1, mode: '기본', isDoing: true, isDone: false},
            ],
          },
        ]);
      } else {
        /* 운동 수행 중에 동작 추가 시*/
        setMotionList(currentMotionList => [
          ...currentMotionList,
          {
            motion_index: motionIndexBase,
            isMotionDone: false,
            isMotionDoing: false,
            doingSetIndex: 0,
            isFav: route.params.displaySelected[0].isFav,
            motion_range_min: route.params.displaySelected[0].motion_range_min,
            motion_range_max: route.params.displaySelected[0].motion_range_max,
            motion_id: route.params.displaySelected[0].motion_id,
            motion_name: route.params.displaySelected[0].motion_name,
            image_url: route.params.displaySelected[0].image_url,
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
            motion_index: motionIndexBase + i,
            isMotionDone: false,
            isMotionDoing: false,
            doingSetIndex: 0,
            isFav: route.params.displaySelected[i].isFav,
            motion_range_min: route.params.displaySelected[i].motion_range_min,
            motion_range_max: route.params.displaySelected[i].motion_range_max,
            motion_id: route.params.displaySelected[i].motion_id,
            motion_name: route.params.displaySelected[i].motion_name,
            image_url: route.params.displaySelected[i].image_url,
            sets: [
              {weight: 0, reps: 1, mode: '기본', isDoing: false, isDone: false},
            ],
          },
        ]);
      }
    } else {
      /* WorkoutReady 또는 Routine Detail에서 최초에 진입했을 때 */
      let updatedMotionList = [...motionList];
      if (!route.params.isAddMotion) {
        updatedMotionList[m_index].isMotionDoing = true;
        updatedMotionList[m_index].doingSetIndex = 0;
        updatedMotionList[m_index].sets[0].isDoing = true;
        setMotionList(updatedMotionList);
      }
    }
  }, []);

  useEffect(() => {
    console.log(motionList);
  }, [motionList]);

  useEffect(() => {
    if (workoutTitle.length > 0) {
      setIsSaveWorkoutDisabled(false);
    } else {
      setIsSaveWorkoutDisabled(true);
    }
  }, [workoutTitle]);

  const renderItem = gestureHandlerRootHOC(({item, index, drag, isActive}) => {
    return (
      <>
        <WorkoutItem
          drag={drag}
          isActive={isActive}
          motion_index={item.motion_index}
          id={item.motion_id}
          motion={item}
          isExercising={true}
          setIsModalVisible={setIsModalVisible}
          motion={item}
          motionList={motionList}
          setMotionList={setMotionList}
          setSelectedMode={setSelectedMode}
          setIsMotionRangeModalVisible={
            setIsMotionRangeModalVisible
          }></WorkoutItem>
        {item !== motionList[motionList.length - 1] && (
          <Divider height_ratio={height_ratio} />
        )}
      </>
    );
  });

  const modifyingMotion = () => {
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

  const formatTimes = time => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const setTempRestTime = time => {
    setTempRestSet(time);
  };

  const setRestTime = () => {
    appcontext.actions.setUserSetTime(temprestSet);
    setModalVisible2(false);
  };

  const MotionTempRestTime = time => {
    setTempRestMotion(time);
  };

  const MotionRestTime = () => {
    appcontext.actions.setUserMotionTime(temprestMotion);
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
            user_id: appcontext.state.userid,
            routine_id: route.params.routine_id,
            motion_list: motionList,
          };

          await serverAxios
            .post('/routine/save', body)
            .then(res => {})
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
        console.log(res.data);
        setRecordId(res.data.record_id);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const setCompletePost = async () => {
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
            paddingVertical: 12 * height_ratio,
            paddingHorizontal: 12 * width_ratio,
            marginVertical: 4 * height_ratio,
            marginHorizontal: 4 * height_ratio,
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
        setElapsedTime(prevElapsedTime => {
          const updatedTime = prevElapsedTime + 1;
          return updatedTime;
        });
      }, 1000); // 1초마다 증가
    }

    if (!isPaused && !workoutDone) {
      intervalId2 = setInterval(() => {
        setTUT(prevTuT => {
          const updatedTUT = prevTuT + 1;
          return updatedTUT;
        });
      }, 1000);
    }

    if (isResting && !isStopResting) {
      intervalId3 = setInterval(() => {
        setRestTimer(prevrestTime => {
          const updatedRestTimer = prevrestTime - 1;
          if (updatedRestTimer <= 0) {
            setNextMotionModal(true);
            setIsResting(false);
            setIsRestingModal(false);
            return restSet;
          }
          return updatedRestTimer;
        });
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

  useEffect(() => {
    if (recordId && (isResting || workoutDone)) {
      setCompletePost();
    }
  }, [recordId]);

  const setComplete = () => {
    if (s_index === 0) {
      getRecordId(m_index);
    } else {
      setCompletePost();
    }
    setIsMotionDone(false);
    let updatedMotionList = [...motionList];
    updatedMotionList[m_index].sets[s_index].isDone = true;
    setMotionList(updatedMotionList);
    if (s_index + 1 < motionList[m_index].sets.length) {
      //set 종료시
      setRestTimer(appcontext.state.userSetTime);
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
      setRestTimer(appcontext.state.userMotionTime);
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
      updatedMotionList[m_index].doingSetIndex = s_index + 1;
      updatedMotionList[m_index].sets[s_index].isDoing = false;
      setMotionList(updatedMotionList);
    } else {
      // 운동 종료시
      updatedMotionList = [...motionList];
      updatedMotionList[m_index].isMotionDone = true;
      setMotionList(updatedMotionList);
      updatedMotionList = [...motionList];
      updatedMotionList[m_index].isMotionDoing = false;
      updatedMotionList = [...motionList];
      updatedMotionList[m_index].doingSetIndex = s_index + 1;
      updatedMotionList[m_index].sets[s_index].isDoing = false;
      setMotionList(updatedMotionList);
      setMotionList(updatedMotionList);
      setWorkoutDone(true);
      if (isQuickWorkout) {
        setWorkoutDoneModal(true);
      } else {
        setRoutineDoneModal(true);
      }
      setIsResting(false);
    }
  };

  const goNextMotion = () => {
    setIsResting(false);
    setIsRestingModal(false);

    setIsStopResting(false);
    if (s_index + 1 < motionList[m_index].sets.length) {
      setSIndex(s_index + 1);
      let updatedMotionList = [...motionList];
      updatedMotionList[m_index].doingSetIndex = s_index + 1;
      updatedMotionList[m_index].sets[s_index + 1].isDoing = true;
      setMotionList(updatedMotionList);
    } else if (
      s_index + 1 === motionList[m_index].sets.length &&
      motionList[m_index + 1]
    ) {
      setMIndex(m_index + 1);
      setSIndex(0);
      let updatedMotionList = [...motionList];
      updatedMotionList[m_index + 1].isMotionDoing = true;
      setMotionList(updatedMotionList);
      updatedMotionList = [...motionList];
      updatedMotionList[m_index + 1].sets[0].isDoing = true;
      setMotionList(updatedMotionList);
    }
  };

  const endSetting = () => {
    setIsPaused(false);
    setPressSetting(false);
    // setRestTimer(restSet);
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      {!isPausedPage && !pressSetting && !isModifyMotion && (
        <View style={styles.subpageContainer}>
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
                    <Minus
                      height={16 * height_ratio}
                      width={16 * width_ratio}
                    />
                    <Text style={styles.plusminus}> 10초</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setRestTimer(restTimer + 10)}
                    style={{
                      marginLeft: 25 * width_ratio,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Plus height={16 * height_ratio} width={16 * width_ratio} />
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
                  <Text style={{color: '#242424', fontSize: 14 * height_ratio}}>
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
                    fontSize: 14 * height_ratio,
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
                          motion_index_base: motionIndexMax + 1,
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
                      width={126 * width_ratio}
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
                    fontSize: 14 * height_ratio,
                    color: '#242424',
                    marginTop: 12 * height_ratio,
                  }}>
                  루틴을 모두 수행했습니다.
                </Text>
                <Text
                  style={{
                    fontSize: 14 * height_ratio,
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
                        motion_index_base: motionIndexMax + 1,
                        isQuickWorkout: isQuickWorkout,
                        record_id: recordId,
                        workout_id: route.params.workout_id,
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
                  size={24 * height_ratio}
                  fillColor="#5252fa"
                  unfillColor="#FFFFFF"
                  textComponent={
                    <Text
                      style={{
                        marginHorizontal: 8 * width_ratio,
                        fontSize: 14 * height_ratio,
                        color: '#242424',
                      }}>
                      추가하는 동작을 내 루틴에 추가하기
                    </Text>
                  }
                  iconStyle={{borderColor: '#5252fa'}}
                  innerIconStyle={{borderWidth: 2 * height_ratio}}
                  isChecked={saveAddedMotionToRoutine}
                  onPress={() => {
                    setSaveAddedMotionToRoutine(!saveAddedMotionToRoutine);
                  }}
                />
                <View style={{alignSelf: 'stretch'}}>
                  <CustomButton_B
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
                  multiline={true}
                  onChangeText={text => setWorkoutMemo(text)}
                  value={workoutMemo}
                  placeholder="추가 메모 남기기 (선택)"></TextInput>
                <View
                  style={{flexDirection: 'row', marginTop: 5 * height_ratio}}>
                  <CustomButton_B
                    width={264 * width_ratio}
                    disabled={isSaveWorkoutDisabled}
                    onPress={() => {
                      saveWorkoutRecord();
                      navigation.reset({routes: [{name: 'HomeScreen'}]});
                    }}
                    content="확인"
                    marginVertical={12 * height_ratio}></CustomButton_B>
                </View>
              </View>
            </View>
          </Modal>
          <View
            style={{
              alignItems: 'center',
              marginBottom: 50 * height_ratio,
            }}>
            <View style={{width: '100%'}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={{flex: 1}} />
                <Text style={[styles.timer, {flex: 2, textAlign: 'center'}]}>
                  {formatTime(elapsedTime)}
                </Text>
                <Battery
                  battery={battery}
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 8 * width_ratio,
                }}>
                <Tut height={24 * height_ratio} width={24 * width_ratio} />
                <Text style={styles.tutText}>{formatTime(TUT)}</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              paddingTop: 10,
              // backgroundColor: '#000',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              // flex: 2,
            }}>
            <ScrollView
              ref={scrollViewRef}
              horizontal={true}
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                flexDirection: 'row',
                height: 220 * height_ratio,
              }}>
              <Svg width={widths} height={heights}>
                <Path
                  d={line1(data1)}
                  fill="none"
                  stroke="#2fcbe0"
                  strokeWidth="2"
                />
                <Path
                  d={line2(data2)}
                  fill="none"
                  stroke="#FF594f"
                  strokeWidth="2"
                />
              </Svg>
            </ScrollView>
            <View style={{gap: 16 * height_ratio}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Cline></Cline>
                  <Text
                    style={{
                      fontSize: 13 * height_ratio,
                      color: '#242424',
                      marginLeft: 4 * width_ratio,
                    }}>
                    left
                  </Text>
                </View>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
                  <Text
                    style={{
                      fontSize: 13 * height_ratio,
                      color: '#242424',
                      marginLeft: 4 * width_ratio,
                    }}>
                    이전
                  </Text>
                  <Text
                    style={{
                      fontSize: 13 * height_ratio,
                      color: '#FF594f',
                      marginLeft: 4 * width_ratio,
                    }}>
                    L 80
                  </Text>
                  <Text
                    style={{
                      fontSize: 13 * height_ratio,
                      color: '#2fcbe0',
                      marginLeft: 4 * width_ratio,
                    }}>
                    R 80
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Cline2></Cline2>
                  <Text
                    style={{
                      fontSize: 13 * height_ratio,
                      color: '#242424',
                      marginLeft: 4 * width_ratio,
                    }}>
                    right
                  </Text>
                </View>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
                  <Text
                    style={{
                      fontSize: 13 * height_ratio,
                      color: '#242424',
                      marginLeft: 4 * width_ratio,
                    }}>
                    최대
                  </Text>
                  <Text
                    style={{
                      fontSize: 13 * height_ratio,
                      color: '#FF594f',
                      marginLeft: 4 * width_ratio,
                    }}>
                    L 80
                  </Text>
                  <Text
                    style={{
                      fontSize: 13 * height_ratio,
                      color: '#2fcbe0',
                      marginLeft: 4 * width_ratio,
                    }}>
                    R 80
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 16 * height_ratio,
              // marginHorizontal: 16 * width_ratio,
            }}>
            <View
              style={{
                height: 8 * height_ratio,
                width: Dimensions.get('window').width,

                alignSelf: 'center',

                backgroundColor: '#F5F5F5',
                marginTop: 16 * height_ratio,
                marginBottom: 32 * height_ratio,
              }}
            />

            <View style={{}}>
              <View
                style={{alignItems: 'center', marginBottom: 32 * height_ratio}}>
                <Text
                  style={[
                    styles.motion_name,
                    {marginBottom: 4 * height_ratio},
                  ]}>
                  {motionList[m_index].motion_name}
                </Text>
                <View style={{flexDirection: 'row', gap: 16 * width_ratio}}>
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
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 12 * width_ratio,
                  marginBottom: 16 * height_ratio,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    if (motionList[m_index].sets[s_index].weight > 0) {
                      const updatedMotionList = [...motionList];
                      updatedMotionList[m_index].sets[s_index].weight -= 1;
                      setMotionList(updatedMotionList);
                    }
                  }}
                  style={styles.CButton}>
                  <Minus height={16 * height_ratio} width={16 * width_ratio} />
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
                  <Plus height={16 * height_ratio} width={16 * width_ratio} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    isResting ? setIsRestingModal(true) : setComplete();
                    stopListening();
                    setReporting(false);
                  }}
                  style={styles.CButton2}>
                  <Text
                    style={{
                      ...styles.CText,
                      color: isResting
                        ? restTimer <= 10
                          ? '#cc3300'
                          : '#242424'
                        : '#242424',
                      fontWeight: isResting ? '600' : '400',
                      fontSize: isResting
                        ? 20 * height_ratio
                        : 14 * height_ratio,
                    }}>
                    {isResting ? formatTime(restTimer) : '세트완료'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.navigator}>
                <TouchableOpacity onPress={() => modifyingMotion()}>
                  <Workout
                    height={24 * height_ratio}
                    width={24 * width_ratio}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    pausedModal();
                    stopReport();
                  }}>
                  <Pause height={24 * height_ratio} width={24 * width_ratio} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setPressSetting(true);
                    setIsPaused(true);
                  }}>
                  <Setting
                    height={24 * height_ratio}
                    width={24 * width_ratio}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
      {isPausedPage && (
        <View style={[styles.subpageContainer, {alignItems: 'center'}]}>
          <Modal
            visible={workoutDoneModal2}
            transparent={true}
            animationType="fade">
            <View style={styles.modalContainer2}>
              <View style={styles.endingContainer}>
                <Text style={styles.restingTitle}>운동 종료</Text>
                <Text
                  style={{
                    fontSize: 14 * height_ratio,
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
                  multiline={true}
                  onChangeText={text => setWorkoutMemo(text)}
                  value={workoutMemo}
                  placeholder="추가 메모 남기기 (선택)"></TextInput>
                <View
                  style={{flexDirection: 'row', marginTop: 5 * height_ratio}}>
                  <CustomButton_B
                    width={264 * width_ratio}
                    onPress={() => {
                      saveWorkoutRecord();
                      navigation.reset({routes: [{name: 'HomeScreen'}]});
                    }}
                    content="확인"
                    marginVertical={12 * height_ratio}></CustomButton_B>
                </View>
              </View>
            </View>
          </Modal>
          <View style={{alignSelf: 'stretch', gap: 24 * height_ratio}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.pauseTitle}>일시정지</Text>
              <Battery battery={battery} />
            </View>
            <View style={{flexDirection: 'row', gap: 8 * width_ratio}}>
              <View style={styles.grayCircle}>
                <Body height={24 * height_ratio} width={24 * width_ratio} />
              </View>
              <View>
                <Text style={styles.pauseMotionTitle}>
                  {motionList[m_index].motion_name}
                </Text>
                <View style={{flexDirection: 'row', gap: 8 * width_ratio}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                      gap: 2 * width_ratio,
                    }}>
                    <Text style={styles.statusText2}>{s_index + 1}</Text>
                    <Text style={styles.targetText2}>/4set</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                      gap: 2 * width_ratio,
                    }}>
                    <Text style={styles.statusText2}>
                      {motionList[m_index].sets[s_index].weight}
                    </Text>
                    <Text style={styles.targetText2}>kg</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                      gap: 2 * width_ratio,
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
                justifyContent: 'flex-start',
                gap: 11 * width_ratio,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: (Dimensions.get('window').width - 32) / 2,
                }}>
                <View style={styles.grayCircle}>
                  <Time height={24 * height_ratio} width={24 * width_ratio} />
                </View>
                <View style={{marginLeft: 8 * width_ratio}}>
                  <Text style={styles.pauseSubtitle}>전체 운동시간</Text>
                  <Text style={styles.pauseSubcontent}>{time}</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', gap: 8 * width_ratio}}>
                <View style={styles.grayCircle}>
                  <Tut height={24 * height_ratio} width={24 * width_ratio} />
                </View>
                <View>
                  <Text style={styles.pauseSubtitle}>유효 수행시간</Text>
                  <Text style={styles.pauseSubcontent}>{formatTime(TUT)}</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                gap: 11 * width_ratio,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: (Dimensions.get('window').width - 32) / 2,
                  gap: 8 * width_ratio,
                }}>
                <View style={styles.grayCircle}>
                  <Volume height={24 * height_ratio} width={24 * width_ratio} />
                </View>
                <View>
                  <Text style={styles.pauseSubtitle}>볼륨</Text>
                  <Text style={styles.pauseSubcontent}>{time}</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', gap: 8 * width_ratio}}>
                <View style={styles.grayCircle}>
                  <Calorie
                    height={24 * height_ratio}
                    width={24 * width_ratio}
                  />
                </View>
                <View>
                  <Text style={styles.pauseSubtitle}>칼로리</Text>
                  <Text style={styles.pauseSubcontent}>{time}</Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              height: 8 * height_ratio,
              width: Dimensions.get('window').width,

              alignSelf: 'center',

              backgroundColor: '#F5F5F5',
              marginTop: 16 * height_ratio,
              marginBottom: 24 * height_ratio,

              overflow: 'visible',
            }}
          />
          <ScrollView
            style={{height: 320 * height_ratio}}
            showsVerticalScrollIndicator={false}></ScrollView>
          <View style={{flexDirection: 'row', gap: 16 * width_ratio}}>
            <TouchableOpacity
              onPress={() => setWorkoutDoneModal2(true)}
              style={styles.endButton}>
              <Stop height={24 * height_ratio} width={24 * width_ratio} />
              <Text style={styles.CText3}>운동 종료</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.restartButton}
              onPress={pausedModal}>
              <Play height={24 * height_ratio} width={24 * width_ratio} />
              <Text style={styles.CText3}>운동 다시 시작</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {!isPausedPage && pressSetting && (
        <View style={styles.subpageContainer}>
          <Modal
            visible={modalVisible2}
            transparent={true}
            animationType="fade">
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
          <Modal
            visible={modalVisible3}
            transparent={true}
            animationType="fade">
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
                    color: isAssist ? '#5252fa' : '#fff',
                  }}>
                  ON
                </Text>
                <Switch on={isAssist} onPress={toggleSwitch} />
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
                <Switch on={isLock} onPress={toggleSwitch2} />
              </View>
            </View>
          </View>
          <View style={styles.settings}>
            <View style={styles.settingContainer}>
              <Text style={styles.settingText}>세트간 휴식시간</Text>
              <TouchableOpacity
                onPress={() => setModalVisible2(true)}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 14 * height_ratio}}>
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
                <Text style={{fontSize: 14 * height_ratio}}>
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
            <TouchableOpacity
              style={styles.CButton3}
              onPress={() => endSetting()}>
              <SLeft height={16 * height_ratio} width={16 * width_ratio} />
              <Text style={styles.CText3}>
                휴식중 {formatTime(elapsedTime)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {!isPausedPage && isModifyMotion && (
        <View>
          <MotionRangeModal
            isMotionRangeModalVisible={isMotionRangeModalVisible}
            setIsMotionRangeModalVisible={setIsMotionRangeModalVisible}
            motionList={motionList}
            setMotionList={setMotionList}></MotionRangeModal>
          <Modal
            visible={isModalVisible}
            transparent={true}
            animationType="fade">
            <View style={styles.modalContainer5}>
              <View style={styles.modeContainer5}>
                <View style={styles.modeTitleContainer5}>
                  <Text style={styles.titleText5}>하중모드</Text>
                  <Text style={{fontSize: 14 * height_ratio}}>
                    {selectedMode.modeName}
                  </Text>
                </View>
                <View>
                  <FlatList
                    data={appcontext.state.modeList}
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

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 24 * height_ratio,
            }}>
            <Text style={styles.motionTitle}>동작</Text>
            <Battery battery={battery} />
          </View>

          <GestureHandlerRootView style={{height: 625 * height_ratio}}>
            <DraggableFlatList
              data={motionList}
              renderItem={renderItem}
              keyExtractor={item => item.motion_index}
              onDragEnd={({data}) => setMotionList(data)}
              showsVerticalScrollIndicator={false}
            />
          </GestureHandlerRootView>

          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View style={{marginRight: 8 * width_ratio}}>
              <CustomButton_W
                width={171 * width_ratio}
                content="+ 동작 추가"
                onPress={() => {
                  navigation.push('AddMotion', {
                    motion_index_base: motionIndexMax + 1,
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
                    isResting: isResting,
                    restTimer: restTimer,
                  });
                }}></CustomButton_W>
            </View>
            <View style={{marginLeft: 8 * width_ratio}}>
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

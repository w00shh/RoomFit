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
import {
  GestureHandlerRootView,
  gestureHandlerRootHOC,
} from 'react-native-gesture-handler';
import BLEStore from '../../../redux/BLE/mobx_store';
import DraggableFlatList from 'react-native-draggable-flatlist';
import MotionRangeModal from '../../../components/Modal/MotionRange';
import styles from './styles';
import {Battery} from '../../../components/battery';
import {Information} from '../../../components/Modal/information';
import {Switch} from '../../../components/toggle';
import CustomButton_B from '../../../components/CustomButton_B';
import CustomButton_W from '../../../components/CustomButton_W';
import WorkoutItem from '../../../components/WorkoutItem';

import {Divider} from '../../../components/divider';
import Right from '../../../assets/svg/buttons/single/arrow/right.svg';
import Check from '../../../assets/svg/buttons/active/check.svg';
import SLeft from '../../../assets/svg/buttons/single/left_small.svg';
import App from '../../../../App';

const width_ratio = Dimensions.get('window').width / 390;
const height_ratio = Dimensions.get('window').height / 844;

export const WorkoutModifying = ({navigation, route}) => {
  const appcontext = useContext(AppContext);
  const battery = useAppSelector(state => state.ble.battery);
  const [motionList, setMotionList] = useState(route.params.motionList);
  const [motionIndexBase, setMotionIndexBase] = useState(
    route.params.motion_index_base,
  );
  const [motionIndexMax, setMotionIndexMax] = useState(
    route.params.motion_index_base,
  );
  const [elapsedTime, setElapsedTime] = useState(route.params.elapsedTime);
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
  const [m_index, setMIndex] = useState(route.params.m_index);
  const [s_index, setSIndex] = useState(route.params.s_index);

  useEffect(() => {
    if (motionList.length === 0) {
      setIsExercisingDisabled(true);
    } else {
      setIsExercisingDisabled(false);
    }
    motionList.forEach((value, key) => {
      if (value.motion_index > motionIndexMax) {
        setMotionIndexMax(value.motion_index);
        console.log(value.motion_index);
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
        console.log('come');
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
      // let updatedMotionList = [...motionList];
      // if (!route.params.isAddMotion) {
      //   updatedMotionList[m_index].isMotionDoing = true;
      //   updatedMotionList[m_index].doingSetIndex = 0;
      //   updatedMotionList[m_index].sets[0].isDoing = true;
      //   setMotionList(updatedMotionList);
      // }
    }
  }, []);

  useEffect(() => {
    let intervalId;

    intervalId = setInterval(() => {
      setElapsedTime(prevElapsedTime => {
        const updatedTime = prevElapsedTime + 1;
        return updatedTime;
      });
    }, 1000); // 1초마다 증가

    return () => {
      clearInterval(intervalId);
    };
  }, []);

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

  const renderItem = gestureHandlerRootHOC(
    React.memo(({item, index, drag, isActive}) => {
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
    }),
  );

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

  return (
    <SafeAreaView style={styles.pageContainer}>
      <View>
        <MotionRangeModal
          isMotionRangeModalVisible={isMotionRangeModalVisible}
          setIsMotionRangeModalVisible={setIsMotionRangeModalVisible}
          motionList={motionList}
          setMotionList={setMotionList}></MotionRangeModal>
        <Modal visible={isModalVisible} transparent={true} animationType="fade">
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
                  routine_index: route.params.routine_index,
                  routine_detail_index: route.params.routine_detail_index,
                  motion_index_base: motionIndexMax + 1,
                  isQuickWorkout: route.params.isQuickWorkout,
                  workout_id: route.params.workout_id,
                  record_id: route.params.recordId,
                  routine_id: route.params.routine_id,
                  isRoutine: false,
                  isExercising: true,
                  isAddedMotionDone: false,
                  motionList: motionList,
                  elapsedTime: elapsedTime,
                  TUT: route.params.TUT,
                  m_index: m_index,
                  s_index: s_index,
                  isResting: route.params.isResting,
                  restTimer: route.params.restTimer,
                });
              }}></CustomButton_W>
          </View>
          <View style={{marginLeft: 8 * width_ratio}}>
            <CustomButton_B
              disabled={isExercisingDisabled}
              width={171 * width_ratio}
              content={`운동중  ${formatTime(elapsedTime)}`}
              onPress={() => {
                navigation.push('WorkoutStart', {
                  routine_index: route.params.routine_index,
                  routine_detail_index: route.params.routine_detail_index,
                  motion_index_base: motionIndexMax,
                  isQuickWorkout: route.params.isQuickWorkout,
                  routine_id: route.params.routine_id,
                  workout_id: route.params.workout_id,
                  isAddMotion: route.params.isAddMotion,
                  motionList: motionList,
                  elapsedTime: elapsedTime,
                  TUT: route.params.TUT,
                  m_index: route.params.m_index,
                  s_index: route.params.s_index,
                  isPaused: route.params.isPaused,
                  isPausedPage: route.params.isPausedPage,
                  isModifyMotion: false,
                  isResting: route.params.isResting,
                  restTimer: route.params.restTimer,
                  // data1: route.params.data1,
                  // data2: route.params.data2,
                });
              }}></CustomButton_B>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WorkoutModifying;

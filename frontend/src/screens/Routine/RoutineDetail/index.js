import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import styles from './styles';
import WorkoutItem from '../../../components/WorkoutItem';
import {serverAxios} from '../../../utils/commonAxios';
import CustomButton_W from '../../../components/CustomButton_W';
import CustomButton_B from '../../../components/CustomButton_B';
import {AppContext} from '../../../contexts/AppProvider';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {
  GestureHandlerRootView,
  gestureHandlerRootHOC,
} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MotionRangeModal from '../../../components/Modal/MotionRange';

//svg
import Modify from '../../../assets/svg/buttons/single/modify.svg';
import Back from '../../../assets/svg/buttons/single/back.svg';
import {Divider} from '../../../components/divider';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const RoutineDetail = ({navigation, route}) => {
  const appcontext = useContext(AppContext);

  const [motionIndexBase, setMotionIndexBase] = useState(
    route.params.motion_index_base,
  );
  const [motionIndexMax, setMotionIndexMax] = useState(
    route.params.motion_index_base,
  );

  const [motionList, setMotionList] = useState([]);
  const [routineId, setRoutineId] = useState(
    appcontext.state.routineDetailList[route.params.routine_detail_index]
      .routine_id,
  );
  const [workoutId, setWorkoutId] = useState();
  const [routineName, setRoutineName] = useState(
    route.params.routineName
      ? route.params.routineName
      : appcontext.state.routineDetailList[route.params.routine_detail_index]
          .routine_name,
  );
  const [isRoutineName, setIsRoutineName] = useState(false);
  const [isRoutineNameModalVisible, setIsRoutineNameModalVisible] =
    useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMotionRangeModalVisible, setIsMotionRangeModalVisible] =
    useState(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState(
    motionList.length === 0 ? true : false,
  );
  const [routineNameSaveDisabled, setRoutineNameSaveDisabled] = useState(true);

  const [selectedMode, setSelectedMode] = useState({
    modeName: '기본',
    modeDescription: '설명',
  });

  const [keyboardHeight, setKeyboardHeight] = useState(0);

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
            marginHorizontal: 4 * width_ratio,
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

  const handleSaveRoutine = async () => {
    const body = {
      user_id: appcontext.state.userid,
      routine_id: routineId,
      motion_list: motionList,
    };
    await serverAxios
      .post('/routine/save', body)
      .then(res => {
        let updatedRoutineList = appcontext.state.routineList;
        updatedRoutineList[route.params.routine_index].routine_id =
          res.data[0].routine_id;
        updatedRoutineList[route.params.routine_index].routine_name =
          res.data[0].routine_name;
        updatedRoutineList[route.params.routine_index].motion_count =
          res.data[0].motion_count;
        updatedRoutineList[route.params.routine_index].body_regions =
          res.data[0].body_regions;
        appcontext.actions.setRoutineList(updatedRoutineList);
      })
      .catch(e => {
        console.log(e);
      });
    let updatedRoutineDetailList = appcontext.state.routineDetailList;
    updatedRoutineDetailList[route.params.routine_detail_index].motionList =
      motionList;
    appcontext.actions.setRoutineDetailList(updatedRoutineDetailList);

    navigation.push('MyRoutine');
  };

  const handleBackButton = () => {
    navigation.reset({routes: [{name: 'MyRoutine'}]});
  };
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            handleBackButton();
            //navigation.reset({routes: [{name: 'MyRoutine'}]});
          }}>
          <Back height={24 * height_ratio} width={24 * width_ratio} />
        </TouchableOpacity>
      ),

      headerTitle: () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4 * width_ratio,
          }}>
          <Text
            style={{
              marginHorizontal: 6 * width_ratio,
              color: 'black',
              fontSize: 16 * height_ratio,
              fontWeight: '700',
            }}>
            {routineName}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setIsRoutineNameModalVisible(!isRoutineNameModalVisible);
            }}>
            <Modify height={16 * height_ratio} width={16 * width_ratio} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
          disabled={isSaveDisabled}
          onPress={() => {
            handleSaveRoutine();
          }}>
          <Text style={{fontSize: 14 * height_ratio}}>저장</Text>
        </TouchableOpacity>
      ),
    });
  }, [isRoutineName, isSaveDisabled, motionList, routineName]);

  useEffect(() => {
    if (route.params.isRoutineDetail) {
      //getRoutineDetailMotionList();
      appcontext.state.routineDetailList[
        route.params.routine_detail_index
      ].motionList.forEach((value, key) => {
        let updatedSets = value.sets;
        updatedSets.forEach((value2, key2) => {
          value2.isDoing = false;
          value2.isDone = false;
        });
        setMotionList(currentMotionList => [
          ...currentMotionList,
          {
            motion_index: motionIndexBase + key,
            isMotionDone: false,
            isMotionDoing: false,
            doingSetIndex: 0,
            isFav: value.isFav,
            motion_range_min: value.motion_range_min,
            motion_range_max: value.motion_range_max,
            motion_id: value.motion_id,
            motion_name: value.motion_name,
            image_url: value.image_url,
            sets: updatedSets,
          },
        ]);
      });
    } else {
      setMotionList(route.params.motionList);
      setIsSaveDisabled(false);
      for (let i = 0; i < route.params.displaySelected.length; i++) {
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
              {
                weight: 0,
                reps: 1,
                mode: '기본',
                isDoing: false,
                isDone: false,
              },
            ],
          },
        ]);
      }
    }
  }, []);

  useEffect(() => {
    if (motionList.length === 0) {
      setIsSaveDisabled(true);
    } else {
      setIsSaveDisabled(false);
    }

    motionList.forEach((value, key) => {
      if (value.motion_index > motionIndexMax) {
        setMotionIndexMax(value.motion_index);
      }
    });
  }, [motionList]);

  useEffect(() => {
    if (routineName.length === 0) {
      setRoutineNameSaveDisabled(true);
    } else {
      setRoutineNameSaveDisabled(false);
    }
  }, [routineName]);

  const handleConfirmPress = async () => {
    setIsRoutineName(!isRoutineName);
    setIsRoutineNameModalVisible(!isRoutineNameModalVisible);

    const body = {
      routine_id: routineId,
      routine_name: routineName,
    };
    await serverAxios
      .put('/routine/nameChange', body)
      .then(res => {})
      .catch(e => {
        console.log(e);
      });
  };

  const handleAddMotionPress = () => {
    navigation.push('AddMotion', {
      routine_index: route.params.routine_index,
      routine_detail_index: route.params.routine_detail_index,
      isRoutine: true,
      isRoutineDetail: true,
      routine_id: routineId,
      routineName: routineName,
      motionList: motionList,
      motion_index_base: motionIndexMax + 1,
    });
  };

  useEffect(() => {
    if (workoutId) {
      navigation.navigate('WorkoutStartSplash', {
        routine_index: route.params.routine_index,
        routine_detail_index: route.params.routine_detail_index,
        isRoutineDetail: true,
        isQuickWorkout: false,
        routine_id: routineId,
        workout_id: workoutId,
        isAddMotion: false,
        motionList: motionList,
        elapsedTime: 0,
        TUT: 0,
        m_index: 0,
        s_index: 0,
        isPaused: false,
        isPausedPage: false,
        isModifyMotion: false,
        isResting: false,
        restTimer: appcontext.state.userSetTime,
      });
    }
  }, [workoutId]);

  const handleStartWorkoutPress = async () => {
    const body = {
      user_id: appcontext.state.userid,
    };
    await serverAxios
      .post('/workout', body)
      .then(res => {
        setWorkoutId(res.data.workout_id);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const renderItem = gestureHandlerRootHOC(({item, index, drag, isActive}) => {
    return (
      <>
        <WorkoutItem
          drag={drag}
          isActive={isActive}
          motion_index={item.motion_index}
          id={item.motion_id}
          motion={item}
          isExercising={false}
          setIsModalVisible={setIsModalVisible}
          motion={item}
          motionList={motionList}
          setMotionList={setMotionList}
          setSelectedMode={setSelectedMode}
          setIsMotionRangeModalVisible={setIsMotionRangeModalVisible}
        />
        {!isActive && item !== motionList[motionList.length - 1] && (
          <Divider height_ratio={height_ratio} />
        )}
      </>
    );
  });

  return (
    <View style={styles.pageContainer}>
      <Modal
        visible={isRoutineNameModalVisible}
        transparent={true}
        animationType="fade">
        <View style={styles.modalNameContainer}>
          <View style={styles.routineNameContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>루틴 이름</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                onChangeText={text => {
                  setRoutineName(text);
                }}
                defaultValue={routineName}
                placeholder="루틴 이름"
                inputMode="text"></TextInput>
            </View>
            <CustomButton_B
              width={264 * width_ratio}
              onPress={handleConfirmPress}
              disabled={routineNameSaveDisabled}
              content="확인"></CustomButton_B>
          </View>
        </View>
      </Modal>
      <MotionRangeModal
        isMotionRangeModalVisible={isMotionRangeModalVisible}
        setIsMotionRangeModalVisible={setIsMotionRangeModalVisible}
        motionList={motionList}
        setMotionList={setMotionList}></MotionRangeModal>
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modeContainer}>
            <View style={styles.modeTitleContainer}>
              <Text style={styles.titleText}>하중모드</Text>
              <Text>{selectedMode.modeName}</Text>
            </View>
            <View>
              <FlatList
                data={appcontext.state.modeList}
                renderItem={({item}) => <Item mode={item}></Item>}
                keyExtractor={item => item.modeName}></FlatList>
            </View>

            <View style={styles.modeButtonContainer}>
              <View>
                <CustomButton_W
                  width={171 * width_ratio}
                  content="취소"
                  onPress={handleCancelPress}
                  disabled={false}></CustomButton_W>
              </View>
              <View>
                <CustomButton_B
                  width={171 * width_ratio}
                  content="선택 완료"
                  onPress={handleSelectPress}
                  disabled={false}></CustomButton_B>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {motionList[0] && (
        <GestureHandlerRootView style={{height: 625 * height_ratio}}>
          <DraggableFlatList
            data={motionList}
            renderItem={renderItem}
            keyExtractor={(item, index) =>
              item.motion_index.toString() + index.toString()
            }
            onDragEnd={({data}) => setMotionList(data)}
            showsVerticalScrollIndicator={false}
          />
        </GestureHandlerRootView>
      )}

      <View style={styles.buttonContainer}>
        <View style={styles.buttonSection}>
          <CustomButton_W
            width={171 * width_ratio}
            content="+ 동작 추가"
            marginVertical={16 * height_ratio}
            onPress={handleAddMotionPress}
            disabled={false}></CustomButton_W>
        </View>
        <View style={styles.buttonSection}>
          <CustomButton_B
            width={171 * width_ratio}
            content="루틴 운동 시작"
            marginVertical={16 * height_ratio}
            onPress={handleStartWorkoutPress}
            disabled={false}></CustomButton_B>
        </View>
      </View>
    </View>
  );
};

export default RoutineDetail;

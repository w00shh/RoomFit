import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Entypo';
import WorkoutItem from '../../../components/WorkoutItem';
import {serverAxios} from '../../../utils/commonAxios';
import CustomButton_W from '../../../components/CustomButton_W';
import CustomButton_B from '../../../components/CustomButton_B';
import Back from 'react-native-vector-icons/Ionicons';
import {AppContext} from '../../../contexts/AppProvider';
import {
  GestureHandlerRootView,
  gestureHandlerRootHOC,
} from 'react-native-gesture-handler';
import DraggableFlatList from 'react-native-draggable-flatlist';
import MotionRangeModal from '../../../components/Modal/MotionRange';

const width_ratio = Dimensions.get('window').width / 390;
const height_ratio = Dimensions.get('window').height / 844;

const AddRoutine = ({navigation, route}) => {
  const appcontext = useContext(AppContext);
  const [motionIndexBase, setMotionIndexBase] = useState(
    route.params.motion_index_base,
  );
  const [motionIndexMax, setMotionIndexMax] = useState(
    route.params.motion_index_base,
  );
  const [motionList, setMotionList] = useState([]);
  const [routineName, setRoutineName] = useState(route.params.routineName);
  const [isRoutineName, setIsRoutineName] = useState(false);
  const [isRoutineNameModalVisible, setIsRoutineNameModalVisible] =
    useState(false);
  const [isRoutineNameConfirmDisabled, setIsRoutineNameConfirmDisabled] =
    useState(true);
  const [isRoutineNameConfirm2Disabled, setIsRoutineNameConfirm2Disabled] =
    useState(true);
  const [saveRoutineNameModal, setSaveRotuineNameModal] = useState(false);
  const [isModeModalVisible, setIsModeModalVisible] = useState(false);
  const [isMotionRangeModalVisible, setIsMotionRangeModalVisible] =
    useState(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState(
    motionList.length === 0 ? true : false,
  );
  const [routineId, setRoutineId] = useState(route.params.routine_id);
  const [askSaveModal, setAskSaveModal] = useState(false);

  const [selectedMode, setSelectedMode] = useState({
    modeName: '기본',
    modeDescription: '설명',
  });

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
    setIsModeModalVisible(false);
  };

  const handleSelectPress = () => {
    updatedMotionList = [...motionList];
    updatedMotionList[appcontext.state.targetmotionindex].sets[
      appcontext.state.targetsetindex
    ].mode = selectedMode.modeName;
    setMotionList(updatedMotionList);

    setIsModeModalVisible(false);
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
        appcontext.actions.setRoutineList(currentRoutineList => [
          {
            routine_id: res.data[0]._id,
            routine_name: res.data[0].name,
            body_regions: res.data[0].targets,
            motion_count: res.data[0].motion_count,
          },
          ...currentRoutineList,
        ]);
        appcontext.actions.setRoutineDetailList(currentRoutineDetailList => [
          ...currentRoutineDetailList,
          {
            routine_id: res.data[0]._id,
            routine_name: res.data[0].name,
            body_regions: res.data[0].targets,
            motion_count: res.data[0].motion_count,
            motionList: motionList,
          },
        ]);
      })
      .catch(e => {
        console.log(e);
      });

    navigation.push('MyRoutine');
  };

  const handleBackButton = () => {
    console.log(motionList);
    if (motionList.length === 0) {
      deleteRoutine();
      navigation.reset({routes: [{name: 'MyRoutine'}]});
    } else {
      setAskSaveModal(true);
    }
  };

  const deleteRoutine = async () => {
    await serverAxios
      .put('/routine/delete', {
        routine_ids: routineId,
      })
      .then(res => {})
      .catch(e => {
        console.log(e);
      });
  };

  const saveRoutine = () => {
    if (routineName === '새로운 루틴') {
      setSaveRotuineNameModal(true);
      setAskSaveModal(false);
    } else {
      handleSaveRoutine();
    }
  };

  const saveRoutineWithnoName = () => {};

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            handleBackButton();
            //navigation.reset({routes: [{name: 'MyRoutine'}]});
          }}>
          <Back
            name="arrow-back"
            color={'#242424'}
            size={25 * height_ratio}
            style={{
              marginLeft: 10 * width_ratio,
              marginRight: 10 * width_ratio,
            }}></Back>
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <>
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
            <Icon name="edit" size={16 * height_ratio} color="#808080"></Icon>
          </TouchableOpacity>
        </>
      ),
      headerRight: () => (
        <TouchableOpacity
          disabled={isSaveDisabled}
          onPress={() => {
            saveRoutine();
          }}>
          <Text style={{fontSize: 14 * height_ratio}}>저장</Text>
        </TouchableOpacity>
      ),
    });
  }, [isRoutineName, isSaveDisabled, motionList]);

  useEffect(() => {
    if (route.params.isMotionAdded) {
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

  const handleAddWorkoutMotionPress = () => {
    navigation.push('AddMotion', {
      isRoutine: true,
      routineName: routineName,
      motionList: motionList,
      routine_id: routineId,
      motion_index_base: motionIndexMax + 1,
    });
  };
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

  const handleConfirmPress2 = async () => {
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

    const body2 = {
      user_id: appcontext.state.userid,
      routine_id: routineId,
      motion_list: motionList,
    };

    await serverAxios
      .post('/routine/save', body2)
      .then(res => {
        console.log(res.data);
        appcontext.actions.setRoutineList(currentRoutineList => [
          {
            routine_id: res.data[0].routine_id,
            routine_name: res.data[0].routine_name,
            body_regions: res.data[0].body_regions,
            motion_count: res.data[0].motion_count,
          },
          ...currentRoutineList,
        ]);
        appcontext.actions.setRoutineDetailList(currentRoutineDetailList => [
          ...currentRoutineDetailList,
          {
            routine_id: res.data[0].routine_id,
            routine_name: res.data[0].routine_name,
            body_regions: res.data[0].body_regions,
            motion_count: res.data[0].motion_count,
            motionList: motionList,
          },
        ]);
      })
      .catch(e => {
        console.log(e);
      });
    setSaveRotuineNameModal(false);
    navigation.reset({routes: [{name: 'MyRoutine'}]});
  };

  const renderItem = gestureHandlerRootHOC(({item, index, drag, isActive}) => {
    return (
      <WorkoutItem
        drag={drag}
        isActive={isActive}
        motion_index={item.motion_index}
        id={item.motion_id}
        motion={item}
        isExercising={false}
        motion={item}
        motionList={motionList}
        setMotionList={setMotionList}
        setSelectedMode={setSelectedMode}
        setIsMotionRangeModalVisible={
          setIsMotionRangeModalVisible
        }></WorkoutItem>
    );
  });

  return (
    <View style={styles.pageContainer}>
      <Modal visible={askSaveModal} transparent={true} animationType="fade">
        <View style={styles.modalNameContainer}>
          <View style={styles.askSaveContainer}>
            <Text style={styles.titleText}>루틴 생성 취소</Text>
            <Text
              style={{
                marginTop: 17 * height_ratio,
                fontSize: 14 * height_ratio,
              }}>
              저장하지 않고 나가게되면
            </Text>
            <Text style={{fontSize: 14 * height_ratio}}>
              데이터는 저장되지 않습니다.
            </Text>
            <View style={{flexDirection: 'row', marginTop: 13 * height_ratio}}>
              <View style={{marginRight: 5 * width_ratio}}>
                <CustomButton_W
                  width={126 * width_ratio}
                  onPress={() => {
                    setAskSaveModal(false);
                    deleteRoutine();
                    navigation.reset({routes: [{name: 'MyRoutine'}]});
                  }}
                  content="취소"></CustomButton_W>
              </View>
              <View style={{marginLeft: 5 * width_ratio}}>
                <CustomButton_B
                  width={126 * width_ratio}
                  onPress={() => saveRoutine()}
                  content="저장"></CustomButton_B>
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
                style={{fontSize: 14 * height_ratio}}
                onChangeText={text => {
                  setRoutineName(text);
                  if (text.length === 0) {
                    setIsRoutineNameConfirmDisabled(true);
                  } else {
                    setIsRoutineNameConfirmDisabled(false);
                  }
                }}
                placeholder="루틴 이름"
                inputMode="text"></TextInput>
            </View>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isRoutineNameConfirmDisabled
                  ? '#cbcbfd'
                  : '#5252fa',
                width: 264 * width_ratio,
                height: 56 * height_ratio,
                borderRadius: 8,
                padding: 0,
              }}
              disabled={isRoutineNameConfirmDisabled}
              onPress={handleConfirmPress}>
              <Text style={styles.confirmText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={saveRoutineNameModal}
        transparent={true}
        animationType="fade">
        <View style={styles.modalNameContainer}>
          <View style={styles.routineNameContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>루틴 이름</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={{fontSize: 14 * height_ratio}}
                onChangeText={text => {
                  setRoutineName(text);
                  if (text.length === 0) {
                    setIsRoutineNameConfirm2Disabled(true);
                  } else {
                    setIsRoutineNameConfirm2Disabled(false);
                  }
                }}
                placeholder="루틴 이름"
                inputMode="text"></TextInput>
            </View>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isRoutineNameConfirm2Disabled
                  ? '#cbcbfd'
                  : '#5252fa',
                width: 264 * width_ratio,
                height: 56 * height_ratio,
                borderRadius: 8,
                padding: 0,
              }}
              disabled={isRoutineNameConfirm2Disabled}
              onPress={handleConfirmPress2}>
              <Text style={styles.confirmText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <MotionRangeModal
        isMotionRangeModalVisible={isMotionRangeModalVisible}
        setIsMotionRangeModalVisible={setIsMotionRangeModalVisible}
        motionList={motionList}
        setMotionList={setMotionList}></MotionRangeModal>
      <Modal
        visible={isModeModalVisible}
        transparent={true}
        animationType="fade">
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
      {route.params.isMotionAdded || route.params.isRoutineDetail ? (
        <GestureHandlerRootView style={{height: 625 * height_ratio}}>
          {motionList[0] && (
            <DraggableFlatList
              data={motionList}
              renderItem={renderItem}
              keyExtractor={item => item.motion_index}
              onDragEnd={({data}) => setMotionList(data)}
              showsVerticalScrollIndicator={false}
            />
          )}
        </GestureHandlerRootView>
      ) : (
        <>
          <View style={styles.newRoutineContainer}>
            <Text style={styles.newRoutineText}>
              동작을 추가해 나만의 루틴을 만들어보세요.
            </Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
        </>
      )}

      <TouchableOpacity
        onPress={handleAddWorkoutMotionPress}
        style={styles.addMotionContainer}>
        <Text style={styles.addMotionText}>+ 동작 추가</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddRoutine;

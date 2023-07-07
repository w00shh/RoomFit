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
import Edit from 'react-native-vector-icons/Entypo';
import Back from 'react-native-vector-icons/Ionicons';
import WorkoutItem from '../../../components/WorkoutItem';
import {serverAxios} from '../../../utils/commonAxios';
import CustomButton_W from '../../../components/CustomButton_W';
import CustomButton_B from '../../../components/CustomButton_B';
import {AppContext} from '../../../contexts/AppProvider';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const RoutineDetail = ({navigation, route}) => {
  const appcontext = useContext(AppContext);
  const [motionList, setMotionList] = useState([]);
  const [routineId, setRoutineId] = useState(route.params.routine_id);
  const [workoutId, setWorkoutId] = useState();
  const [routineName, setRoutineName] = useState(route.params.routineName);
  const [isRoutineName, setIsRoutineName] = useState(false);
  const [isRoutineNameModalVisible, setIsRoutineNameModalVisible] =
    useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState(
    motionList.length === 0 ? true : false,
  );
  const [routineNameSaveDisabled, setRoutineNameSaveDisabled] = useState(true);

  const [selectedMode, setSelectedMode] = useState({
    modeName: '기본',
    modeDescription: '설명',
  });

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
      routine_id: routineId,
      motion_list: motionList,
    };
    await serverAxios
      .post('/routine/save', body)
      .then(res => {})
      .catch(e => {
        console.log(e);
      });

    navigation.push('MyRoutine');
  };

  const handleBackButton = () => {
    navigation.reset({routes: [{name: 'HomeScreen'}]});
  };
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            handleBackButton();
            //navigation.reset({routes: [{name: 'MyRoutine'}]});
          }}>
          <Back name="arrow-back" color={'#242424'} size={25} style={{}}></Back>
        </TouchableOpacity>
      ),

      headerTitle: () => (
        <>
          <Text
            style={{
              marginHorizontal: 6 * width_ratio,
              color: 'black',
              fontSize: 16,
              fontWeight: '700',
            }}>
            {routineName}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setIsRoutineNameModalVisible(!isRoutineNameModalVisible);
            }}>
            <Edit name="edit" size={16} color="#808080"></Edit>
          </TouchableOpacity>
        </>
      ),
      headerRight: () => (
        <TouchableOpacity
          disabled={isSaveDisabled}
          onPress={() => {
            handleSaveRoutine();
          }}>
          <Text>저장</Text>
        </TouchableOpacity>
      ),
    });
  }, [isRoutineName, isSaveDisabled, motionList]);

  const getRoutineDetailMotionList = async () => {
    const targeturl = '/routine/detail/' + route.params.routine_id;

    await serverAxios
      .get(targeturl)
      .then(res => {
        res.data.motionList.map((value, key) => {
          setMotionList(currentMotionList => [
            ...currentMotionList,
            {
              isMotionDone: false,
              isMotionDoing: false,
              isFav: value.isFav,
              motion_id: value.motion_id,
              motion_name: value.motion_name,
              imageUrl: value.imageUrl,
              sets: value.sets,
            },
          ]);
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (route.params.isRoutineDetail) {
      getRoutineDetailMotionList();
    } else {
      setMotionList(route.params.motionList);
      setIsSaveDisabled(false);
      for (let i = 0; i < route.params.displaySelected.length; i++) {
        setMotionList(currentMotionList => [
          ...currentMotionList,
          {
            isMotionDone: false,
            isMotionDoing: false,
            isFav: route.params.displaySelected[i].isFav,
            motion_id: route.params.displaySelected[i].motion_id,
            motion_name: route.params.displaySelected[i].motion_name,
            imageUrl: route.params.displaySelected[i].imageUrl,
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
      isRoutine: true,
      isRoutineDetail: true,
      routine_id: routineId,
      routineName: routineName,
      motionList: motionList,
    });
  };

  useEffect(() => {
    if (workoutId) {
      navigation.navigate('WorkoutStart', {
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
      });
    }
  }, [workoutId]);

  const handleStartWorkoutPress = async () => {
    const body = {
      user_id: 'user1',
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
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modeContainer}>
            <View style={styles.modeTitleContainer}>
              <Text style={styles.titleText}>하중모드</Text>
              <Text>{selectedMode.modeName}</Text>
            </View>
            <View>
              <FlatList
                data={modeList}
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

      <ScrollView style={{height: 450 * height_ratio}}>
        {motionList[0] &&
          motionList.map((value, key) => (
            <WorkoutItem
              motion_index={key}
              key={key}
              id={value.motion_id}
              motion={value}
              isExercising={false}
              setIsModalVisible={setIsModalVisible}
              motion={value}
              motionList={motionList}
              setMotionList={setMotionList}></WorkoutItem>
          ))}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonSection}>
          <CustomButton_W
            width={171 * width_ratio}
            content="+ 동작 추가"
            onPress={handleAddMotionPress}
            disabled={false}></CustomButton_W>
        </View>
        <View style={styles.buttonSection}>
          <CustomButton_B
            width={171 * width_ratio}
            content="루틴 운동 시작"
            onPress={handleStartWorkoutPress}
            disabled={false}></CustomButton_B>
        </View>
      </View>
    </View>
  );
};

export default RoutineDetail;

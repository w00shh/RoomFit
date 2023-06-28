import React, {useEffect, useState} from 'react';
import {
  Platform,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  FlatList,
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Entypo';

import WorkoutItem from '../../../components/WorkoutItem';
import {serverAxios} from '../../../utils/commonAxios';

import {useSelector, useDispatch} from 'react-redux';
import CustomButton_W from '../../../components/CustomButton_W';
import CustomButton_B from '../../../components/CustomButton_B';
import Back from 'react-native-vector-icons/Ionicons';

const AddRoutine = ({navigation, route}) => {
  const [motionList, setMotionList] = useState([]);
  const [routineName, setRoutineName] = useState(route.params.routineName);
  const [isRoutineName, setIsRoutineName] = useState(false);
  const [isRoutineNameModalVisible, setIsRoutineNameModalVisible] =
    useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState(
    motionList.length === 0 ? true : false,
  );
  const [routine_id, setRoutine_id] = useState(route.params.routine_id);

  const [selectedMode, setSelectedMode] = useState({
    modeName: '기본',
    modeDescription: '설명',
  });

  const {targetmotionid, targetsetid} = useSelector(state => state.userReducer);

  const dispatch = useDispatch();

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
            height: 72,
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

  const handleModeItemPress = mode => {
    setSelectedMode(mode);
    //console.log(selectedMode.modeName);
  };

  const handleCancelPress = () => {
    setIsModalVisible(false);
  };

  const handleSelectPress = () => {
    updatedMotionList = [...motionList];
    updatedMotionList[targetmotionid].sets[targetsetid].mode =
      selectedMode.modeName;
    setMotionList(updatedMotionList);

    setIsModalVisible(false);
  };

  const handleSaveRoutine = async () => {
    console.log('routine id: ' + routine_id);
    const body = {
      routine_id: routine_id,
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

    navigation.push('MyRoutine');
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.reset({routes: [{name: 'MyRoutine'}]})}>
          <Back
            name="arrow-back"
            color={'#242424'}
            size={25}
            style={{marginLeft: 10, marginRight: 10}}></Back>
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <>
          <Text
            style={{
              marginHorizontal: 6,
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
            <Icon name="edit" size={16} color="#808080"></Icon>
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
  }, [isRoutineName, isSaveDisabled]);

  const getRoutineDetailMotionList = async () => {
    const targeturl = '/routine/detail/' + route.params.routine_id;
    console.log(targeturl);
    await serverAxios
      .get(targeturl)
      .then(res => {
        res.data.motionList.map((value, key) => {
          console.log(value);
          setMotionList(currentMotionList => [
            ...currentMotionList,
            {
              isFavorite: value.isFav,
              motion_id: value.motion_id,
              motionName: value.motion_name,
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
    }

    if (route.params.isMotionAdded) {
      setMotionList(route.params.motionList);
      setIsSaveDisabled(false);
      for (let i = 0; i < route.params.displaySelected.length; i++) {
        setMotionList(currentMotionList => [
          ...currentMotionList,
          {
            isFavorite: route.params.displaySelected[i].isFavorite,
            motion_id: route.params.displaySelected[i].motion_id,
            motionName: route.params.displaySelected[i].motionName,
            imageUrl: route.params.displaySelected[i].imageUrl,
            sets: [
              {
                weight: 0,
                reps: 0,
                mode: '기본',
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

  const handleAddWorkoutMotionPress = () => {
    navigation.push('AddMotion', {
      isRoutine: true,
      routineName: routineName,
      motionList: motionList,
      routine_id: routine_id,
    });
  };
  const handleConfirmPress = async () => {
    setIsRoutineName(!isRoutineName);
    setIsRoutineNameModalVisible(!isRoutineNameModalVisible);

    const body = {
      routine_id: routine_id,
      routine_name: routineName,
    };
    await serverAxios
      .put('/routine/nameChange', body)
      .then(res => {})
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
                styles={styles.routineNameInput}
                onChangeText={text => {
                  setRoutineName(text);
                }}
                placeholder="루틴 이름"
                inputMode="text"></TextInput>
            </View>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirmPress}>
              <Text style={styles.confirmText}>확인</Text>
            </TouchableOpacity>
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
                  width={171}
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
      {route.params.isMotionAdded || route.params.isRoutineDetail ? (
        <ScrollView style={{height: 450}}>
          {motionList[0] &&
            motionList.map((value, key) => (
              <WorkoutItem
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
      ) : (
        <>
          <View style={styles.newRoutineContainer}>
            <Text style={styles.newRoutineText}>
              동작을 추가해 나만의 루틴을 만들어보세요.
            </Text>
          </View>
          <ScrollView></ScrollView>
        </>
      )}

      {!route.params.isRoutineDetail ? (
        <TouchableOpacity
          onPress={handleAddWorkoutMotionPress}
          style={styles.addMotionContainer}>
          <Text style={styles.addMotionText}>+ 동작 추가</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.buttonContainer}>
          <View style={styles.buttonSection}>
            <CustomButton_W
              width={171}
              content="+ 동작 추가"
              onPress={() => {
                //handleAddMotionPress();
              }}
              disabled={false}></CustomButton_W>
          </View>
          <View style={styles.buttonSection}>
            <CustomButton_B
              width={171}
              content="루틴 운동 시작"
              //onPress={handleStartWorkoutPress}
              disabled={false}></CustomButton_B>
          </View>
        </View>
      )}
    </View>
  );
};

export default AddRoutine;

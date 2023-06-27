import React, {useEffect, useState} from 'react';
import {
  Platform,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Entypo';

import WorkoutItem from '../../../components/WorkoutItem';
import {serverAxios} from '../../../utils/commonAxios';

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

  useEffect(() => {
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
        <View style={styles.modalContainer}>
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
      {route.params.isMotionAdded ? (
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

      <TouchableOpacity
        onPress={handleAddWorkoutMotionPress}
        style={styles.addMotionContainer}>
        <Text style={styles.addMotionText}>
          + 동작 추가{String(routine_id)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddRoutine;

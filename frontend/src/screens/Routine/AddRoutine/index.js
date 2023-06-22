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
import WorkoutReady from '../../WorkoutReady';
import WorkoutItem from '../../../components/WorkoutItem';

const AddRoutine = ({navigation, route}) => {
  const [motionList, setMotionList] = useState([]);
  const [routineName, setRoutineName] = useState(route.params.routineName);
  const [isRoutineName, setIsRoutineName] = useState(false);
  const [isRoutineNameModalVisible, setIsRoutineNameModalVisible] =
    useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  const [selectedMode, setSelectedMode] = useState({
    modeName: '기본',
    modeDescription: '설명',
  });

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
            navigation.navigate('MyRoutine');
          }}>
          <Text>저장</Text>
        </TouchableOpacity>
      ),
    });
  }, [isRoutineName]);

  useEffect(() => {
    if (route.params.isMotionAdded) {
      console.log(route.params.selectedMotionKeys);
      console.log('route.params.isMotionAdded');
      for (let i = 0; i < route.params.selectedMotionKeys.length; i++) {
        setMotionList(currentMotionList => [
          ...currentMotionList,
          {
            motion_id: route.params.selectedMotionKeys[i],
            motionName: 'first motion',
            imageUrl: '',
            set: [{weight: 0, reps: 0, mode: '기본'}],
          },
        ]);
      }
    }
  }, []);

  useEffect(() => {
    if (motionList.length > 0) {
      setIsSaveDisabled(false);
    } else {
      setIsSaveDisabled(true);
    }
  }, [motionList.length]);

  const handleAddWorkoutMotionPress = () => {
    navigation.navigate('AddMotion', {
      isRoutine: true,
      routineName: routineName,
    });
  };
  const handleConfirmPress = () => {
    setIsRoutineName(!isRoutineName);
    setIsRoutineNameModalVisible(!isRoutineNameModalVisible);
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
                motionList={motionList}
                setMotionList={setMotionList}
                selectedMode={selectedMode}></WorkoutItem>
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

      <View style={styles.addMotionContainer}>
        <TouchableOpacity onPress={handleAddWorkoutMotionPress}>
          <Text style={styles.addMotionText}>+ 동작 추가</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddRoutine;

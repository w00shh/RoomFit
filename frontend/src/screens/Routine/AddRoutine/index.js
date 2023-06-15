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

const AddRoutine = ({navigation}) => {
  const [routineName, setRoutineName] = useState('새로운 루틴');
  const [isRoutineName, setIsRoutineName] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
              setIsModalVisible(!isModalVisible);
            }}>
            <Icon name="edit" size={16} color="#808080"></Icon>
          </TouchableOpacity>
        </>
      ),
      headerRight: () => (
        <TouchableOpacity>
          <Text>저장</Text>
        </TouchableOpacity>
      ),
    });
  }, [isRoutineName]);

  const handleAddWorkoutMotionPress = () => {
    navigation.navigate('AddMotion');
  };
  const handleConfirmPress = () => {
    setIsRoutineName(!isRoutineName);
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.pageContainer}>
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
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
      <View style={styles.newRoutineContainer}>
        <Text style={styles.newRoutineText}>
          동작을 추가해 나만의 루틴을 만들어보세요.
        </Text>
      </View>
      <ScrollView></ScrollView>
      <View style={styles.addWorkoutMotionContainer}>
        <TouchableOpacity onPress={handleAddWorkoutMotionPress}>
          <Text style={styles.addWorkoutMotionText}>+ 동작 추가</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddRoutine;

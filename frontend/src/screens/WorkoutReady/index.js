import React, {useEffect, useState} from 'react';
import {Modal, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import WorkoutItem from '../../components/WorkoutItem/';
import CustomButton_W from '../../components/CustomButton_W';
import CustomButton_B from '../../components/CustomButton_B';

const WorkoutReady = ({navigation, route}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [workoutList, setWorkoutList] = useState([]);

  useEffect(() => {
    for (let i = 0; i < route.params.selectedMotionKeys.length; i++) {
      setWorkoutList(currentWorkoutList => [
        ...currentWorkoutList,
        {
          motion_id: route.params.selectedMotionKeys[i],
          set: [],
        },
      ]);
    }
  }, []);

  const handleCancelPress = () => {
    setIsModalVisible(false);
  };

  const handleSelectPress = () => {
    setIsModalVisible(false);
  };

  const handleAddMotionPress = () => {
    navigation.navigate('AddMotion');
  };

  const handleStartWorkoutPress = () => {
    console.log(workoutList[0]);
  };
  return (
    <View style={styles.pageContainer}>
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modeContainer}>
            <View style={styles.modeTitleContainer}>
              <Text style={styles.titleText}>하중모드</Text>
            </View>
            <View>
              <View style={styles.modeItemContainer}>
                <Text style={styles.modeText}>기본모드</Text>
                <Text style={styles.descriptionText}>설명</Text>
              </View>
              <View style={styles.modeItemContainer}>
                <Text style={styles.modeText}>고무밴드</Text>
                <Text style={styles.descriptionText}>설명</Text>
              </View>
              <View style={styles.modeItemContainer}>
                <Text style={styles.modeText}>모드1</Text>
                <Text style={styles.descriptionText}>설명</Text>
              </View>
              <View style={styles.modeItemContainer}>
                <Text style={styles.modeText}>모드2</Text>
                <Text style={styles.descriptionText}>설명</Text>
              </View>
              <View style={styles.modeItemContainer}>
                <Text style={styles.modeText}>모드3</Text>
                <Text style={styles.descriptionText}>설명</Text>
              </View>
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
      <ScrollView>
        {workoutList &&
          workoutList.map((value, key) => (
            <WorkoutItem
              key={key}
              id={value.motion_id}
              motion={value}
              isExercising={false}
              setIsModalVisible={setIsModalVisible}
              workoutList={workoutList}
              setWorkoutList={setWorkoutList}></WorkoutItem>
          ))}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonSection}>
          <CustomButton_W
            width={171}
            content="+ 동작 추가"
            onPress={handleAddMotionPress}
            disabled={false}></CustomButton_W>
        </View>
        <View style={styles.buttonSection}>
          <CustomButton_B
            width={171}
            content="운동 시작"
            onPress={handleStartWorkoutPress}
            disabled={false}></CustomButton_B>
        </View>
      </View>
    </View>
  );
};

export default WorkoutReady;

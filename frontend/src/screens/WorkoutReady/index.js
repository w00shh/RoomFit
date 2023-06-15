import React, {useState} from 'react';
import {ScrollView, Text, TouchableWithoutFeedback, View} from 'react-native';
import styles from './styles';
import WorkoutItem from '../../components/WorkoutItem/';
import CustomButton_W from '../../components/CustomButton_W';
import CustomButton_B from '../../components/CustomButton_B';

const WorkoutReady = ({navigation}) => {
  const [workOutList, setWorkoutList] = useState([]);

  const handleAddMotionPress = () => {
    navigation.navigate('AddMotion');
  };
  return (
    <View style={styles.pageContainer}>
      <ScrollView>
        <WorkoutItem isExercising={false}></WorkoutItem>
        <WorkoutItem isExercising={false}></WorkoutItem>
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
            disabled={false}></CustomButton_B>
        </View>
      </View>
    </View>
  );
};

export default WorkoutReady;

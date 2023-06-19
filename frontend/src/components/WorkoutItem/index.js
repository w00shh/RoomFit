import {Text, TouchableOpacity, View} from 'react-native';
import WorkoutTitle from '../WorkoutTitle';
import styles from './styles';
import Icon from 'react-native-vector-icons/Feather';
import SetItem from '../SetItem';
import {useEffect, useState} from 'react';

const WorkoutItem = props => {
  const [set, setSet] = useState([]);

  useEffect(() => {});
  const handleMotionDeletePress = id => {
    props.setWorkoutList(
      props.workoutList.filter(item => item.motion_id !== id),
    );
  };

  const handleSetDeletePress = id => {
    const updatedWorkoutList = [...props.workoutList];
    updatedWorkoutList[
      updatedWorkoutList.findIndex(item => item.motion_id === id)
    ].set.pop();
    props.setWorkoutList(updatedWorkoutList);
  };

  const handleSetAddPress = id => {
    const updatedWorkoutList = [...props.workoutList];
    updatedWorkoutList[
      updatedWorkoutList.findIndex(item => item.motion_id === id)
    ].set.push({
      weight: 0,
      reps: 0,
      mode: 'normal',
    });
    props.setWorkoutList(updatedWorkoutList);
  };
  return (
    <View style={styles.workoutItemContainer}>
      <WorkoutTitle motion_id={props.motion.motion_id}></WorkoutTitle>
      <SetItem
        isKey={true}
        isExercising={props.isExercising}
        setIsModalVisible={props.setIsModalVisible}></SetItem>
      {props.workoutList[
        props.workoutList.findIndex(item => item.motion_id === props.id)
      ].set &&
        props.workoutList[
          props.workoutList.findIndex(item => item.motion_id === props.id)
        ].set.map((value, key) => (
          <SetItem
            motion_id={props.id}
            set_id={key}
            workoutList={props.workoutList}
            setWorkoutList={props.setWorkoutList}
            isKey={false}
            isExercising={props.isExercising}
            setIsModalVisible={props.setIsModalVisible}
            motion={props.motion}></SetItem>
        ))}
      {/* <SetItem
        isKey={false}
        isExercising={props.isExercising}
        setIsModalVisible={props.setIsModalVisible}
        motion={props.motion}></SetItem> */}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleMotionDeletePress(props.id);
          }}>
          <Icon
            style={styles.icon}
            name="trash"
            size={12}
            color="#808080"></Icon>
          <Text>동작 삭제</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleSetDeletePress(props.id);
          }}>
          <Icon
            style={styles.icon}
            name="minus"
            size={12}
            color="#808080"></Icon>
          <Text>세트 삭제</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleSetAddPress(props.id);
          }}>
          <Icon
            style={styles.icon}
            name="plus"
            size={12}
            color="#808080"></Icon>
          <Text>세트 추가</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WorkoutItem;

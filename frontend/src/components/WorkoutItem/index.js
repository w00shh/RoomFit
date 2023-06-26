import {Text, TouchableOpacity, View} from 'react-native';
import WorkoutTitle from '../WorkoutTitle';
import styles from './styles';
import Icon from 'react-native-vector-icons/Feather';
import SetItem from '../SetItem';
import {useEffect, useState} from 'react';

const WorkoutItem = props => {
  const [set, setSet] = useState([]);

  useEffect(() => {
    console.log('ss');
    console.log(props.motion);
  }, []);
  const handleMotionDeletePress = id => {
    props.setMotionList(props.motionList.filter(item => item.motion_id !== id));
  };

  const handleSetDeletePress = id => {
    const updatedMotionList = [...props.motionList];
    updatedMotionList[
      updatedMotionList.findIndex(item => item.motion_id === id)
    ].set.pop();
    if (
      updatedMotionList[
        updatedMotionList.findIndex(item => item.motion_id === id)
      ].set.length === 0
    ) {
      handleMotionDeletePress(id);
    } else {
      props.setMotionList(updatedMotionList);
    }
  };

  const handleSetAddPress = id => {
    const updatedMotionList = [...props.motionList];
    updatedMotionList[
      updatedMotionList.findIndex(item => item.motion_id === id)
    ].set.push({
      weight: 0,
      reps: 0,
      mode: '기본',
      isDone: false,
    });
    props.setMotionList(updatedMotionList);
  };
  return (
    <View style={styles.workoutItemContainer}>
      <WorkoutTitle motion={props.motion}></WorkoutTitle>
      <SetItem
        isKey={true}
        isExercising={props.isExercising}
        setIsModalVisible={props.setIsModalVisible}></SetItem>
      {props.motionList[
        props.motionList.findIndex(item => item.motion_id === props.id)
      ].set &&
        props.motionList[
          props.motionList.findIndex(item => item.motion_id === props.id)
        ].set.map((value, key) => (
          <SetItem
            key={key}
            motion_id={props.id}
            set_id={key}
            motionList={props.motionList}
            setMotionList={props.setMotionList}
            isKey={false}
            isExercising={props.isExercising}
            setIsModalVisible={props.setIsModalVisible}
            motion={props.motion}
            defaultWeight={value.weight}
            defaultReps={value.reps}
            defualtMode={value.mode}
            defaultIsDone={value.isDone}
            mode={props.selectedMode}></SetItem>
        ))}

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

import {Text, TouchableOpacity, View} from 'react-native';
import WorkoutTitle from '../WorkoutTitle';
import styles from './styles';
import Icon from 'react-native-vector-icons/Feather';
import SetItem from '../SetItem';

const WorkoutItem = props => {
  const handleMotionDeletePress = motion_index => {
    const updatedMotionList = [...props.motionList];
    updatedMotionList.splice(motion_index, 1);
    props.setMotionList(updatedMotionList);
  };

  const handleSetDeletePress = motion_index => {
    const updatedMotionList = [...props.motionList];
    updatedMotionList[props.motion_index].sets.pop();
    if (updatedMotionList[props.motion_index].sets.length === 0) {
      handleMotionDeletePress(motion_index);
    } else {
      props.setMotionList(updatedMotionList);
    }
  };

  const handleSetAddPress = id => {
    const updatedMotionList = [...props.motionList];
    updatedMotionList[props.motion_index].sets.push({
      weight: 0,
      reps: 1,
      mode: '기본',
      isDone: false,
    });
    props.setMotionList(updatedMotionList);
  };
  return (
    <View style={styles.workoutItemContainer}>
      <Text>{String(props.motionList[props.motion_index].isMotionDoing)}</Text>
      <WorkoutTitle motion={props.motion}></WorkoutTitle>
      <SetItem
        isKey={true}
        isExercising={props.isExercising}
        setIsModalVisible={props.setIsModalVisible}></SetItem>
      {props.motionList[props.motion_index].sets &&
        props.motionList[props.motion_index].sets.map((value, key) => (
          <SetItem
            key={key}
            motion_id={props.motion_index}
            target_motion_id={props.motion_index}
            set={value}
            set_id={key}
            motionList={props.motionList}
            setMotionList={props.setMotionList}
            isKey={false}
            isExercising={props.isExercising}
            setIsModalVisible={props.setIsModalVisible}
            motion={props.motion}
            weight={value.weight}
            reps={value.reps}
            mode={value.mode}
            isDone={value.isDone}></SetItem>
        ))}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          disabled={
            props.motionList[props.motion_index].isMotionDone ||
            props.motionList[props.motion_index].isMotionDoing
          }
          style={styles.button}
          onPress={() => {
            handleMotionDeletePress(props.motion_index);
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
          disabled={
            props.motionList[props.motion_index].isMotionDone ||
            props.motionList[props.motion_index].isMotionDoing
          }
          onPress={() => {
            handleSetDeletePress(props.motion_index);
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
          disabled={props.motionList[props.motion_index].isMotionDone}
          onPress={() => {
            handleSetAddPress(props.motion_index);
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

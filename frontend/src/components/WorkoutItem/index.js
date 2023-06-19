import {Text, TouchableOpacity, View} from 'react-native';
import WorkoutTitle from '../WorkoutTitle';
import styles from './styles';
import Icon from 'react-native-vector-icons/Feather';
import SetItem from '../SetItem';
const WorkoutItem = props => {
  const handleWorkoutDelete = () => {};

  const handleSetDelete = () => {};

  const handleSetAdd = () => {};
  return (
    <View style={styles.workoutItemContainer}>
      <WorkoutTitle></WorkoutTitle>
      <SetItem
        isKey={true}
        isExercising={props.isExercising}
        setIsModalVisible={props.setIsModalVisible}></SetItem>
      <SetItem
        isKey={false}
        isExercising={props.isExercising}
        setIsModalVisible={props.setIsModalVisible}></SetItem>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Icon
            style={styles.icon}
            name="trash"
            size={12}
            color="#808080"></Icon>
          <Text>동작 삭제</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Icon
            style={styles.icon}
            name="minus"
            size={12}
            color="#808080"></Icon>
          <Text>세트 삭제</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
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

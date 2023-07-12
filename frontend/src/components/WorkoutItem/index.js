import {Text, TouchableOpacity, View, Dimensions} from 'react-native';
import WorkoutTitle from '../WorkoutTitle';
import styles from './styles';
import Icon from 'react-native-vector-icons/Feather';
import SetItem from '../SetItem';

//svg
import Bin from '../../assets/svg/buttons/single/bin.svg';
import Minus from '../../assets/svg/buttons/single/minus.svg';
import Plus from '../../assets/svg/buttons/single/plus.svg';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

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
    console.log(Array.isArray(updatedMotionList[props.motion_index].sets));
    updatedMotionList[props.motion_index].sets.push({
      weight: 0,
      reps: 1,
      mode: '기본',
      isDoing: false,
      isDone: false,
    });
    props.setMotionList(updatedMotionList);
  };
  return (
    <View style={styles.workoutItemContainer}>
      {/* <Text>
        isMotionDone:{String(props.motionList[props.motion_index].isMotionDone)}
      </Text>
      <Text>
        isMotionDoing:
        {String(props.motionList[props.motion_index].isMotionDoing)}
      </Text> */}
      <WorkoutTitle motion={props.motion}></WorkoutTitle>
      <View
        style={{
          flexDirection: 'column',
          gap: 8 * height_ratio,
        }}>
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
              setSelectedMode={props.setSelectedMode}
              isKey={false}
              isExercising={props.isExercising}
              setIsModalVisible={props.setIsModalVisible}
              motion={props.motion}
              weight={value.weight}
              reps={value.reps}
              mode={value.mode}
              isDoing={value.isDoing}
              isDone={value.isDone}></SetItem>
          ))}
      </View>

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
          <Bin height={16 * height_ratio} width={16 * width_ratio} />
          <Text
            style={{
              fontSize: 14 * height_ratio,
              lineHeight: 21 * height_ratio,
            }}>
            동작 삭제
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          disabled={
            props.motionList[props.motion_index].isMotionDone ||
            (props.motionList[props.motion_index].isMotionDoing &&
              props.motionList[props.motion_index].doingSetIndex + 1 ===
                props.motionList[props.motion_index].sets.length)
          }
          onPress={() => {
            handleSetDeletePress(props.motion_index);
          }}>
          <Minus height={16 * height_ratio} width={16 * width_ratio} />
          <Text
            style={{
              fontSize: 14 * height_ratio,
              lineHeight: 21 * height_ratio,
            }}>
            세트 삭제
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          disabled={props.motionList[props.motion_index].isMotionDone}
          onPress={() => {
            handleSetAddPress(props.motion_index);
          }}>
          <Plus height={16 * height_ratio} width={16 * width_ratio} />
          <Text
            style={{
              fontSize: 14 * height_ratio,
              lineHeight: 21 * height_ratio,
            }}>
            세트 추가
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WorkoutItem;

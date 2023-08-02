import {Dimensions, Modal, Text, View} from 'react-native';
import styles from './styles';
import CustomButton_W from '../../CustomButton_W';
import CustomButton_B from '../../CustomButton_B';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const ShareWorkoutModal = props => {
  return (
    <Modal
      visible={props.isShareWorkoutModalVisible}
      transparent={true}
      animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.shareWorkoutContainer}>
          <View style={styles.popuptopContainer}></View>
          <View style={styles.contentContainer}>
            <Text style={styles.titleText}>오늘의 운동기록</Text>
            <View style={styles.workoutRecordContainer}>
              <View style={styles.workoutRecordTop}>
                <View style={styles.workoutRecordLeft}>
                  <Text>2023년 8월 22일</Text>
                  <Text>오전 10:49 - 오후 12: 00</Text>
                </View>
                <View style={styles.workoutRecordRight}></View>
              </View>
            </View>
            <Text style={styles.descriptionText}>
              오늘의 운동기록을 공유하시겠습니까?
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton_W
              width={126 * width_ratio}
              content="아니요"
              //onPress={props.handleCancelPress}
              disabled={false}
              marginVertical={0}></CustomButton_W>
            <CustomButton_B
              width={126 * width_ratio}
              content="공유"
              //onPress={props.handleDeletePress}
              disabled={false}
              marginVertical={0}></CustomButton_B>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ShareWorkoutModal;

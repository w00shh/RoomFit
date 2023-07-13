import {
  Dimensions,
  Modal,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import CustomButton_W from '../../CustomButton_W';
import CustomButton_B from '../../CustomButton_B';
import styles from './styles';

//svg
import RadioDefault from '../../../assets/svg/buttons/default/radio.svg';
import RadioActive from '../../../assets/svg/buttons/active/radio.svg';
import {useState} from 'react';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const MotionRangeModal = props => {
  const [isOff, setIsOff] = useState(true);
  const [isAuto, setIsAuto] = useState(false);
  const [isManual, setIsManual] = useState(false);

  const handleOffPress = () => {
    setIsOff(true);
    setIsAuto(false);
    setIsManual(false);
  };

  const handleAutoPress = () => {
    setIsOff(false);
    setIsAuto(true);
    setIsManual(false);
  };

  const handleManualPress = () => {
    setIsOff(false);
    setIsAuto(false);
    setIsManual(true);
  };

  const handleCancelPress = () => {
    props.setIsMotionRangeModalVisible(false);
  };
  const handleSelectPress = () => {
    props.setIsMotionRangeModalVisible(false);
  };

  return (
    <Modal
      visible={props.isMotionRangeModalVisible}
      transparent={true}
      animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.motionRangeContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>가동범위 자동인식</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>
              가동 범위 설정 시, 가동범위를 벗어난 지점에서는
            </Text>
            <Text style={styles.descriptionText}>
              무게가 자동으로 조정됩니다.
            </Text>
          </View>
          <View style={styles.radioContainer}>
            <TouchableWithoutFeedback onPress={handleOffPress}>
              {isOff ? (
                <RadioActive
                  width={24 * width_ratio}
                  height={24 * width_ratio}></RadioActive>
              ) : (
                <RadioDefault
                  width={24 * width_ratio}
                  height={24 * width_ratio}></RadioDefault>
              )}
            </TouchableWithoutFeedback>
            <Text style={styles.radioText}>끄기</Text>
            <TouchableWithoutFeedback onPress={handleAutoPress}>
              {isAuto ? (
                <RadioActive
                  width={24 * width_ratio}
                  height={24 * width_ratio}></RadioActive>
              ) : (
                <RadioDefault
                  width={24 * width_ratio}
                  height={24 * width_ratio}></RadioDefault>
              )}
            </TouchableWithoutFeedback>
            <Text style={styles.radioText}>자동설정</Text>
            <TouchableWithoutFeedback onPress={handleManualPress}>
              {isManual ? (
                <RadioActive
                  width={24 * width_ratio}
                  height={24 * width_ratio}></RadioActive>
              ) : (
                <RadioDefault
                  width={24 * width_ratio}
                  height={24 * width_ratio}></RadioDefault>
              )}
            </TouchableWithoutFeedback>
            <Text style={styles.radioText}>직접입력</Text>
          </View>
          {isAuto && (
            <View style={styles.autoContainer}>
              <View style={styles.rangeInputContainer}>
                <TextInput
                  style={styles.inputContainer}
                  placeholderTextColor={'#acacac'}
                  keyboardType="numeric"
                  onChangeText={text => {}}></TextInput>
                <Text style={styles.placeholderText}>cm</Text>
              </View>
              <Text
                style={{
                  fontSize: 12,
                  color: '#000',
                  lineHeight: 56 * height_ratio,
                }}>
                -
              </Text>
              <View style={styles.rangeInputContainer}>
                <TextInput
                  style={styles.inputContainer}
                  placeholderTextColor={'#acacac'}
                  keyboardType="numeric"
                  onChangeText={text => {}}></TextInput>
                <Text style={styles.placeholderText}>cm</Text>
              </View>
            </View>
          )}
          {isManual && (
            <View style={styles.autoContainer}>
              <View style={styles.rangeInputContainer}>
                <TextInput
                  style={styles.inputContainer}
                  placeholderTextColor={'#acacac'}
                  keyboardType="numeric"
                  onChangeText={text => {}}></TextInput>
                <Text style={styles.placeholderText}>cm</Text>
              </View>
              <Text
                style={{
                  fontSize: 12,
                  color: '#000',
                  lineHeight: 56 * height_ratio,
                }}>
                -
              </Text>
              <View style={styles.rangeInputContainer}>
                <TextInput
                  style={styles.inputContainer}
                  placeholderTextColor={'#acacac'}
                  keyboardType="numeric"
                  onChangeText={text => {}}></TextInput>
                <Text style={styles.placeholderText}>cm</Text>
              </View>
            </View>
          )}
          <View style={styles.buttonContainer}>
            <View>
              <CustomButton_W
                width={171 * width_ratio}
                content="취소"
                onPress={handleCancelPress}
                disabled={false}
                marginVertical={0}></CustomButton_W>
            </View>
            <View>
              <CustomButton_B
                width={171 * width_ratio}
                content="선택 완료"
                onPress={handleSelectPress}
                disabled={false}
                marginVertical={0}></CustomButton_B>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MotionRangeModal;

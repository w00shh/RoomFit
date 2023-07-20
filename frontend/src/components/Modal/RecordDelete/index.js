import {Dimensions, Modal, Text, View} from 'react-native';
import styles from './styles';
import CustomButton_W from '../../CustomButton_W';
import CustomButton_B from '../../CustomButton_B';
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';
import {useEffect} from 'react';
import {serverAxios} from '../../../utils/commonAxios';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const RecordDeleteModal = props => {
  return (
    <Modal
      visible={props.isRecordDeleteModalVisible}
      transparent={true}
      animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.recordDeleteContainer}>
          <View style={styles.popuptopContainer}></View>
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>동작 기록 삭제</Text>
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionText}>
                동작 기록을 삭제하시겠습니까?
              </Text>
              <Text style={styles.descriptionText}>
                삭제 후에는 복구할 수 없습니다.
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <CustomButton_W
                width={126 * width_ratio}
                content="취소"
                onPress={props.handleCancelPress}
                disabled={false}
                marginVertical={0}></CustomButton_W>
              <CustomButton_B
                width={126 * width_ratio}
                content="삭제"
                onPress={props.handleDeletePress}
                disabled={false}
                marginVertical={0}></CustomButton_B>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RecordDeleteModal;

import {Modal, Text, View, Dimensions} from 'react-native';
import styles from './styles';
import {useEffect, useState} from 'react';
import Input from '../../../../components/Input';
import CustomButton_B from '../../../../components/CustomButton_B';
import {serverAxios} from '../../../../utils/commonAxios';

const width_ratio = Dimensions.get('window').width / 390;
const height_ratio = Dimensions.get('window').height / 844;

const PasswordFind = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [passwordFindDisabled, setPasswordFindDisabled] = useState(true);
  const [isPasswordFindModalVisible, setIsPasswordFindModalVisible] =
    useState(false);

  const handlePasswordFindDisabled = () => {
    if (email.length > 0) {
      setPasswordFindDisabled(false);
    } else {
      setPasswordFindDisabled(true);
    }
  };
  const handlePasswordFindPress = async () => {};

  useEffect(() => {
    handlePasswordFindDisabled();
  }, [email]);

  return (
    <View style={styles.pageContainer}>
      <Modal
        visible={isPasswordFindModalVisible}
        transparent={true}
        animationType="fade">
        <View style={styles.modalContainer}></View>
      </Modal>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>비밀번호 찾기</Text>
      </View>
      <Input
        label="이메일"
        onChangeText={text => setEmail(text)}
        placeholder="이메일 입력"
        defaultValue={email}
        inputMode="email"
        keyboardType="email-address"></Input>
      <CustomButton_B
        width={358 * width_ratio}
        onPress={handlePasswordFindPress}
        disabled={passwordFindDisabled}
        content="이메일 보내기"></CustomButton_B>
      <View style={styles.customerServiceCenterContainer}>
        <Text style={styles.descriptionText}>기억이 안나시나요?</Text>
        <Text style={styles.customerServiceCenterText}>
          고객 센터에 문의하기
        </Text>
      </View>
    </View>
  );
};

export default PasswordFind;

import {Modal, Text, View} from 'react-native';
import styles from './styles';
import {useEffect, useState} from 'react';
import Input from '../../../../components/Input';
import CustomButton_B from '../../../../components/CustomButton_B';
import {serverAxios} from '../../../../utils/commonAxios';

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
        width={356}
        onPress={handlePasswordFindPress}
        disabled={passwordFindDisabled}
        content="비밀번호 찾기"></CustomButton_B>
    </View>
  );
};

export default PasswordFind;

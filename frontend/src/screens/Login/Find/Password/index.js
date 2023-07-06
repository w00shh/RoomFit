import {Modal, Text, View, Dimensions} from 'react-native';
import styles from './styles';
import {useEffect, useState} from 'react';
import Input from '../../../../components/Input';
import CustomButton_B from '../../../../components/CustomButton_B';
import CheckMark from 'react-native-vector-icons/Ionicons';
import {serverAxios} from '../../../../utils/commonAxios';
import CustomButton_W from '../../../../components/CustomButton_W';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const PasswordFind = ({navigation}) => {
  const [isTempPasswordSent, setIsTempPasswordSent] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sendEmailDisabled, setSendEmailDisabled] = useState(true);
  const [isPasswordFindModalVisible, setIsPasswordFindModalVisible] =
    useState(false);

  const handlePasswordFindDisabled = () => {
    if (email.length > 0) {
      setSendEmailDisabled(false);
    } else {
      setSendEmailDisabled(true);
    }
  };
  const handleMailSendPress = async () => {
    const targetUrl = '/account/find-password?email=' + email;
    await serverAxios
      .get(targetUrl)
      .then(res => {
        setIsTempPasswordSent(true);
        console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const handleMailResendPress = async () => {};

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
      {isTempPasswordSent ? (
        <>
          <View
            style={{
              paddingVertical: 24 * height_ratio,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CheckMark
              name="checkmark-circle-outline"
              color={'#5252fa'}
              size={48}
              style={{
                marginVertical: 24 * height_ratio,
              }}></CheckMark>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 16, fontWeight: '700'}}>{email}</Text>
              <Text> 으로</Text>
            </View>
            <Text>비밀번호 변경 가능한 링크를 보냈습니다.</Text>
          </View>
          <CustomButton_W
            width={358 * width_ratio}
            marginVertical={12 * height_ratio}
            onPress={handleMailSendPress}
            content="메일 재전송하기"></CustomButton_W>
          <CustomButton_B
            width={358 * width_ratio}
            marginVertical={12 * height_ratio}
            onPress={() => {
              navigation.navigate('Login');
            }}
            content="로그인 화면으로 이동하기"></CustomButton_B>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>
              * 메일이 오지 않는 경우 스팸으로 분류됐을 수 있으니
            </Text>
            <Text style={styles.descriptionText}>
              스팸함을 꼭 확인해주세요.
            </Text>
          </View>
        </>
      ) : (
        <>
          <Input
            label="이메일"
            onChangeText={text => setEmail(text)}
            placeholder="이메일 입력"
            defaultValue={email}
            inputMode="email"
            keyboardType="email-address"></Input>
          <CustomButton_B
            width={358 * width_ratio}
            onPress={handleMailSendPress}
            disabled={sendEmailDisabled}
            content="이메일 보내기"></CustomButton_B>
          <View style={styles.customerServiceCenterContainer}>
            <Text style={styles.descriptionText}>기억이 안나시나요?</Text>
            <Text style={styles.customerServiceCenterText}>
              고객 센터에 문의하기
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default PasswordFind;

import React, {useState, useEffect, useContext} from 'react';
import {
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
  Modal,
} from 'react-native';
import styles from './styles';
import {AppContext} from '../../../contexts/AppProvider';
import {serverAxios} from '../../../utils/commonAxios';
import DatePicker from 'react-native-date-picker';

//svg
import Back from '../../../assets/svg/buttons/single/back.svg';
import Check from '../../../assets/svg/buttons/active/check.svg';
import Drop from '../../../assets/svg/buttons/single/drop.svg';
import CustomButton_B from '../../../components/CustomButton_B';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const Birthday = ({navigation, route}) => {
  const [tempBirthDay, setTempBirthDay] = useState('생년월일 입력');
  const [date, setDate] = useState(new Date());
  const appcontext = useContext(AppContext);
  const [userID, setUserID] = useState(route.params.id);
  const [email, setEmail] = useState(route.params.email);
  const [modalVisible, setModalVisible] = useState(false);

  const handleBackButton = async () => {
    navigation.navigate('Intro');
  };

  const saveAndNext = () => {
    updateBrithday();
    navigation.push('Login', {
      isRegister: true,
      email: email,
    });
  };

  const saveBirthday = () => {
    setTempBirthDay(
      `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`,
    );
    setModalVisible(false);
  };

  const updateBrithday = async () => {
    const body = {
      user_id: userID,
      birth: tempBirthDay,
    };

    await serverAxios
      .put('/account/update', body)
      .then(res => {})
      .catch(e => console.log(e));

    navigation.navigate('Gender', {email: email, id: userID});
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => handleBackButton()}>
          <Back height={24 * height_ratio} width={24 * width_ratio} />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View style={styles.pageContainer}>
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modeContainer}>
            <View style={styles.modeTitleContainer}>
              <Text style={styles.titleText}>생년월일 입력</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <DatePicker
                style={{}}
                dividerHeight={0}
                mode="date"
                date={date}
                onDateChange={setDate}
                customStyles={{
                  dateText: {
                    fontSize: 16 * height_ratio,
                    fontWeight: '700',
                    margintHorizontal: 10,
                  },
                }}
                f
                textColor="#242424"
                minimumDate={new Date(1901, 0, 1)}
                maximumDate={new Date()}></DatePicker>
            </View>
            <View style={styles.modeButtonContainer}>
              <View>
                <CustomButton_B
                  width={358 * width_ratio}
                  content="선택 완료"
                  disabled={false}
                  onPress={() => saveBirthday()}></CustomButton_B>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <View
        style={{
          alignSelf: 'flex-start',
          marginTop: 16 * height_ratio,
          marginBottom: 40 * height_ratio,
        }}>
        <Text style={styles.explainText}>생년월일을 입력해주세요.</Text>
      </View>
      <View style={styles.birthBox}>
        <Text style={styles.birthText}>{tempBirthDay}</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Drop height={24 * height_ratio} width={24 * width_ratio}></Drop>
        </TouchableOpacity>
      </View>
      <View style={{position: 'absolute', bottom: 0}}>
        <CustomButton_B
          content="다음"
          width={358 * width_ratio}
          onPress={() => updateBrithday()}></CustomButton_B>
      </View>
    </View>
  );
};

export default Birthday;

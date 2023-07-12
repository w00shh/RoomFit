import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  TextInput,
  Platform,
} from 'react-native';
import {serverAxios} from '../../../utils/commonAxios';
import {AppContext} from '../../../contexts/AppProvider';
import styles from './styles';
import Back from 'react-native-vector-icons/Ionicons';
import CustomButton_B from '../../../components/CustomButton_B';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const PasswordSetting = ({navigation}) => {
  const appcontext = useContext(AppContext);
  const [currentPW, setCurrentPW] = useState('');
  const [changedPW, setChangedPW] = useState('');
  const [changedPW2, setChangedPW2] = useState('');
  const [samePW, setSamePW] = useState(true);
  const [success, setSuccess] = useState();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            handleBackButton();
          }}>
          <Back
            name="arrow-back"
            color={'#242424'}
            size={25 * height_ratio}
            style={{
              marginLeft: 0 * width_ratio,
              marginRight: Platform.OS === 'ios' ? 0 : 10 * width_ratio,
            }}></Back>
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <>
          <Text
            style={{
              marginHorizontal: Platform.OS === 'ios' ? 0 : 6 * width_ratio,
              color: '#242424',
              fontSize: 16 * height_ratio,
              fontWeight: '700',
            }}>
            비밀번호 수정
          </Text>
        </>
      ),
    });
  }, []);

  useEffect(() => {
    if (changedPW === changedPW2 && changedPW !== '') {
      setSamePW(false);
    }
  }, [changedPW2]);

  useEffect(() => {
    if (success === true) {
      handleBackButton();
    } else if (success === false) {
      console.log('error');
    }
  }, [success]);

  handleBackButton = () => {
    navigation.reset({routes: [{name: 'ProfileSetting'}]});
  };

  handleSaveButton = async () => {
    const body = {
      user_id: appcontext.state.userid,
      old_password: currentPW,
      new_password: changedPW,
    };
    await serverAxios.put('/account/change_password', body).then(res => {
      if (res.data.success === 1) setSuccess(true);
      else setSuccess(false);
    });
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <View>
        <TextInput
          style={styles.inputContainer}
          value={currentPW}
          placeholder="현재 비밀번호 입력"
          placeholderTextColor={'#acacac'}
          onChangeText={text => setCurrentPW(text)}></TextInput>
      </View>
      <View>
        <TextInput
          style={styles.inputContainer}
          value={changedPW}
          placeholder="변경할 비밀번호 입력"
          placeholderTextColor={'#acacac'}
          onChangeText={text => setChangedPW(text)}></TextInput>
      </View>
      <View>
        <TextInput
          style={styles.inputContainer}
          value={changedPW2}
          placeholder="변경할 비밀번호 확인"
          placeholderTextColor={'#acacac'}
          onChangeText={text => setChangedPW2(text)}></TextInput>
      </View>
      <CustomButton_B
        width={358 * width_ratio}
        content="저장"
        disabled={samePW}
        onPress={() => handleSaveButton()}></CustomButton_B>
    </SafeAreaView>
  );
};

export default PasswordSetting;

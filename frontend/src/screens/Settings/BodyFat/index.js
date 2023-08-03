import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  TextInput,
  Platform,
  Keyboard,
} from 'react-native';
import styles from './styles';
import Back from 'react-native-vector-icons/Ionicons';
import {AppContext} from '../../../contexts/AppProvider';
import {serverAxios} from '../../../utils/commonAxios';
import CustomButton_B from '../../../components/CustomButton_B';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const BodyFat = ({navigation}) => {
  const appcontext = useContext(AppContext);
  const [saveDisable, setSaveDisable] = useState(false);
  const [tempBodyFat, setTempBodyFat] = useState(appcontext.state.userBodyFat);
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            handleBackButton();
          }}>
          <Back
            name="arrow-back"
            color="#242424"
            size={25 * height_ratio}
            style={{
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
            체지방률
          </Text>
        </>
      ),
    });
  }, []);

  const handleBackButton = () => {
    appcontext.actions.setUserBodyFat(tempBodyFat);
    navigation.navigate('ProfileSetting');
  };

  useEffect(() => {
    if (appcontext.state.userBodyFat <= 0) {
      setSaveDisable(true);
    } else setSaveDisable(false);
  }, [appcontext.state.userBodyFat]);

  handleSaveButton = async () => {
    const body = {
      user_id: appcontext.state.userid,
      body_fat: appcontext.state.userBodyFat,
    };
    await serverAxios.put('/account/update', body).then(res => {
      if (res.data.success === 1) {
        navigation.navigate('ProfileSetting');
      }
    });
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={styles.inputContainer}
          value={String(appcontext.state.userBodyFat)}
          placeholderTextColor={'#acacac'}
          onChangeText={text => appcontext.actions.setUserBodyFat(text)}
          keyboardType="numeric"></TextInput>
        <View pointerEvents="none" style={styles.placeholder}>
          <Text style={styles.placeholderText}>
            {appcontext.state.userBodyFat ? '%' : ''}
          </Text>
        </View>
      </View>
      <CustomButton_B
        width={358 * width_ratio}
        content="저장"
        disabled={saveDisable}
        onPress={() => handleSaveButton()}></CustomButton_B>
    </SafeAreaView>
  );
};

export default BodyFat;

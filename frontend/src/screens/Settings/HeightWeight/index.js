import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  TextInput,
  Platform,
} from 'react-native';
import styles from './styles';
import Back from 'react-native-vector-icons/Ionicons';
import CustomButton_B from '../../../components/CustomButton_B';
import {AppContext} from '../../../contexts/AppProvider';
import {serverAxios} from '../../../utils/commonAxios';
const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const HeightWeight = ({navigation}) => {
  const appcontext = useContext(AppContext);
  const [saveDisable, setSaveDisable] = useState(false);
  const [tempHeight, setTempHeight] = useState(appcontext.state.userHeight);
  const [tempWeight, setTempWeight] = useState(appcontext.state.userWeight);
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
            size={25}
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
            키/몸무게
          </Text>
        </>
      ),
    });
  }, []);

  useEffect(() => {
    console.log(appcontext.state.userHeight);
    if (appcontext.state.userHeight <= 0 || appcontext.state.userWeight <= 0) {
      setSaveDisable(true);
    } else setSaveDisable(false);
  }, [appcontext.state.userHeight, appcontext.state.userWeight]);

  const handleBackButton = () => {
    appcontext.actions.setUserHeight(tempHeight);
    appcontext.actions.setUserWeight(tempWeight);
    navigation.navigate('ProfileSetting');
  };

  handleSaveButton = async () => {
    const body = {
      user_id: appcontext.state.userid,
      height: appcontext.state.userHeight,
      weight: appcontext.state.userWeight,
    };
    await serverAxios.put('/account/update', body).then(res => {
      if (res.data.success === 1) {
        appcontext.actions.setUserHeight(appcontext.state.userHeight);
        appcontext.actions.setUserWeight(appcontext.state.userWeight);
        navigation.navigate('ProfileSetting');
      }
    });
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={styles.inputContainer}
          value={String(appcontext.state.userHeight)}
          keyboardType="numeric"
          onChangeText={text =>
            appcontext.actions.setUserHeight(text)
          }></TextInput>
        <View pointerEvents="none" style={styles.placeholder}>
          <Text style={styles.placeholderText}>cm</Text>
        </View>
      </View>
      <View>
        <TextInput
          style={styles.inputContainer}
          value={String(tempWeight)}
          placeholderTextColor={'#acacac'}
          keyboardType="numeric"
          onChangeText={text =>
            appcontext.actions.setUserWeight(text)
          }></TextInput>
        <View pointerEvents="none" style={styles.placeholder}>
          <Text style={styles.placeholderText}>kg</Text>
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

export default HeightWeight;

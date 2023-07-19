import React, {useState, useEffect, useContext} from 'react';
import {
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
} from 'react-native';
import styles from './styles';
import {AppContext} from '../../../contexts/AppProvider';
import {serverAxios} from '../../../utils/commonAxios';

//svg
import Back from '../../../assets/svg/buttons/single/back.svg';
import Check from '../../../assets/svg/buttons/active/check.svg';
import CustomButton_B from '../../../components/CustomButton_B';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const Gender = ({navigation, route}) => {
  const [tempGender, setTempGender] = useState('');
  const appcontext = useContext(AppContext);
  const [userID, setUserID] = useState(route.params.id);
  const [email, setEmail] = useState(route.params.email);
  const Gender = [{gender: '남성'}, {gender: '여성'}];

  const handleBackButton = async () => {
    navigation.navigate('Intro');
  };

  const saveAndNext = () => {
    saveGender();
    navigation.push('Login', {
      isRegister: true,
      email: email,
    });
  };

  const saveGender = async () => {
    const body = {
      user_id: userID,
      gender: tempGender === '남성' ? 1 : 2,
    };
    console.log(body);
    await serverAxios.put('/account/update', body).then(res => {});
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
      <View
        style={{
          alignSelf: 'flex-start',
          marginTop: 16 * height_ratio,
          marginBottom: 40 * height_ratio,
        }}>
        <Text style={styles.explainText}>성별을 입력해주세요.</Text>
      </View>
      <ScrollView
        style={{marginTop: 16 * height_ratio}}
        showsVerticalScrollIndicator={false}>
        {Gender.map((value, key) => (
          <TouchableOpacity
            key={key}
            style={{height: 48 * height_ratio, marginBottom: 8 * height_ratio}}
            onPress={() => {
              setTempGender(value.gender);
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View style={styles.restContainer}>
                <Text
                  style={{
                    fontSize: 16 * height_ratio,
                    color: value.gender === tempGender ? '#5252fa' : '#242424',
                  }}>
                  {value.gender}
                </Text>

                {value.gender === tempGender && (
                  <Check height={16 * height_ratio} width={16 * width_ratio} />
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <CustomButton_B
        content="다음"
        width={358 * width_ratio}
        onPress={() => saveAndNext()}></CustomButton_B>
    </View>
  );
};

export default Gender;

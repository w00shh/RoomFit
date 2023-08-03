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
import Check from 'react-native-vector-icons/AntDesign';
import Back from 'react-native-vector-icons/Ionicons';
import {serverAxios} from '../../../utils/commonAxios';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const WokroutCareer = ({navigation, route}) => {
  const [tempCareer, setTempCareer] = useState();
  const appcontext = useContext(AppContext);
  const Career = [
    {Career: '경력없음'},
    {Career: '3개월 이하'},
    {Career: '3개월~6개월'},
    {Career: '7개월~12개월'},
    {Career: '1년 이상'},
    {Career: '3년 이상'},
    {Career: '5년 이상'},
    {Career: '10년 이상'},
  ];

  const handleBackButton = async () => {
    const body = {
      user_id: appcontext.state.userid,
      experience: appcontext.state.userWorkoutCareer,
    };
    await serverAxios.put('/account/update', body).then(res => {});
    navigation.navigate('ProfileSetting');
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => handleBackButton()}>
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
              color: '#242424',
              fontSize: 16 * height_ratio,
              fontWeight: '700',
            }}>
            운동경력
          </Text>
        </>
      ),
    });
  }, [appcontext.state.userWorkoutCareer]);

  const handleSaveCareer = Career => {
    appcontext.actions.setUserWorkoutCareer(Career);
  };
  return (
    <View style={styles.pageContainer}>
      <ScrollView
        style={{marginTop: 16 * height_ratio}}
        showsVerticalScrollIndicator={false}>
        {Career.map((value, key) => (
          <TouchableOpacity
            key={key}
            onPress={() => {
              setTempCareer(value.Career);
              handleSaveCareer(value.Career);
            }}>
            <View
              style={{
                flexDirection: 'row',
                height: 56 * height_ratio,
              }}>
              <View style={styles.restContainer}>
                <Text
                  style={{
                    fontSize: 16 * height_ratio,
                    color: value.Career === tempCareer ? '#5252fa' : '#242424',
                  }}>
                  {value.Career}
                </Text>
                <Check
                  name="check"
                  size={20 * height_ratio}
                  color={
                    value.Career === tempCareer ? '#5252fa' : 'white'
                  }></Check>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default WokroutCareer;

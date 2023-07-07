import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import styles from './styles';

import Check from 'react-native-vector-icons/AntDesign';
import Back from 'react-native-vector-icons/Ionicons';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const RestingTime = ({navigation, route}) => {
  const [temprestSet, setTempRestSet] = useState();
  const restTime = [
    {time: 15, selsected: false},
    {time: 20, selsected: false},
    {time: 30, selsected: false},
    {time: 40, selsected: false},
    {time: 50, selsected: false},
    {time: 60, selsected: false},
    {time: 75, selsected: false},
    {time: 90, selsected: false},
    {time: 120, selsected: false},
    {time: 150, selsected: false},
  ];

  const calcTime = time => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    if (time < 60) {
      return `${time}초`;
    } else if (time % 60 === 0) {
      return `${min}분`;
    } else {
      return `${min}분 ${sec}초`;
    }
  };
  const handleBackButton = () => {
    navigation.reset({routes: [{name: 'MainSetting'}]});
  };
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
            size={25}
            style={{
              marginLeft: 0 * width_ratio,
              marginRight: 10 * width_ratio,
            }}></Back>
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <>
          <Text
            style={{
              color: '#242424',
              fontSize: 16,
              fontWeight: '700',
            }}>
            {route.params.title}간 휴식시간
          </Text>
        </>
      ),
    });
  }, []);
  return (
    <View style={styles.pageContainer}>
      <ScrollView style={{height: 500 * height_ratio, marginTop: 16}}>
        {restTime.map((value, key) => (
          <TouchableOpacity
            key={key}
            onPress={() => setTempRestSet(value.time)}>
            <View
              style={{
                flexDirection: 'row',

                height: 56 * height_ratio,
              }}>
              <View style={styles.restContainer}>
                <Text
                  style={{
                    fontSize: 16,
                    color: value.time === temprestSet ? '#5252fa' : '#242424',
                  }}>
                  {calcTime(value.time)}
                </Text>
                <Check
                  name="check"
                  size={20}
                  color={
                    value.time === temprestSet ? '#5252fa' : 'white'
                  }></Check>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default RestingTime;

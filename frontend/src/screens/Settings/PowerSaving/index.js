import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
} from 'react-native';
import styles from './styles';

//svg
import Back from '../../../assets/svg/buttons/single/back.svg';
import Check from '../../../assets/svg/buttons/active/check.svg';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const PowerSaving = ({navigation, route}) => {
  const [tempPowerSaving, setTempPowerSaving] = useState();
  const powerSave = [
    {time: 3, selsected: false},
    {time: 5, selsected: false},
    {time: 7, selsected: false},
    {time: 10, selsected: false},
    {time: 15, selsected: false},
    {time: 20, selsected: false},
    {time: 30, selsected: false},
    {time: 60, selsected: false},
    {time: 120, selsected: false},
    {time: 150, selsected: false},
  ];

  const calcTime = time => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    if (time < 60) {
      return `${time}분`;
    } else if (time % 60 === 0) {
      return `${min}시간`;
    } else {
      return `${min}시간 ${sec}분`;
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
          <Back height={24 * height_ratio} width={24 * width_ratio} />
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
            절전모드
          </Text>
        </>
      ),
    });
  }, []);
  return (
    <View style={styles.pageContainer}>
      <View
        style={{
          width: 358 * width_ratio,
          marginVertical: 8 * height_ratio,
        }}>
        <Text style={{fontSize: 14 * height_ratio, color: '#808080'}}>
          설정한 시간동안 움직임이 감지되지 않으면 운동 종료로 인식하고
          절전모드로 들어갑니다.
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {powerSave.map((value, key) => (
          <TouchableOpacity
            key={key}
            onPress={() => setTempPowerSaving(value.time)}>
            <View
              style={{
                flexDirection: 'row',
                height: 56 * height_ratio,
              }}>
              <View style={styles.restContainer}>
                <Text
                  style={{
                    fontSize: 16 * height_ratio,
                    color:
                      value.time === tempPowerSaving ? '#5252fa' : '#242424',
                  }}>
                  {calcTime(value.time)}
                </Text>
                {value.time === tempPowerSaving && (
                  <Check height={16 * height_ratio} width={16 * width_ratio} />
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default PowerSaving;

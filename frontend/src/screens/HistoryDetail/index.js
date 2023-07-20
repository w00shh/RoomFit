import {useEffect} from 'react';
import {Dimensions, View, TouchableOpacity, Text} from 'react-native';
import styles from './styles';

//svg
import Back from '../../assets/svg/buttons/single/back.svg';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const HistoryDetail = ({navigation, route}) => {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Back height={24 * height_ratio} width={24 * width_ratio} />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <Text
          style={{
            marginHorizontal: Platform.OS === 'ios' ? 0 : 6 * width_ratio,
            color: '#242424',
            fontSize: 16 * height_ratio,
            fontWeight: '700',
          }}>
          {route.params.record.motion_name}
        </Text>
      ),
      headerRight: () => {
        <TouchableOpacity>
          <Text style={{color: '#242424', fontSize: 14 * height_ratio}}>
            기록삭제
          </Text>
        </TouchableOpacity>;
      },
    });
  });

  return <View style={styles.pageContainer}></View>;
};

export default HistoryDetail;

import {View, Text, Dimensions, Provider} from 'react-native';
import Battery_D from '../assets/svg/buttons/default/battery.svg';
import Battery_A from '../assets/svg/buttons/active/battery.svg';

import {store, useAppSelector} from '../redux/store';

const width_ratio = Dimensions.get('window').width / 390;
const height_ratio = Dimensions.get('window').height / 844;

export const Battery = props => {
  return (
    <View
      style={{
        ...props.style,
        flexDirection: 'row',
        gap: 4 * width_ratio,
        alignItems: 'center',
      }}>
      {props.battery > 15 ? (
        <Battery_D height={24 * height_ratio} width={24 * width_ratio} />
      ) : (
        <Battery_A height={24 * height_ratio} width={24 * width_ratio} />
      )}
      <Text
        style={{
          color: props.battery > 15 ? '#242424' : '#EC3737',
          fontSize: 13 * height_ratio,
        }}>
        {props.battery}%
      </Text>
    </View>
  );
};

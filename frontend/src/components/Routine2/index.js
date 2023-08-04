import React from 'react';
import styles from './styles';
import {Text, View, Image, TouchableOpacity, Dimensions} from 'react-native';

//svg
import Right from '../../assets/svg/buttons/single/arrow/right.svg';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const RoutineBox2 = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.routineContainer}>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.titleText}>{props.title}</Text>
          <View
            style={{
              flexDirection: 'row',
              gap: 4 * width_ratio,
              alignItems: 'center',
            }}>
            <Text style={styles.targetText}>{props.targets}</Text>
            <View
              style={{
                width: 1 * width_ratio,
                height: 12 * height_ratio,
                backgroundColor: '#DFDFDF',
                borderRadius: 100,
              }}
            />
            <Text style={styles.targetText}>{props.numEx}개의 운동</Text>
          </View>
        </View>

        <Right
          height={24 * height_ratio}
          width={24 * width_ratio}
          style={{
            marginLeft: 4 * width_ratio,
          }}></Right>
      </View>
    </TouchableOpacity>
  );
};

export default RoutineBox2;

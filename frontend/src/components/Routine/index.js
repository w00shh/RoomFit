import React from 'react';
import styles from './styles';
import {Text, View, Image, TouchableOpacity, Dimensions} from 'react-native';
import Right from 'react-native-vector-icons/AntDesign';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const RoutineBox = props => {
  return (
    <View style={styles.routineContainer}>
      <View style={{flexDirection: 'column'}}>
        <Text style={styles.titleText}>{props.title}</Text>
        <View style={{flexDirection: 'row', marginLeft: 16 * width_ratio}}>
          <Text style={styles.targetText}>{props.targets}</Text>

          <Image
            style={{marginLeft: 4 * width_ratio, marginRight: 8 * width_ratio}}
            source={require('../../assets/images/divider.png')}></Image>
          <Text style={styles.targetText}>{props.numEx}개의 운동</Text>
        </View>
      </View>
      <TouchableOpacity onPress={props.onPress}>
        <Right
          name="right"
          size={20 * height_ratio}
          style={styles.rightIcon}></Right>
      </TouchableOpacity>
    </View>
  );
};

export default RoutineBox;

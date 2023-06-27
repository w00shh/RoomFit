import React from 'react';
import styles from './styles';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import Right from 'react-native-vector-icons/AntDesign';

const RoutineBox = props => {
  return (
    <View style={styles.routineContainer}>
      <View style={{flexDirection: 'column'}}>
        <Text style={styles.titleText}>{props.title}</Text>
        <View style={{flexDirection: 'row', marginLeft: 16}}>
          <Text style={styles.targetText}>{props.targets}</Text>

          <Image
            style={{marginLeft: 4, marginRight: 8}}
            source={require('../../assets/images/divider.png')}></Image>
          <Text style={styles.targetText}>{props.numEx}개의 운동</Text>
        </View>
      </View>
      <TouchableOpacity>
        <Right name="right" size={20} style={styles.rightIcon}></Right>
      </TouchableOpacity>
    </View>
  );
};

export default RoutineBox;

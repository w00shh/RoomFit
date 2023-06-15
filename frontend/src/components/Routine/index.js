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
          {props.targets.map((value, key) => (
            <Text style={styles.targetText}>{value} </Text>
          ))}
          <Image
            style={{marginLeft: 4, marginRight: 8}}
            source={require('../../assets/images/divider.png')}></Image>
          <Text style={styles.targetText}>{props.numEx}</Text>
        </View>
      </View>
      <TouchableOpacity>
        <Right name="right" size={20} style={styles.rightIcon}></Right>
      </TouchableOpacity>
    </View>
  );
};

export default RoutineBox;

import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';

const MotionItem = props => {
  return (
    <View style={styles.motionContainer}>
      {/* <Icon name="staro" size={20}></Icon> */}
      <Icon name="star" size={20} color="#fbcb22"></Icon>
      <View style={styles.imageContainer}></View>
      <View style={styles.nameContainer}>
        <Text
          style={{
            fontSize: 14,
            color: props.selected ? '#5252fa' : '#242424',
          }}>
          {props.motion.motionName}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: props.selected ? '#5252fa' : '#808080',
          }}>
          {props.motion.motionName}
        </Text>
      </View>
    </View>
  );
};

export default MotionItem;

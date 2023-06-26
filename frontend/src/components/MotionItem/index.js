import React, {useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';

const MotionItem = props => {
  return (
    <View style={styles.motionContainer}>
      {props.motion.isFavorite ? (
        <TouchableWithoutFeedback
          onPress={() => {
            updatedMotionList = [...props.motionList];
            updatedMotionList[
              updatedMotionList.findIndex(item => item === props.motion)
            ].isFavorite = !props.motion.isFavorite;
            props.setMotionList(updatedMotionList);
          }}>
          <Icon name="star" size={20} color="#fbcb22"></Icon>
        </TouchableWithoutFeedback>
      ) : (
        <TouchableWithoutFeedback
          onPress={() => {
            updatedMotionList = [...props.motionList];
            updatedMotionList[
              updatedMotionList.findIndex(item => item === props.motion)
            ].isFavorite = !props.motion.isFavorite;
            props.setMotionList(updatedMotionList);
          }}>
          <Icon name="staro" size={20}></Icon>
        </TouchableWithoutFeedback>
      )}

      {/* <Icon name="staro" size={20}></Icon> */}

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

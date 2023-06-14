import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';

const MotionItem = props => {
  return (
    <View style={styles.motionContainer}>
      {/* <Icon name="staro" size={20}></Icon> */}
      <Icon name="star" size={20} color="#fbcb22"></Icon>
      <View style={styles.imageContainer}></View>
      <View style={styles.nameContainer}>
        <Text style={styles.koreanText}>로우 케이블 크로스오버</Text>
        <Text style={styles.englishText}>Low cable crossover</Text>
      </View>
    </View>
  );
};

export default MotionItem;

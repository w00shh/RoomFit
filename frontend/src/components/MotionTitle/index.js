import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';

const MotionTitle = props => {
  return (
    <View style={styles.motionTitleContainer}>
      <View style={styles.descriptionContainer}>
        <View style={styles.imageContainer}></View>
        <View style={styles.nameContainer}>
          <Text style={styles.koreanText}>로우 케이블 크로스오버</Text>
          <Text style={styles.englishText}>가동 범위: 50cm~90cm</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.iconContainer}>
        <Icon name="grip-lines" size={12 * height_ratio} color="#808080"></Icon>
      </TouchableOpacity>
    </View>
  );
};

export default MotionTitle;

import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';

const WorkoutTitle = props => {
  return (
    <View style={styles.workoutTitleContainer}>
      <View style={styles.descriptionContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: props.motion.imageUrl,
            }}
            style={{width: 48, height: 48}}></Image>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.koreanText}>{props.motion.motionName}</Text>
          <Text style={styles.englishText}>가동 범위: 50cm~90cm</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.iconContainer}>
        <Icon name="grip-lines" size={12} color="#808080"></Icon>
      </TouchableOpacity>
    </View>
  );
};

export default WorkoutTitle;

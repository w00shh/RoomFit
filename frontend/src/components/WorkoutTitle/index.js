import React from 'react';
import {Image, Text, TouchableOpacity, View, Dimensions} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const WorkoutTitle = props => {
  return (
    <View style={styles.workoutTitleContainer}>
      <View style={styles.descriptionContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: props.motion.imageUrl,
            }}
            style={{
              width: 48 * width_ratio,
              height: 48 * height_ratio,
            }}></Image>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.koreanText}>{props.motion.motion_name}</Text>
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

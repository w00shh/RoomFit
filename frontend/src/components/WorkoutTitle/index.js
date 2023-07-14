import React from 'react';
import {Image, Text, TouchableOpacity, View, Dimensions} from 'react-native';
import styles from './styles';

//svg
import Handle from '../../assets/svg/buttons/single/handle.svg';
import Drop from '../../assets/svg/buttons/single/drop.svg';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const WorkoutTitle = props => {
  return (
    <View style={styles.workoutTitleContainer}>
      <View style={styles.descriptionContainer}>
        <View style={styles.imageContainer}>
          {/* <Image
            source={{
              uri: props.motion.imageUrl,
            }}
            style={{
              width: 48 * width_ratio,
              height: 48 * height_ratio,
            }}></Image> */}
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.koreanText}>{props.motion.motion_name}</Text>
          <TouchableOpacity
            onPress={() => {
              props.setIsMotionRangeModalVisible(true);
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2 * width_ratio,
            }}>
            <Text style={styles.rangeText}>가동 범위: 50cm~90cm</Text>
            <Drop height={16 * height_ratio} width={16 * width_ratio} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.iconContainer} onLongPress={props.drag}>
        <Handle height={16 * height_ratio} width={16 * width_ratio} />
      </TouchableOpacity>
    </View>
  );
};

export default WorkoutTitle;

import React, {useContext, useEffect} from 'react';
import {Image, Text, TouchableOpacity, View, Dimensions} from 'react-native';
import styles from './styles';
import {AppContext} from '../../contexts/AppProvider';

//svg
import Handle from '../../assets/svg/buttons/single/handle.svg';
import Drop from '../../assets/svg/buttons/single/drop.svg';
import DefaultImage from '../../assets/svg/icons/default_workout.svg';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const WorkoutTitle = props => {
  const appcontext = useContext(AppContext);
  return (
    <View style={styles.workoutTitleContainer}>
      <View style={styles.descriptionContainer}>
        <View style={styles.imageContainer}>
          {props.motion.image_url ? (
            <Image
              source={{
                uri: props.motion.image_url,
              }}
              style={{
                width: 48 * width_ratio,
                height: 48 * height_ratio,
              }}></Image>
          ) : (
            <DefaultImage
              width={48 * width_ratio}
              height={48 * height_ratio}></DefaultImage>
          )}
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.koreanText}>{props.motion.motion_name}</Text>
          <TouchableOpacity
            onPress={() => {
              appcontext.actions.setTargetmotionindex(
                props.motionList.findIndex(
                  e => e.motion_index === props.motion_index,
                ),
              );
              appcontext.actions.setTargetmotionrangemin(
                props.motionList[
                  props.motionList.findIndex(
                    e => e.motion_index === props.motion_index,
                  )
                ].motion_range_min,
              );
              appcontext.actions.setTargetmotionrangemax(
                props.motionList[
                  props.motionList.findIndex(
                    e => e.motion_index === props.motion_index,
                  )
                ].motion_range_max,
              );
              props.setIsMotionRangeModalVisible(true);
            }}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 2 * width_ratio,
            }}>
            <Text style={styles.rangeText}>
              가동범위:{' '}
              {props.motion.motion_range_min !== -1
                ? props.motion.motion_range_min
                : ''}
              cm ~ {''}
              {props.motion.motion_range_max !== -1
                ? props.motion.motion_range_max
                : ''}
              cm
            </Text>
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

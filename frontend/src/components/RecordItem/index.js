import React from 'react';
import {Image, Text, TouchableOpacity, View, Dimensions} from 'react-native';
import styles from './styles';
import Right from 'react-native-vector-icons/AntDesign';
import SetInfo from '../SetInfo';

import DefaultImage from '../../assets/svg/icons/default_workout.svg';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const RecordItem = props => {
  return (
    <View style={styles.recordItemContainer}>
      <View style={styles.recordInfoContainer}>
        <View style={styles.imageContainer}>
          {props.record.image_url ? (
            <Image
              source={{
                uri: props.record.image_url,
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
        <View style={styles.recordDetailContainer}>
          <Text style={styles.koreanText}>{props.record.motion_name}</Text>
          <Text style={styles.englishText}>{props.record.motion_name}</Text>
          <View
            style={[styles.setInfoContainer, {marginTop: 14.5 * height_ratio}]}>
            {props.record.sets.map((value, key) => (
              <SetInfo key={key} number={key + 1} set={value}></SetInfo>
            ))}
          </View>
        </View>
      </View>
      <View>
        <TouchableOpacity style={styles.aiCoachingContainer}>
          <Text style={styles.aiCoachingText}>AI 코칭</Text>
          <Right
            name="right"
            size={16 * height_ratio}
            style={styles.rightIcon}></Right>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RecordItem;

import React from 'react';
import {Image, Text, TouchableOpacity, View, Dimensions} from 'react-native';
import styles from './styles';
import Right from 'react-native-vector-icons/AntDesign';
import SetInfo from '../SetInfo';

const width_ratio = Dimensions.get('window').width / 390;
const height_ratio = Dimensions.get('window').height / 844;

const RecordItem = props => {
  return (
    <View style={styles.recordItemContainer}>
      <View style={styles.recordInfoContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: props.record.imageUrl,
            }}
            style={{
              width: 48 * width_ratio,
              height: 48 * height_ratio,
            }}></Image>
        </View>
        <View style={styles.recordDetailContainer}>
          <Text style={styles.koreanText}>{props.record.motion_name}</Text>
          <Text style={styles.englishText}>{props.record.motion_name}</Text>
          <View style={styles.setInfoContainer}>
            {props.record.sets.map((value, key) => (
              <SetInfo index={key} number={key + 1} set={value}></SetInfo>
            ))}
          </View>
        </View>
      </View>
      <View>
        <TouchableOpacity style={styles.aiCoachingContainer}>
          <Text style={styles.aiCoachingText}>AI 코칭</Text>
          <Right name="right" size={16} style={styles.rightIcon}></Right>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RecordItem;

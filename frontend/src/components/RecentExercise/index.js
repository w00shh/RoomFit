import React, {useEffect} from 'react';
import styles from './styles';
import {Text, View, Image, TouchableOpacity, Dimensions} from 'react-native';
import Timer from 'react-native-vector-icons/MaterialCommunityIcons';
import Lightning from 'react-native-vector-icons/MaterialCommunityIcons';
import Fire from 'react-native-vector-icons/MaterialCommunityIcons';

//svg
import Time from '../../assets/svg/icons/time.svg';
import Volume from '../../assets/svg/icons/volume.svg';
import Calorie from '../../assets/svg/icons/calorie.svg';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const RecentExercise = props => {
  const value = props.data;

  return (
    <View>
      <View style={styles.performedContainer}>
        <Text style={styles.titleText}>{value.title}</Text>
        <View style={[styles.targetContainer, {marginTop: 2 * height_ratio}]}>
          <Text style={styles.timeText}>
            {value.start_time.split(' ')[1].split(':')[0] +
              ':' +
              value.start_time.split(' ')[1].split(':')[0]}{' '}
            -{' '}
            {value.end_time.split(' ')[1].split(':')[0] +
              ':' +
              value.end_time.split(' ')[1].split(':')[0]}
          </Text>
          <View
            style={{
              width: 1 * width_ratio,
              height: 12 * height_ratio,
              backgroundColor: '#DFDFDF',
              borderRadius: 100,
            }}
          />
          <Text style={styles.targetText}>{value.targets.join(', ')}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 17.5 * height_ratio,
            gap: 12 * width_ratio,
            justifyContent: 'flex-start',
          }}>
          <View
            style={{
              flexDirection: 'row',
              gap: 2 * width_ratio,
              alignItems: 'center',
            }}>
            <Time
              height={24 * height_ratio}
              width={24 * width_ratio}
              style={{marginLeft: -5.5 * width_ratio}}
            />
            <Text style={styles.exerciseInformation}>{value.total_time}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 2 * width_ratio,
              alignItems: 'center',
            }}>
            <Volume height={24 * height_ratio} width={24 * width_ratio} />
            <Text style={styles.exerciseInformation}>{value.total_weight}</Text>
            <Text style={[styles.exerciseInformation, {color: '#808080'}]}>
              kg
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 2 * width_ratio,
              alignItems: 'center',
            }}>
            <Calorie height={24 * height_ratio} width={24 * width_ratio} />
            <Text style={styles.exerciseInformation}>10,000</Text>
            <Text style={[styles.exerciseInformation, {color: '#808080'}]}>
              Kcal
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RecentExercise;

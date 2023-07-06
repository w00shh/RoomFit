import React, {useEffect} from 'react';
import styles from './styles';
import {Text, View, Image, TouchableOpacity, Dimensions} from 'react-native';
import Timer from 'react-native-vector-icons/MaterialCommunityIcons';
import Lightning from 'react-native-vector-icons/MaterialCommunityIcons';
import Fire from 'react-native-vector-icons/MaterialCommunityIcons';

const width_ratio = Dimensions.get('window').width / 390;
const height_ratio = Dimensions.get('window').height / 844;

const RecentExercise = props => {
  const value = props.data;
  return (
    <View>
      <View style={styles.performedContainer}>
        <Text style={styles.titleText}>{value.title}</Text>
        <View style={styles.targetContainer}>
          <Text style={styles.timeText}>
            {value.start_time} - {value.end_time}
          </Text>
          <Image
            style={{marginLeft: 5 * width_ratio, marginRight: 5 * width_ratio}}
            source={require('../../assets/images/divider.png')}></Image>

          <Text style={styles.targetText}>{value.targets}</Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 17.5 * height_ratio}}>
          <Timer
            name="timer"
            color={'#41b1ca'}
            size={20}
            style={{marginLeft: 12 * width_ratio}}></Timer>
          <Text style={styles.exerciseInformation}>{value.total_time}</Text>
          <Lightning
            name="lightning-bolt"
            color={'#fbcb22'}
            size={20}
            style={{marginLeft: 12 * width_ratio}}></Lightning>

          <Text style={styles.exerciseInformation}>
            {value.total_weight} kg
          </Text>
          <Fire
            name="fire"
            color={'#fc7d36'}
            size={20}
            style={{marginLeft: 12 * width_ratio}}></Fire>
          <Text style={styles.exerciseInformation}>10,000 Kcal</Text>
        </View>
      </View>
    </View>
  );
};

export default RecentExercise;

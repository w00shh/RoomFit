import React from 'react';
import styles from './styles';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import Timer from 'react-native-vector-icons/MaterialCommunityIcons';
import Lightning from 'react-native-vector-icons/MaterialCommunityIcons';
import Fire from 'react-native-vector-icons/MaterialCommunityIcons';

const RecentExercise = props => {
  return (
    <View>
      {props.data.map((value, key) => (
        <View style={styles.performedContainer}>
          <Text style={styles.titleText}>{value.title}</Text>
          <View style={styles.targetContainer}>
            <Text style={styles.timeText}>
              {value.time[0]} - {value.time[1]}
            </Text>
            <Image
              style={{marginLeft: 5, marginRight: 5}}
              source={require('../../assets/images/divider.png')}></Image>
            {value.target.map((values, keys) => (
              <Text style={styles.targetText}>{values} </Text>
            ))}
          </View>
          <View style={{flexDirection: 'row', marginTop: 17.5}}>
            <Timer
              name="timer"
              color={'#41b1ca'}
              size={20}
              style={{marginLeft: 20}}></Timer>
            <Text style={styles.exerciseInformation}>
              {value.information[0]}
            </Text>
            <Lightning
              name="lightning-bolt"
              color={'#fbcb22'}
              size={20}
              style={{marginLeft: 12}}></Lightning>

            <Text style={styles.exerciseInformation}>
              {value.information[1]} kg
            </Text>
            <Fire
              name="fire"
              color={'#fc7d36'}
              size={20}
              style={{marginLeft: 12}}></Fire>
            <Text style={styles.exerciseInformation}>
              {value.information[2]} Kcal
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default RecentExercise;

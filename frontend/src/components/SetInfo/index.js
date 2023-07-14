import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import styles from './styles';

const width_ratio = Dimensions.get('screen').width / 390;

const SetInfo = props => {
  return (
    <View style={styles.setInfoContainer}>
      <View style={styles.setNumberContainer}>
        <Text style={styles.setNumberText}>SET</Text>
        <Text style={styles.setNumberText}>{props.number}</Text>
      </View>
      <View style={styles.setDetailContainer}>
        <View style={{flexDirection: 'row', gap: 2 * width_ratio}}>
          <Text style={styles.valueText}>{props.set.weight}</Text>
          <Text style={styles.unitText}>kg</Text>
        </View>
        <Text style={styles.valueText}>x</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.valueText}>{props.set.rep}</Text>
          <Text style={styles.unitText}>reps</Text>
        </View>
        <Text style={styles.valueText}>{props.set.mode}</Text>
      </View>
    </View>
  );
};

export default SetInfo;

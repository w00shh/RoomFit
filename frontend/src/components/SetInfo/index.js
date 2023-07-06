import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';

const SetInfo = props => {
  return (
    <View style={styles.setInfoContainer}>
      <View style={styles.setNumberContainer}>
        <Text style={styles.setNumberText}>SET</Text>
        <Text style={styles.setNumberText}>{props.number}</Text>
      </View>
      <View style={styles.setDetailContainer}>
        <Text style={styles.valueText}>{props.set.weight}</Text>
        <Text style={styles.unitText}>kg</Text>
        <Text style={styles.valueText}>X</Text>
        <Text style={styles.valueText}>{props.set.rep}</Text>
        <Text style={styles.unitText}>reps</Text>
        <Text style={styles.valueText}>{props.set.mode}</Text>
      </View>
    </View>
  );
};

export default SetInfo;

import React from 'react';
import styles from './styles';
import {Text, View} from 'react-native';

const SetItem = props => {
  return props.isKey ? (
    <View style={styles.setContainer}>
      <View style={styles.keyBox}>
        <Text>세트</Text>
      </View>
      <View style={styles.itemBox}>
        <Text>무게</Text>
      </View>
      <View style={styles.itemBox}>
        <Text>Reps</Text>
      </View>
      <View style={styles.itemBox}>
        <Text>하중모드</Text>
      </View>
    </View>
  ) : (
    <View style={styles.setContainer}>
      <View style={styles.keyBox}>
        <Text style={styles.valueText}>1</Text>
      </View>
      <View style={styles.itemBox}>
        <Text style={styles.valueText}>15</Text>
        <Text style={styles.unitText}>kg</Text>
      </View>
      <View style={styles.itemBox}>
        <Text style={styles.valueText}>15</Text>
        <Text style={styles.unitText}>회</Text>
      </View>
      <View style={styles.itemBox}></View>
    </View>
  );
};

export default SetItem;

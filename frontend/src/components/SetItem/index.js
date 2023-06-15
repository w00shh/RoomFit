import React from 'react';
import styles from './styles';
import {Text, TextInput, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

const SetItem = props => {
  const modes = ['기본모드', '고무밴드', '모드1', '모드2', '모드3'];
  return props.isKey ? (
    <View style={styles.setContainer}>
      <View style={styles.titleKey}>
        <Text style={{fontSize: props.isExercising ? 12 : 14}}>세트</Text>
      </View>
      <View style={styles.titleItem}>
        <Text style={{fontSize: props.isExercising ? 12 : 14}}>무게</Text>
      </View>
      <View style={styles.titleItem}>
        <Text style={{fontSize: props.isExercising ? 12 : 14}}>Reps</Text>
      </View>
      <View style={styles.titleItem}>
        <Text style={{fontSize: props.isExercising ? 12 : 14}}>하중모드</Text>
      </View>
      {props.isExercising && (
        <View style={styles.titleKey}>
          <Text style={{fontSize: props.isExercising ? 12 : 14}}>완료</Text>
        </View>
      )}
    </View>
  ) : (
    <View style={styles.setContainer}>
      <View style={styles.keyBox}>
        <Text style={styles.valueText}>1</Text>
      </View>
      <View style={styles.itemBox}>
        <TextInput style={styles.valueText}></TextInput>
        <Text style={styles.unitText}>kg</Text>
      </View>
      <View style={styles.itemBox}>
        <TextInput style={styles.valueText}></TextInput>
        <Text style={styles.unitText}>회</Text>
      </View>
      <View style={styles.itemBox}></View>
      {props.isExercising && <View style={styles.keyBox}></View>}
    </View>
  );
};

export default SetItem;

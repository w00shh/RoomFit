import React, {useState} from 'react';
import styles from './styles';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
const SetItem = props => {
  const modes = ['기본모드', '고무밴드', '모드1', '모드2', '모드3'];
  const [weight, setWeight] = useState();
  const [reps, setReps] = useState();
  const [mode, setMode] = useState('기본');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleModeSelectPress = () => {
    props.setIsModalVisible(true);
  };

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
        <Text></Text>
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
        <TextInput
          style={styles.valueText}
          inutMode="numeric"
          keyboardType="number-pad"
          placeholder="0"></TextInput>
        <Text style={styles.unitText}>kg</Text>
      </View>
      <View style={styles.itemBox}>
        <TextInput
          style={styles.valueText}
          inputMode="numeric"
          keyboardType="numeric"
          placeholder="0"></TextInput>
        <Text style={styles.unitText}>회</Text>
      </View>
      <View style={styles.itemBox}>
        <Text style={styles.modeText}>{mode}</Text>
        <TouchableOpacity onPress={handleModeSelectPress}>
          <Icon name="chevron-down" size={16} color="#808080"></Icon>
        </TouchableOpacity>
      </View>
      {props.isExercising && <View style={styles.keyBox}></View>}
    </View>
  );
};

export default SetItem;

import React, {useEffect, useState} from 'react';
import styles from './styles';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
const SetItem = props => {
  const modes = ['기본모드', '고무밴드', '모드1', '모드2', '모드3'];
  const [weight, setWeight] = useState(parseInt('0'));
  const [reps, setReps] = useState(parseInt('0'));
  const [mode, setMode] = useState('기본');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModeSelectPress = () => {
    props.setIsModalVisible(true);
  };

  useEffect(() => {
    if (props.motionList) {
      const updatedMotionList = [...props.motionList];
      updatedMotionList[
        updatedMotionList.findIndex(item => item.motion_id === props.motion_id)
      ].set[props.set_id] = {
        weight: weight,
        reps: reps,
        mode: mode,
      };
      console.log(updatedMotionList);
    }
  }, [weight, reps, mode]);

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
        <Text style={styles.valueText}>{props.set_id + 1}</Text>
      </View>
      <View style={styles.itemBox}>
        <TextInput
          style={styles.valueText}
          inutMode="numeric"
          keyboardType="number-pad"
          placeholder="0"
          onChangeText={text => setWeight(parseInt(text))}></TextInput>
        <Text style={styles.unitText}>kg</Text>
      </View>
      <View style={styles.itemBox}>
        <TextInput
          style={styles.valueText}
          inputMode="numeric"
          keyboardType="numeric"
          placeholder="0"
          onChangeText={text => setReps(parseInt(text))}></TextInput>
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

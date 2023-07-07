import React, {useContext, useEffect, useState} from 'react';
import styles from './styles';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Check from 'react-native-vector-icons/Entypo';
import {AppContext} from '../../contexts/AppProvider';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const SetItem = props => {
  const appcontext = useContext(AppContext);
  const [weight, setWeight] = useState(props.weight);
  const [reps, setReps] = useState(props.reps);
  const [isDoing, setIsDoing] = useState(props.isDoing);
  const [isDone, setIsDone] = useState(props.isDone);

  const handleModeSelectPress = () => {
    appcontext.actions.setTargetmotionindex(props.target_motion_id);
    appcontext.actions.setTargetsetindex(props.set_id);

    props.setIsModalVisible(true);
  };

  const handleWeightChange = text => {
    const parsedWeight = parseInt(text);
    if (!isNaN(parsedWeight)) {
      setWeight(parsedWeight);
    }
  };

  const handleRepsChange = text => {
    const parsedReps = parseInt(text);
    if (!isNaN(parsedReps)) {
      setReps(parsedReps);
    }
  };

  useEffect(() => {
    if (props.motionList) {
      const updatedMotionList = [...props.motionList];
      updatedMotionList[props.target_motion_id].sets[props.set_id] = {
        weight: weight,
        reps: reps,
        mode: props.motionList[props.target_motion_id].sets[props.set_id].mode,
        isDoing: isDoing,
        isDone: isDone,
      };
    }
  }, [weight, reps]);

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
    <View
      style={
        props.isDoing
          ? {
              ...styles.setContainer,
              borderWidth: 1,
              borderColor: '#242424',
              borderRadius: 8,
            }
          : styles.setContainer
      }>
      <View style={styles.keyBox}>
        <Text style={styles.keyText}>{props.set_id + 1}</Text>
      </View>
      <View style={styles.itemBox}>
        <TextInput
          style={styles.valueText}
          keyboardType="number-pad"
          placeholder={String(props.weight)}
          defaultValue={props.weight !== 0 ? String(props.weight) : null}
          onChangeText={handleWeightChange}></TextInput>
        <Text style={styles.unitText}>kg</Text>
      </View>
      <View style={styles.itemBox}>
        <TextInput
          style={styles.valueText}
          keyboardType="number-pad"
          placeholder={String(props.reps)}
          defaultValue={props.reps !== 1 ? String(props.reps) : null}
          onChangeText={handleRepsChange}></TextInput>
        <View style={styles.unitContainer}>
          <Text style={styles.unitText}>회</Text>
        </View>
      </View>
      {/* <Text>isDoing: {String(props.isDoing)}</Text>
      <Text>isDone: {String(props.isDone)}</Text> */}
      <TouchableWithoutFeedback onPress={handleModeSelectPress}>
        <View style={styles.itemBox}>
          <Text style={styles.modeText}>
            {props.motionList[props.target_motion_id].sets[props.set_id].mode}
          </Text>
          <Icon name="chevron-down" size={16} color="#808080"></Icon>
        </View>
      </TouchableWithoutFeedback>
      {props.isExercising && (
        <View style={styles.keyBox}>
          {props.isDone ? (
            <Check name="check" size={16} color="#5252fa"></Check>
          ) : (
            <Check name="check" size={16} color="#dfdfdf"></Check>
          )}
        </View>
      )}
    </View>
  );
};

export default SetItem;

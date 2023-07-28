import React, {useContext, useState} from 'react';
import styles from './styles';
import {
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Check from 'react-native-vector-icons/Entypo';
import {AppContext} from '../../contexts/AppProvider';
//svg
import Drop from '../../assets/svg/buttons/single/drop.svg';
import Check_A from '../../assets/svg/buttons/active/check.svg';
import Check_D from '../../assets/svg/buttons/default/check.svg';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const SetItem = props => {
  const appcontext = useContext(AppContext);
  const [isWeightEmpty, setIsWeightEmpty] = useState(false);
  const [isRepsEmpty, setIsRepsEmpty] = useState(false);
  const [weight, setWeight] = useState(props.weight);
  const [reps, setReps] = useState(props.reps);
  const [isDoing, setIsDoing] = useState(props.isDoing);
  const [isDone, setIsDone] = useState(props.isDone);

  const handleModeSelectPress = () => {
    appcontext.actions.setTargetmotionindex(props.target_motion_id);
    appcontext.actions.setTargetsetindex(props.set_id);

    for (let i = 0; i < appcontext.state.modeList.length; i++) {
      if (
        props.motionList[props.target_motion_id].sets[props.set_id].mode ===
        appcontext.state.modeList[i].modeName
      ) {
        props.setSelectedMode(appcontext.state.modeList[i]);
        break;
      }
    }

    props.setIsModalVisible(true);
  };

  const handleWeightChange = text => {
    if (text === '') {
      setIsWeightEmpty(true);
      setWeight(0);
    } else {
      setIsWeightEmpty(false);
      const parsedWeight = parseInt(text);
      if (!isNaN(parsedWeight)) {
        if (parsedWeight < 0) {
          setWeight(0);
        } else if (parsedWeight > 200) {
          setWeight(200);
        } else {
          setWeight(parsedWeight);
        }
      }
    }
  };

  const handleRepsChange = text => {
    if (text === '') {
      setIsRepsEmpty(true);
      setReps(1);
    } else {
      setIsRepsEmpty(false);
      const parsedReps = parseInt(text);
      if (!isNaN(parsedReps)) {
        if (parsedReps < 1) {
          setReps(1);
        } else {
          setReps(parsedReps);
        }
      }
    }
  };

  return props.isKey ? (
    <View style={styles.setContainer}>
      <View style={styles.titleKey}>
        <Text
          style={{
            fontSize: props.isExercising
              ? 12 * height_ratio
              : 14 * height_ratio,
          }}>
          세트
        </Text>
      </View>
      <View style={styles.titleItem}>
        <Text
          style={{
            fontSize: props.isExercising
              ? 12 * height_ratio
              : 14 * height_ratio,
          }}>
          무게
        </Text>
      </View>
      <View style={styles.titleItem}>
        <Text
          style={{
            fontSize: props.isExercising
              ? 12 * height_ratio
              : 14 * height_ratio,
          }}>
          Reps
        </Text>
      </View>
      <View style={styles.titleItem}>
        <Text
          style={{
            fontSize: props.isExercising
              ? 12 * height_ratio
              : 14 * height_ratio,
          }}>
          하중모드
        </Text>
      </View>
      {props.isExercising && (
        <View style={styles.titleKey}>
          <Text
            style={{
              fontSize: props.isExercising
                ? 12 * height_ratio
                : 14 * height_ratio,
            }}>
            완료
          </Text>
        </View>
      )}
    </View>
  ) : (
    <View
      style={
        props.isDoing
          ? {
              ...styles.setContainer,
              borderWidth: 1 * height_ratio,
              borderColor: '#242424',
              borderRadius: 4 * height_ratio,
            }
          : styles.setContainer
      }>
      <View style={styles.keyBox}>
        <Text style={styles.keyText}>{props.set_id + 1}</Text>
      </View>
      <View style={styles.itemBox}>
        <TextInput
          style={styles.valueText}
          inputMode="numeric"
          keyboardType="numeric"
          value={isWeightEmpty ? '' : String(weight)}
          onChangeText={handleWeightChange}
          onEndEditing={() => {
            console.log(props.set_id + ' ' + props.target_motion_id);
            props.handleSaveWeight(
              weight,
              props.set_id,
              props.target_motion_id,
            );
          }}></TextInput>
        <Text style={styles.unitText}>kg</Text>
      </View>
      <View style={styles.itemBox}>
        <TextInput
          style={styles.valueText}
          inputMode="numeric"
          keyboardType="numeric"
          value={isRepsEmpty ? '' : String(reps)}
          onChangeText={handleRepsChange}
          onEndEditing={() => {
            props.handleSaveReps(reps, props.set_id, props.target_motion_id);
          }}></TextInput>
        <View style={styles.unitContainer}>
          <Text style={styles.unitText}>회</Text>
        </View>
      </View>
      {/* <Text>isDoing: {String(props.isDoing)}</Text>
      <Text>isDone: {String(props.isDone)}</Text> */}
      <TouchableWithoutFeedback onPress={handleModeSelectPress}>
        <View
          style={[
            styles.itemBox,
            {
              gap: 4 * width_ratio,
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}>
          <Text style={styles.modeText}>
            {props.motionList[props.target_motion_id].sets[props.set_id].mode}
          </Text>
          <Drop height={16 * height_ratio} width={16 * width_ratio} />
        </View>
      </TouchableWithoutFeedback>
      {props.isExercising && (
        <View style={styles.keyBox}>
          {props.isDone ? (
            <Check_A height={16 * height_ratio} width={16 * width_ratio} />
          ) : (
            <Check_D height={16 * height_ratio} width={16 * width_ratio} />
          )}
        </View>
      )}
    </View>
  );
};

export default SetItem;

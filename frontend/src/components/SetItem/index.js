import React, {useEffect, useState} from 'react';
import styles from './styles';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import Dropdown from 'react-native-input-select';
import Icon from 'react-native-vector-icons/Feather';

const SetItem = props => {
  const modes = ['기본', '고무밴드', '모드1', '모드2', '모드3'];
  const [weight, setWeight] = useState(parseInt('0'));
  const [reps, setReps] = useState(parseInt('0'));
  const [mode, setMode] = useState('기본');

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
        {/* <Dropdown
          dropdownStyle={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 0,
            borderWidth: 0,
            borderRadius: 0,
            overflow: 'hidden',
          }}
          dropdownIcon={
            <Icon name="chevron-down" size={16} color="#808080"></Icon>
          }
          checkboxStyle={{
            backgroundColor: '#5252fa',
            borderWidth: 0,
          }}
          checkboxLabelStyle={{fontSize: 12, color: '#242424', padding: 16}}
          modalBackgroundStyle={{
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}
          listHeaderComponent={
            <View style={styles.modeTitleContainer}>
              <Text style={styles.titleText}>하중모드</Text>
            </View>
          }
          selectedItemStyle={{fontSize: 12}}
          options={[
            {
              modeName: '기본',
              modeDescription: '설명',
            },
            {
              modeName: '고무밴드',
              modeDescription: '설명',
            },
            {
              modeName: '모드1',
              modeDescription: '설명',
            },
            {
              modeName: '모드2',
              modeDescription: '설명',
            },
            {
              modeName: '모드3',
              modeDescription: '설명',
            },
          ]}
          optionLabel="modeName"
          optionValue="modeName"
          selectedValue={mode}
          onValueChange={value => setMode(mode)}
          primaryColor={'green'}></Dropdown> */}
      </View>
      {props.isExercising && <View style={styles.keyBox}></View>}
    </View>
  );
};

export default SetItem;

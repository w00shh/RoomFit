import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Feather';
import MotionItem from '../../components/MotionItem';
import CustomButton_B from '../../components/CustomButton_B';

const AddMotion = ({navigation, route}) => {
  const [motion, setMotion] = useState('');
  const [motionList, setMotionList] = useState([]);
  const [motionListMap, setMotionListMap] = useState(new Map());
  let selectedMotionKeys = [];
  const [selected, setSelected] = useState(new Map());
  const [selectedLength, setSelectedLength] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  let length = 0;

  const onSelect = useCallback(
    motion => {
      let length = 0;
      const newSelected = new Map(selected);
      newSelected.set(motion.motion_id, !selected.get(motion.motion_id));
      setSelected(newSelected);
    },
    [selected],
  );

  useEffect(() => {
    length = 0;
    selected.forEach(value => {
      if (value === true) {
        length += 1;
      }
    });
    setSelectedLength(length);
  }, [selected]);

  function Item({motion, selected, onSelect}) {
    return (
      <TouchableOpacity onPress={() => onSelect(motion)}>
        <MotionItem motion={motion} selected={selected}></MotionItem>
      </TouchableOpacity>
    );
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity>
          <Text>+ 커스텀 동작</Text>
        </TouchableOpacity>
      ),
    });
    setMotionList([
      {
        motion_id: 1,
        motionName: 'Low cable crossover',
        imageUrl: '',
      },
      {
        motion_id: 2,
        motionName: 'Sit up',
        imageUrl: '',
      },
      {
        motion_id: 3,
        motionName: 'Side Bend',
        imageUrl: '',
      },
      {
        motion_id: 4,
        motionName: '45 degrees Back Extension',
        imageUrl: '',
      },
      {
        motion_id: 5,
        motionName: 'Air bike',
        imageUrl: '',
      },
    ]);
    motionList.forEach(motion => {
      setMotionListMap(motionListMap.set(motion.motion_id, motion));
    });
  }, []);

  useEffect(() => {
    if (selectedLength > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [selectedLength]);

  return (
    <View style={styles.pageContainer}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={16} color="#808080"></Icon>
        <TextInput
          style={{marginLeft: 12}}
          onChangeText={text => setMotion(text)}
          placeholder="동작을 검색해보세요"
          inputMode="text"></TextInput>
      </View>
      <View></View>

      <Text style={styles.recommendedText}>추천 운동</Text>

      <FlatList
        data={motionList}
        renderItem={({item}) => (
          <Item
            motion={item}
            selected={!!selected.get(item.motion_id)}
            onSelect={onSelect}></Item>
        )}
        keyExtractor={item => item.motion_id}
        extraData={selected}></FlatList>

      <CustomButton_B
        width={358}
        content={selectedLength + ' 개 동작 추가하기'}
        disabled={isDisabled}
        onPress={
          route.params.isRoutine
            ? () => {
                navigation.push('AddRoutine', {
                  isMotionAdded: true,
                  routineName: route.params.routineName,
                  selectedMotionKeys: selectedMotionKeys,
                });
              }
            : () => {
                selectedMotionKeys = Array.from(selected.keys());
                //console.log(selectedMotionKeys);
                navigation.navigate('WorkoutReady', {
                  selectedMotionKeys: selectedMotionKeys,
                });
              }
        }></CustomButton_B>
    </View>
  );
};

export default AddMotion;

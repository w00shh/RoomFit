import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Feather';
import MotionItem from '../../components/MotionItem';
import CustomButton_B from '../../components/CustomButton_B';

const AddMotion = ({navigation}) => {
  const [motion, setMotion] = useState('');
  const [motionList, setMotionList] = useState([]);
  const [motionListMap, setMotionListMap] = useState(new Map());
  let selectedMotionKeys = [];
  const [selected, setSelected] = useState(new Map());

  const onSelect = useCallback(
    motion => {
      const newSelected = new Map(selected);
      newSelected.set(motion.motion_id, !selected.get(motion.motion_id));
      setSelected(newSelected);
    },
    [selected],
  );

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
      },
      {
        motion_id: 2,
        motionName: 'Low cable crossover',
      },
      {
        motion_id: 3,
        motionName: 'Low cable crossover',
      },
      {
        motion_id: 4,
        motionName: 'Low cable crossover',
      },
      {
        motion_id: 5,
        motionName: 'Low cable crossover',
      },
    ]);
    motionList.forEach(motion => {
      setMotionListMap(motionListMap.set(motion.motion_id, motion));
    });
  }, []);

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
        content={selected.size + ' 개 동작 추가하기'}
        disabled={false}
        onPress={() => {
          selectedMotionKeys = Array.from(selected.keys());
          console.log(selectedMotionKeys);
          navigation.navigate('WorkoutReady', {
            selectedMotionKeys: selectedMotionKeys,
          });
        }}></CustomButton_B>
      <TouchableOpacity></TouchableOpacity>
    </View>
  );
};

export default AddMotion;

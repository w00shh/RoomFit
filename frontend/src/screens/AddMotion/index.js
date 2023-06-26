import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Feather';
import MotionItem from '../../components/MotionItem';
import CustomButton_B from '../../components/CustomButton_B';
import XX from 'react-native-vector-icons/Feather';
import {serverAxios} from '../../utils/commonAxios';

const AddMotion = ({navigation, route}) => {
  const [motion, setMotion] = useState('');
  const [motionList, setMotionList] = useState([]);
  const [motionListMap, setMotionListMap] = useState(new Map());
  let selectedMotionKeys = [];
  const [selected, setSelected] = useState(new Map());
  const [displaySelected, setDisplaySelected] = useState(new Map());
  const [selectedLength, setSelectedLength] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const {width} = Dimensions.get('window');
  let length = 0;

  const getTextWidth = text => {
    let charCount = text.length;
    for (let i = 0; i < text.length; i++) {
      if (text[i] === ' ') charCount--;
    }
    const defaultFontSize = 13; // 기본 폰트 크기를 설정합니다.
    const averageCharWidth = 1; // 평균 글자 너비를 설정합니다.

    let textWidth = charCount * 17;
    if (textWidth > 70 && textWidth <= 110) textWidth += 20;
    return textWidth;
  };

  const onSelect = useCallback(
    motion => {
      let length = 0;
      const newSelected = new Map(selected);
      newSelected.set(motion.motion_id, !selected.get(motion.motion_id));
      if (displaySelected.get(motion.motion_id))
        displaySelected.delete(motion.motion_id);
      else
        displaySelected.set(motion.motion_id, {
          motion_id: motion.motion_id,
          motionName: motion.motionName,
          imageUrl: motion.imageUrl,
          isFavorite: motion.isFavorite,
        });
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
        <MotionItem
          motion={motion}
          selected={selected}
          motionList={motionList}
          setMotionList={setMotionList}></MotionItem>
      </TouchableOpacity>
    );
  }

  const getMotionList = async () => {
    const body = {
      user_id: 'user1',
    };
    await serverAxios
      .post('/motion', body)
      .then(res => {
        res.data.map((value, key) => {
          setMotionList(currentMotionList => [
            ...currentMotionList,
            {
              isFavorite: value.isFav,
              motion_id: value.motion_id,
              motionName: value.motion_name,
              imageUrl: value.imageUrl,
            },
          ]);
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity>
          <Text>+ 커스텀 동작</Text>
        </TouchableOpacity>
      ),
    });

    getMotionList();

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
      {displaySelected.size === 0 && (
        <Text style={styles.recommendedText}>추천 운동</Text>
      )}
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignSelf: 'flex-start',
          marginTop: 16,
          marginLeft: 4,
          marginBottom: 5,
        }}>
        {displaySelected &&
          Array.from(displaySelected.values()).map((value, key) => (
            <View
              key={key}
              style={{
                width:
                  getTextWidth(value.motionName) > 84
                    ? getTextWidth(value.motionName)
                    : 84,
                height: 32,
                backgroundColor: '#242424',
                borderRadius: 8,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                marginLeft: 8,
                marginTop: 7,
              }}>
              <Text style={styles.selectMotionText}>{value.motionName}</Text>
              <XX name="x" color={'white'} size={15}></XX>
            </View>
          ))}
      </View>
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
                selectedMotionKeys = Array.from(displaySelected.keys());
                navigation.push('AddRoutine', {
                  isMotionAdded: true,
                  routineName: route.params.routineName,
                  selectedMotionKeys: selectedMotionKeys,
                  motionList: route.params.motionList,
                  displaySelected: Array.from(displaySelected.values()),
                });
              }
            : () => {
                selectedMotionKeys = Array.from(displaySelected.keys());
                //console.log(selectedMotionKeys);
                route.params.isExercising
                  ? navigation.push('WorkoutStart', {
                      isAddMotion: true,
                      motionList: route.params.motionList,
                      selectedMotionKeys: selectedMotionKeys,
                      displaySelected: Array.from(displaySelected.values()),
                      elapsedTime: route.params.elapsedTime,
                      TUT: route.params.TUT,
                      m_index: route.params.m_index,
                      s_index: route.params.s_index,
                      isPaused: true,
                      isPausedPage: false,
                      isModifyMotion: true,
                    })
                  : navigation.push('WorkoutReady', {
                      selectedMotionKeys: selectedMotionKeys,
                      motionList: route.params.motionList,
                      displaySelected: Array.from(displaySelected.values()),
                    });
              }
        }></CustomButton_B>
    </View>
  );
};

export default AddMotion;

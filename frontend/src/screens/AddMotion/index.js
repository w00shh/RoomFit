import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import styles from './styles';
import MotionItem from '../../components/MotionItem';
import CustomButton_B from '../../components/CustomButton_B';
import {serverAxios} from '../../utils/commonAxios';

//svg
import Back from '../../assets/svg/buttons/single/back.svg';
import Search from '../../assets/svg/buttons/single/search.svg';
import X from '../../assets/svg/buttons/single/x.svg';
import {Divider} from '../../components/divider';
import {AppContext} from '../../contexts/AppProvider';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const AddMotion = ({navigation, route}) => {
  const appcontext = useContext(AppContext);
  const [motionList, setMotionList] = useState(appcontext.state.motionList);
  const [motionListMap, setMotionListMap] = useState(new Map());
  let selectedMotionKeys = [];
  const [selected, setSelected] = useState(new Map());
  const [displaySelected, setDisplaySelected] = useState(new Map());
  const [selectedLength, setSelectedLength] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [gripList, setGripList] = useState([]);
  const [bodyRegionList, setBodyRegionList] = useState([]);
  const [selectedList, setSelectedList] = useState([]);

  let length = 0;

  const handleMotionSearchChange = async text => {
    const body = {
      user_id: appcontext.state.userid,
      motion_name: text,
    };
    await serverAxios
      .post('/motion/search', body)
      .then(res => {
        setMotionList(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const onSelect = useCallback(
    motion => {
      if (selectedList.includes(motion.motion_name)) {
        setSelectedList(
          selectedList.filter(item => item !== motion.motion_name),
        );
      } else {
        setSelectedList([...selectedList, motion.motion_name]);
      }

      let length = 0;
      const newSelected = new Map(selected);
      newSelected.set(motion.motion_id, !selected.get(motion.motion_id));
      if (displaySelected.get(motion.motion_id))
        displaySelected.delete(motion.motion_id);
      else
        displaySelected.set(motion.motion_id, {
          isMotionDone: false,
          isMotionDoing: false,
          doingSetIndex: 0,
          isFav: motion.isFav,
          motion_id: motion.motion_id,
          motion_name: motion.motion_name,
          image_url: motion.image_url,
          motion_range_min: motion.motion_range_min,
          motion_range_max: motion.motion_range_max,
        });
      setSelected(newSelected);
    },
    [selected],
  );

  const deleteSelected = key => {
    displaySelected.delete(key);
    const newSelected = new Map(selected);
    newSelected.set(key, false);
    setSelected(newSelected);
  };

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
          navigateToMotionDetail={() => {
            navigation.navigate('MotionDetail', {
              motion: motion,
              motionList: motionList,
              setMotionList: setMotionList,
            });
          }}
          motion={motion}
          selected={selected}
          motionList={motionList}
          setMotionList={setMotionList}></MotionItem>
      </TouchableOpacity>
    );
  }

  const getMotionList = async () => {
    const body = {
      user_id: appcontext.state.userid,
    };
    await serverAxios
      .post('/motion', body)
      .then(res => {
        setMotionList(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            if (route.params.isCustom) {
              navigation.reset({routes: [{name: 'HomeScreen'}]});
            } else {
              navigation.goBack();
            }
          }}>
          <Back height={24 * height_ratio} width={24 * width_ratio} />
        </TouchableOpacity>
      ),

      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.push('CustomMotion')}>
          <Text style={{fontSize: 14 * height_ratio, color: '#242424'}}>
            + 커스텀 동작
          </Text>
        </TouchableOpacity>
      ),
    });

    //getMotionList();

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
    <View
      style={[
        styles.pageContainer,
        {
          flexDirection: 'column',
          alignItems: 'flex-start',
          alignSelf: 'center',
        },
      ]}>
      <View style={styles.searchContainer}>
        <Search height={16 * height_ratio} width={16 * width_ratio} />
        <TextInput
          style={{fontSize: 14 * height_ratio}}
          onChangeText={handleMotionSearchChange}
          placeholder="동작을 검색해보세요"
          inputMode="text"></TextInput>
      </View>
      <View style={{height: 110 * height_ratio}}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.additionalSelectContainer}>
          <View style={styles.equipmentContainer}>
            {appcontext.state.gripList.map((value, key) => (
              <TouchableOpacity
                key={key}
                style={{
                  paddingVertical: 8 * height_ratio,
                  paddingHorizontal: 12 * width_ratio,
                  backgroundColor: gripList.includes(value)
                    ? '#5252fa'
                    : '#f5f5f5',
                  borderRadius: 8 * height_ratio,
                }}
                onPress={() => {
                  if (gripList.includes(value)) {
                    setGripList(gripList.filter(grip => grip !== value));
                  } else {
                    setGripList([...gripList, String(value)]);
                  }
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: gripList.includes(value) ? '#fff' : '#242424',
                  }}>
                  {value}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.muscleContainer}>
            {[
              ...['즐겨찾기', '커스텀'],
              ...appcontext.state.bodyRegionList,
            ].map((value, key) => (
              <TouchableOpacity
                key={key}
                style={{
                  paddingVertical: 8 * height_ratio,
                  paddingHorizontal: 12 * width_ratio,
                  backgroundColor: bodyRegionList.includes(value)
                    ? '#5252fa'
                    : '#f5f5f5',
                  borderRadius: 8 * height_ratio,
                }}
                onPress={() => {
                  if (bodyRegionList.includes(value)) {
                    setBodyRegionList(
                      bodyRegionList.filter(bodyRegion => bodyRegion !== value),
                    );
                  } else {
                    setBodyRegionList([...bodyRegionList, String(value)]);
                  }
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: bodyRegionList.includes(value) ? '#fff' : '#242424',
                  }}>
                  {value}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      {displaySelected.size === 0 && (
        <View
          style={{
            paddingVertical: 8 * height_ratio,
          }}>
          <Text style={styles.recommendedText}>추천 운동</Text>
        </View>
      )}
      {displaySelected.size !== 0 && (
        <View
          style={{height: displaySelected.size !== 0 ? 50 * height_ratio : 0}}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexDirection: 'row',
              alignSelf: 'center',
              gap: 8 * width_ratio,
              marginTop: 0 * height_ratio,
              //marginVertical:
              //displaySelected.size !== 0 ? 24 * height_ratio : 0,
              overflow: 'visible',
            }}>
            {displaySelected &&
              Array.from(displaySelected.values()).map((value, key) => (
                <View
                  key={key}
                  style={{
                    paddingHorizontal: 12 * width_ratio,
                    height: 32 * height_ratio,
                    backgroundColor: '#242424',
                    borderRadius: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: 2 * width_ratio,
                    overflow: 'visible',
                  }}>
                  <Text style={styles.selectMotionText}>
                    {value.motion_name}
                  </Text>
                  <TouchableOpacity
                    onPress={() => deleteSelected(value.motion_id)}>
                    <X height={24 * height_ratio} width={24 * width_ratio} />
                  </TouchableOpacity>
                </View>
              ))}
          </ScrollView>
        </View>
      )}
      {motionList.length === 0 && (
        <View
          style={{
            alignSelf: 'stretch',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 80 * height_ratio,
          }}>
          <Text style={{fontSize: 14 * height_ratio, color: '#808080'}}>
            검색 결과가 없습니다.
          </Text>
        </View>
      )}
      <FlatList
        data={motionList}
        renderItem={({item, index}) => {
          const isEnd = index === motionList.length - 1;
          return (
            <>
              <Item
                motion={item}
                selected={!!selected.get(item.motion_id)}
                onSelect={onSelect}></Item>
              {!isEnd && <Divider height_ratio={height_ratio} />}
            </>
          );
        }}
        keyExtractor={item => item.motion_id}
        extraData={selected}
        showsVerticalScrollIndicator={false}></FlatList>

      <CustomButton_B
        width={358 * width_ratio}
        content={selectedLength + ' 개 동작 추가하기'}
        disabled={isDisabled}
        onPress={
          route.params.isRoutine
            ? () => {
                selectedMotionKeys = Array.from(displaySelected.keys());
                route.params.isRoutineDetail
                  ? navigation.push('RoutineDetail', {
                      index: route.params.index,
                      motion_index_base: route.params.motion_index_base,
                      isMotionAdded: true,
                      routineName: route.params.routineName,
                      selectedMotionKeys: selectedMotionKeys,
                      motionList: route.params.motionList,
                      displaySelected: Array.from(displaySelected.values()),
                      routine_id: route.params.routine_id,
                    })
                  : navigation.push('AddRoutine', {
                      motion_index_base: route.params.motion_index_base,
                      isMotionAdded: true,
                      routineName: route.params.routineName,
                      selectedMotionKeys: selectedMotionKeys,
                      motionList: route.params.motionList,
                      displaySelected: Array.from(displaySelected.values()),
                      routine_id: route.params.routine_id,
                    });
              }
            : () => {
                selectedMotionKeys = Array.from(displaySelected.keys());

                route.params.isExercising
                  ? navigation.push('WorkoutModifying', {
                      motion_index_base: route.params.motion_index_base,
                      isQuickWorkout: route.params.isQuickWorkout,
                      workout_id: route.params.workout_id,
                      record_id: route.params.record_id,
                      routine_id: route.params.routine_id,
                      isAddMotion: true,
                      isAddedMotionDone: route.params.isAddedMotionDone,
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
                      isResting: route.params.isResting,
                      restTimer: route.params.restTimer,
                    })
                  : navigation.push('WorkoutReady', {
                      motion_index_base: route.params.motion_index_base,
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

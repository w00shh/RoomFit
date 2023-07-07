import React, {useEffect, useState, useCallback} from 'react';
import {TouchableOpacity, View, Image, Dimensions} from 'react-native';
import styles from './styles';
import {Text} from 'react-native';
import {serverAxios} from '../../../utils/commonAxios';
import RoutineBox from '../../../components/Routine';
import Check from 'react-native-vector-icons/AntDesign';
import Right from 'react-native-vector-icons/AntDesign';
import Back from 'react-native-vector-icons/Ionicons';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const MyRoutine = ({navigation}) => {
  const [routineId, setRoutineId] = useState();
  const [routine, setRoutine] = useState([]);
  const [isEditDisabled, setIsEditDisabled] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selected, setSelected] = useState(new Map());

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.reset({routes: [{name: 'HomeScreen'}]})}>
          <Back
            name="arrow-back"
            color={'#242424'}
            size={25 * height_ratio}
            style={{
              marginLeft: 10 * width_ratio,
              marginRight: 10 * width_ratio,
            }}></Back>
        </TouchableOpacity>
      ),
    });
    handleGetAllRoutine();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          disabled={isEditDisabled}
          onPress={() => {
            setIsEdit(!isEdit);
          }}
          style={{marginRight: 14}}>
          <Text style={{color: '#242424', fontSize: 14 * height_ratio}}>
            {isEdit ? '취소' : '편집'}
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [isEdit]);

  const handleGetAllRoutine = async () => {
    setRoutine([]);
    setIsEdit(false);
    const body = {
      user_id: 'user1',
      isHome: false,
    };
    await serverAxios.post('/routine/load', body).then(res => {
      res.data.map((value, key) => {
        setRoutine(currentRoutine => [
          ...currentRoutine,
          {
            routine_id: value.routine_id,
            routine_name: value.routine_name,
            major_targets: value.major_targets,
            motion_count: value.motion_count,
          },
        ]);
      });
    });
  };

  useEffect(() => {
    if (routineId) {
      navigation.push('AddRoutine', {
        isMotionAdded: false,
        routineName: '새로운 루틴',
        routine_id: routineId,
      });
    }
  }, [routineId]);

  //루틴 생성 api 호출
  const handleMakeRoutinePress = async () => {
    const body = {
      user_id: 'user1',
    };
    await serverAxios
      .post('/routine', body)
      .then(res => {
        setRoutineId(res.data.routine_id);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleDeleteRoutinePress = async () => {
    const body = {
      routine_ids: Array.from(selected.keys()),
    };
    await serverAxios
      .put('/routine/delete', body)
      .then(res => {
        handleGetAllRoutine();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const onSelect = useCallback(
    key => {
      if (selected.get(key)) {
        if (selected.get(key).isSelec) {
          const newSelected = new Map(selected);
          newSelected.set(key, {rotuineId: key, isSelec: false});
          setSelected(newSelected);
        } else {
          const newSelected = new Map(selected);
          newSelected.set(key, {rotuineId: key, isSelec: true});
          setSelected(newSelected);
        }
      } else {
        const newSelected = new Map(selected);
        newSelected.set(key, {rotuineId: key, isSelec: true});
        setSelected(newSelected);
      }
    },
    [selected],
  );

  return (
    <View style={styles.pageContainer}>
      {routine[0] &&
        !isEdit &&
        routine.map((value, key) => (
          <View key={key}>
            <RoutineBox
              title={value.routine_name}
              targets={value.major_targets}
              numEx={value.motion_count}
              onPress={() => {
                navigation.push('RoutineDetail', {
                  isRoutineDetail: true,
                  routine_id: value.routine_id,
                  routineName: value.routine_name,
                });
              }}></RoutineBox>
          </View>
        ))}
      {routine[0] &&
        isEdit &&
        routine.map((value, key) => (
          <View
            key={key}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => onSelect(value.routine_id)}>
              <View
                style={{
                  backgroundColor: selected.get(value.routine_id)
                    ? selected.get(value.routine_id).isSelec
                      ? '#5252fa'
                      : '#dfdfdf'
                    : '#dfdfdf',

                  width: 24 * width_ratio,
                  height: 24 * height_ratio,
                  borderRadius: 4,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 16 * height_ratio,
                  marginRight: 8 * width_ratio,
                }}>
                <Check name="check" color="#fff"></Check>
              </View>
            </TouchableOpacity>
            <View style={styles.routineContainer}>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.titleText}>{value.routine_name}</Text>
                <View
                  style={{flexDirection: 'row', marginLeft: 16 * width_ratio}}>
                  <Text style={styles.targetText}>{value.major_targets}</Text>

                  <Image
                    style={{
                      marginLeft: 4 * width_ratio,
                      marginRight: 8 * width_ratio,
                    }}
                    source={require('../../../assets/images/divider.png')}></Image>
                  <Text style={styles.targetText}>
                    {value.motion_count}개의 운동
                  </Text>
                </View>
              </View>
              <TouchableOpacity>
                <Right name="right" size={20} style={styles.rightIcon}></Right>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      {!isEdit && (
        <TouchableOpacity
          style={styles.makeRoutineContainer}
          onPress={handleMakeRoutinePress}>
          <Text style={styles.makeRoutineText}>+ 루틴 만들기</Text>
        </TouchableOpacity>
      )}
      {isEdit && (
        <TouchableOpacity
          style={styles.deleteRoutineContainer}
          onPress={handleDeleteRoutinePress}>
          <Text style={styles.deleteRoutineText}>삭제</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MyRoutine;

import React, {useEffect, useState, useCallback, useContext} from 'react';
import {TouchableOpacity, View, Image, Dimensions} from 'react-native';
import styles from './styles';
import {Text} from 'react-native';
import {serverAxios} from '../../../utils/commonAxios';
import RoutineBox from '../../../components/Routine';

//svg
import Back from '../../../assets/svg/buttons/single/back.svg';
import Handle from '../../../assets/svg/buttons/single/handle.svg';
import Checkbox_D from '../../../assets/svg/buttons/default/checkbox.svg';
import Checkbox_A from '../../../assets/svg/buttons/active/checkbox.svg';
import {AppContext} from '../../../contexts/AppProvider';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const MyRoutine = ({navigation}) => {
  const appcontext = useContext(AppContext);
  const [routineId, setRoutineId] = useState();
  const [routine, setRoutine] = useState([]);
  const [isEditDisabled, setIsEditDisabled] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selected, setSelected] = useState(new Map());

  useEffect(() => {
    handleGetAllRoutine();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () =>
        !isEdit && (
          <TouchableOpacity
            onPress={() => navigation.reset({routes: [{name: 'HomeScreen'}]})}>
            <Back height={24 * height_ratio} width={24 * width_ratio} />
          </TouchableOpacity>
        ),
      headerRight: () => (
        <TouchableOpacity
          disabled={isEditDisabled}
          onPress={() => {
            setIsEdit(!isEdit);
          }}>
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
      user_id: appcontext.state.userid,
      isHome: false,
    };
    await serverAxios.post('/routine/load', body).then(res => {
      res.data.map((value, key) => {
        setRoutine(currentRoutine => [
          ...currentRoutine,
          {
            routine_id: value.routine_id,
            routine_name: value.routine_name,
            body_regions: value.body_regions,
            motion_count: value.motion_count,
          },
        ]);
      });
    });
  };

  useEffect(() => {
    if (routineId) {
      navigation.push('AddRoutine', {
        motion_index_base: 0,
        isMotionAdded: false,
        routineName: '새로운 루틴',
        routine_id: routineId,
      });
    }
  }, [routineId]);

  //루틴 생성 api 호출
  const handleMakeRoutinePress = async () => {
    const body = {
      user_id: appcontext.state.userid,
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

    Array.from(selected.keys()).map((value, key) => {
      appcontext.actions.setRoutineList(
        appcontext.state.routineList.filter(e => e.routine_id !== value),
      );
      appcontext.actions.setRoutineDetailList(
        appcontext.state.routineDetailList.filter(e => e.routine_id !== value),
      );
    });
    await serverAxios
      .put('/routine/delete', body)
      .then(res => {
        //handleGetAllRoutine();
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

  useEffect(() => {
    console.log(appcontext.state.routineList);
  }, []);
  return (
    <View style={styles.pageContainer}>
      {appcontext.state.routineList[0] &&
        !isEdit &&
        appcontext.state.routineList.map((value, key) => (
          <View key={key}>
            <RoutineBox
              title={value.routine_name}
              targets={value.body_regions}
              numEx={value.motion_count}
              onPress={() => {
                navigation.push('RoutineDetail', {
                  isRoutineDetail: true,
                  routine_index: appcontext.state.routineList.findIndex(
                    e => e.routine_id === value.routine_id,
                  ),
                  routine_detail_index:
                    appcontext.state.routineDetailList.findIndex(
                      e => e.routine_id === value.routine_id,
                    ),
                  motion_index_base: 0,
                });
              }}></RoutineBox>
          </View>
        ))}
      {appcontext.state.routineList[0] &&
        isEdit &&
        routine.map((value, key) => (
          <View
            key={key}
            style={{
              flexDirection: 'row',
              gap: 16 * width_ratio,
              // justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => onSelect(value.routine_id)}>
              {selected.get(value.routine_id) &&
              selected.get(value.routine_id).isSelec ? (
                <Checkbox_A
                  height={24 * height_ratio}
                  width={24 * width_ratio}
                />
              ) : (
                <Checkbox_D
                  height={24 * height_ratio}
                  width={24 * width_ratio}
                />
              )}
            </TouchableOpacity>
            <View style={styles.routineContainer}>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.titleText}>{value.routine_name}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 4 * width_ratio,
                    alignItems: 'center',
                  }}>
                  <Text style={styles.targetText}>{value.body_regions}</Text>
                  <View
                    style={{
                      width: 1 * width_ratio,
                      height: 12 * height_ratio,
                      backgroundColor: '#DFDFDF',
                      borderRadius: 100,
                    }}
                  />
                  <Text style={styles.targetText}>
                    {value.motion_count}개의 운동
                  </Text>
                </View>
              </View>
              <TouchableOpacity>
                <Handle height={16 * height_ratio} width={16 * width_ratio} />
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

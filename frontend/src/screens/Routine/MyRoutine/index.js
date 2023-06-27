import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {Text} from 'react-native';
import {serverAxios} from '../../../utils/commonAxios';
import RoutineBox from '../../../components/Routine';

const AddRoutine = ({navigation}) => {
  const [routineId, setRoutineId] = useState();
  const [routine, setRoutine] = useState([]);

  useEffect(() => {
    handleGetAllRoutine();
  }, []);

  const handleGetAllRoutine = async () => {
    const body = {
      user_id: 'user1',
      isHome: false,
    };
    await serverAxios.post('/routine/load', body).then(res => {
      res.data.map((value, key) => {
        console.log(value);
        console.log(value.routine_id);
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
      navigation.navigate('AddRoutine', {
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

  return (
    <View style={styles.pageContainer}>
      {routine[0] &&
        routine.map((value, key) => (
          <View key={key}>
            <RoutineBox
              title={value.routine_name}
              targets={value.major_targets}
              numEx={value.motion_count}></RoutineBox>
          </View>
        ))}

      <TouchableOpacity
        style={styles.makeRoutineContainer}
        onPress={handleMakeRoutinePress}>
        <Text style={styles.makeRoutineText}>+ 루틴 만들기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddRoutine;

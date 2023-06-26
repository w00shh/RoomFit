import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {Text} from 'react-native';
import {serverAxios} from '../../../utils/commonAxios';

const AddRoutine = ({navigation}) => {
  const [routineId, setRoutineId] = useState();

  useEffect(() => {
    if (routineId) {
      navigation.navigate('AddRoutine', {
        isMotionAdded: false,
        routineName: '새로운 루틴',
        routine_id: routineId,
      });
    }
  }, [routineId]);

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
      <TouchableOpacity
        style={styles.makeRoutineContainer}
        onPress={handleMakeRoutinePress}>
        <Text style={styles.makeRoutineText}>+ 루틴 만들기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddRoutine;

import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {Text} from 'react-native';
import {serverAxios} from '../../../utils/commonAxios';

const AddRoutine = ({navigation}) => {
  const [routineId, setRoutineId] = useState('');

  const handleMakeRoutinePress = async () => {
    navigation.navigate('AddRoutine', {
      isMotionAdded: false,
      routineName: '새로운 루틴',
      routine_id: routineId,
    });

    const body = {
      user_id: 'user1',
    };
    await serverAxios
      .post('/routine', body)
      .then(res => {
        console.log(res.data.routine_id);
        setRoutineId(res.data);
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

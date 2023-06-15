import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {Text} from 'react-native';

const AddRoutine = ({navigation}) => {
  const handleMakeRoutinePress = () => {
    navigation.navigate('AddRoutine');
  };
  return (
    <View style={styles.pageContainer}>
      <View style={styles.makeRoutineContainer}>
        <TouchableOpacity onPress={handleMakeRoutinePress}>
          <Text style={styles.makeRoutineText}>+ 루틴 만들기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddRoutine;

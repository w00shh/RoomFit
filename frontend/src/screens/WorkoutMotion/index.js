import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Feather';
import MotionItem from '../../components/MotionItem';
const WorkoutMotion = ({navigation}) => {
  const [motion, setMotion] = useState('');
  const [motionList, setMotionList] = useState();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity sty>
          <Text>+ 커스텀 동작</Text>
        </TouchableOpacity>
      ),
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
      <ScrollView>
        <MotionItem></MotionItem>
        <MotionItem></MotionItem>
      </ScrollView>
    </View>
  );
};

export default WorkoutMotion;

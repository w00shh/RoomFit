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
import CustomButton_B from '../../components/CustomButton_B';
const WorkoutMotion = ({navigation}) => {
  const [motion, setMotion] = useState('');
  const [motionList, setMotionList] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('WorkoutReady');
          }}>
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
        <MotionItem></MotionItem>
        <MotionItem></MotionItem>
        <MotionItem></MotionItem>
        <MotionItem></MotionItem>
      </ScrollView>
      <CustomButton_B
        width={358}
        content={motionList.length + ' 개 동작 추가하기'}
        disabled={isDisabled}></CustomButton_B>
    </View>
  );
};

export default WorkoutMotion;

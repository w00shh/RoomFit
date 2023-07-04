import React, {useEffect} from 'react';
import {View, ScrollView, TouchableOpacity, Image, Text} from 'react-native';
import Timer from 'react-native-vector-icons/MaterialCommunityIcons';
import Lightning from 'react-native-vector-icons/MaterialCommunityIcons';
import Fire from 'react-native-vector-icons/MaterialCommunityIcons';
import Start from 'react-native-vector-icons/AntDesign';
import Body from 'react-native-vector-icons/Ionicons';
import Square from 'react-native-vector-icons/FontAwesome';
import TutTimer from 'react-native-vector-icons/MaterialCommunityIcons';
import Back from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';
import {serverAxios} from '../../utils/commonAxios';

const WorkoutDetail = ({navigation, route}) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{flexDirection: 'column'}}>
          <Text
            style={{
              marginHorizontal: 6,
              color: 'black',
              fontSize: 16,
              fontWeight: '700',
            }}>
            {route.params.title}
          </Text>
          <Text>
            {route.params.start_time} - {route.params.end_time}
          </Text>
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => deleteRecord()}>
          <Text style={{color: '#242424'}}>기록삭제</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  const deleteRecord = async () => {
    const delUrl = '/workout/delete/' + route.params.workout_id;
    await serverAxios
      .delete(delUrl)
      .then(res => {})
      .catch(e => {
        console.log(e);
      });

    if (route.params.isHomeScreen) {
      navigation.reset({routes: [{name: 'HomeScreen'}]});
    } else {
      navigation.reset({routes: [{name: 'WorkoutRecord'}]});
    }
  };
  return (
    <View style={styles.pageContainer}>
      <Text style={styles.yoyakText}>운동 요약</Text>
      <View style={{marginTop: 24, marginLeft: 16}}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.grayCircle}>
            <Body name="body" color="#3aa84c" size={23}></Body>
          </View>

          <View style={{marginLeft: 8}}>
            <Text style={styles.pauseMotionTitle}>{route.params.targets}</Text>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                }}>
                <Text style={styles.statusText2}>1</Text>
                <Text style={styles.targetText2}>/4set</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  marginHorizontal: 16,
                }}>
                <Text style={styles.statusText2}>
                  {route.params.total_weight}
                </Text>
                <Text style={styles.targetText2}> kg</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                }}>
                <Text style={styles.statusText2}>1</Text>
                <Text style={styles.targetText2}>/2회</Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'flex-start',
          }}>
          <View style={{flexDirection: 'row', width: 140}}>
            <View style={styles.grayCircle}>
              <Timer name="timer" color="#41b1ca" size={23}></Timer>
            </View>
            <View style={{marginLeft: 8}}>
              <Text style={styles.puaseSubtitle}>전체 운동시간</Text>
              <Text style={styles.puaseSubcontent}>
                {route.params.total_time}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.RgrayCircle}>
              <Timer name="timer" color="#41b1ca" size={23}></Timer>
            </View>

            <View style={{marginLeft: 8}}>
              <Text style={styles.puaseSubtitle}>유효 수행시간</Text>
              <Text style={styles.puaseSubcontent}>tut</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'flex-start',
          }}>
          <View style={{flexDirection: 'row', width: 140}}>
            <View style={styles.grayCircle}>
              <Lightning
                name="lightning-bolt"
                color="#fbcb22"
                size={23}></Lightning>
            </View>
            <View style={{marginLeft: 8}}>
              <Text style={styles.puaseSubtitle}>볼륨</Text>
              <Text style={styles.puaseSubcontent}>
                {route.params.total_weight}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.RgrayCircle}>
              <Fire name="fire" color="#fc7d36" size={23}></Fire>
            </View>

            <View style={{marginLeft: 8}}>
              <Text style={styles.puaseSubtitle}>칼로리</Text>
              <Text style={styles.puaseSubcontent}>10000</Text>
            </View>
          </View>
        </View>
      </View>
      <View>
        <View style={styles.memoContainer}>
          <Text>ss</Text>
        </View>
      </View>
    </View>
  );
};

export default WorkoutDetail;
